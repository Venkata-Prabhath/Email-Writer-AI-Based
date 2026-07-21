package com.webpilot.agent;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webpilot.ai.GeminiClient;
import com.webpilot.ai.PromptBuilder;
import com.webpilot.browser.BrowserExecutor;
import com.webpilot.browser.BrowserInstruction;
import com.webpilot.browser.BrowserResult;
import com.webpilot.browser.PlaywrightService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DecisionEngine {

    private static final int MAX_STEPS = 25;

    private final GeminiClient geminiClient;
    private final PromptBuilder promptBuilder;
    private final BrowserExecutor browserExecutor;
    private final PlaywrightService playwrightService;
    private final ObjectMapper objectMapper;

    public void runTask(String userGoal) throws Exception {

        log.info("======================================");
        log.info("Starting AI Browser Task");
        log.info("Goal : {}", userGoal);
        log.info("======================================");

        String pageContent = "";

        for (int step = 1; step <= MAX_STEPS; step++) {

            log.info("------------- STEP {} -------------", step);

            if (step > 1) {
                pageContent = safePageContent();
            }

            String prompt = promptBuilder.build(userGoal, pageContent);

            log.debug("Prompt Sent To Gemini:\n{}", prompt);

            String response = geminiClient.generate(prompt);

            log.debug("Gemini Response:\n{}", response);

            List<BrowserInstruction> instructions = parseInstructions(response);

            if (instructions.isEmpty()) {
                log.info("Gemini returned no instructions.");
                return;
            }

            log.info("Received {} instructions.", instructions.size());

            BrowserResult result = browserExecutor.execute(instructions);

            if (!result.isSuccess()) {

                log.error("Browser execution failed: {}", result.getMessage());

                throw new RuntimeException(
                        result.getMessage() == null
                                ? "Browser execution failed."
                                : result.getMessage()
                );
            }

            boolean shouldClose = instructions.stream()
                    .anyMatch(i ->
                            i.getAction() != null &&
                                    i.getAction().name().equalsIgnoreCase("CLOSE"));

            if (shouldClose) {
                log.info("Browser closed. Task completed.");
                return;
            }
        }

        throw new RuntimeException(
                "Maximum number of AI steps (" + MAX_STEPS + ") reached."
        );
    }

    private String safePageContent() {

        try {

            String html = playwrightService.getPageContent();

            if (html == null) {
                return "";
            }

            html = html.replaceAll("(?is)<script.*?>.*?</script>", "");
            html = html.replaceAll("(?is)<style.*?>.*?</style>", "");
            html = html.replaceAll("\\s+", " ");

            if (html.length() > 25000) {
                html = html.substring(0, 25000);
            }

            return html;

        } catch (Exception e) {

            log.warn("Unable to capture page content.", e);

            return "";
        }
    }

    private List<BrowserInstruction> parseInstructions(String response) {

        if (response == null || response.isBlank()) {
            return Collections.emptyList();
        }

        try {

            String json = response
                    .replace("```json", "")
                    .replace("```JSON", "")
                    .replace("```", "")
                    .trim();

            return objectMapper.readValue(
                    json,
                    new TypeReference<List<BrowserInstruction>>() {
                    });

        } catch (Exception ex) {

            log.error("Failed to parse browser instructions.", ex);
            log.error("Raw Gemini Response:\n{}", response);

            return Collections.emptyList();
        }
    }
}
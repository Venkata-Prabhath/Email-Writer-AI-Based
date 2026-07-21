package com.webpilot.agent;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webpilot.browser.BrowserInstruction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class AiResponseParser {

    private final ObjectMapper objectMapper;

    /**
     * Parses the LLM response into browser instructions.
     */
    public List<BrowserInstruction> parse(String response) {

        if (response == null || response.isBlank()) {
            return Collections.emptyList();
        }

        try {
            String json = cleanResponse(response);

            List<BrowserInstruction> instructions =
                    objectMapper.readValue(
                            json,
                            new TypeReference<List<BrowserInstruction>>() {
                            });

            log.info("Parsed {} browser instructions.", instructions.size());

            return instructions;

        } catch (Exception ex) {
            log.error("Failed to parse AI response.");
            log.error("Raw AI Response:\n{}", response);
            log.error("Exception:", ex);
            return Collections.emptyList();
        }
    }

    /**
     * Cleans and normalizes LLM responses before parsing.
     */
    private String cleanResponse(String response) {

        String cleaned = response
                .replace("```json", "")
                .replace("```JSON", "")
                .replace("```", "")
                .trim();

        // Normalize common LLM action names
        cleaned = cleaned.replace("\"EXTRACT\"", "\"EXTRACT_TEXT\"");
        cleaned = cleaned.replace("\"READ\"", "\"EXTRACT_TEXT\"");
        cleaned = cleaned.replace("\"SCRAPE\"", "\"EXTRACT_TEXT\"");
        cleaned = cleaned.replace("\"GET_TEXT\"", "\"EXTRACT_TEXT\"");

        cleaned = cleaned.replace("\"NAVIGATE\"", "\"OPEN\"");
        cleaned = cleaned.replace("\"GO_TO\"", "\"OPEN\"");
        cleaned = cleaned.replace("\"VISIT\"", "\"OPEN\"");

        cleaned = cleaned.replace("\"FILL\"", "\"TYPE\"");
        cleaned = cleaned.replace("\"INPUT\"", "\"TYPE\"");
        cleaned = cleaned.replace("\"ENTER_TEXT\"", "\"TYPE\"");

        cleaned = cleaned.replace("\"PRESS\"", "\"PRESS_KEY\"");
        cleaned = cleaned.replace("\"KEY_PRESS\"", "\"PRESS_KEY\"");

        cleaned = cleaned.replace("\"MOVE_MOUSE\"", "\"HOVER\"");
        cleaned = cleaned.replace("\"MOUSE_OVER\"", "\"HOVER\"");

        cleaned = cleaned.replace("\"CAPTURE_SCREEN\"", "\"SCREENSHOT\"");
        cleaned = cleaned.replace("\"TAKE_SCREENSHOT\"", "\"SCREENSHOT\"");

        cleaned = cleaned.replace("\"SLEEP\"", "\"WAIT\"");
        cleaned = cleaned.replace("\"DELAY\"", "\"WAIT\"");

        return cleaned;
    }

    /**
     * Returns true if the AI response contains valid instructions.
     */
    public boolean isValid(String response) {
        return !parse(response).isEmpty();
    }
}
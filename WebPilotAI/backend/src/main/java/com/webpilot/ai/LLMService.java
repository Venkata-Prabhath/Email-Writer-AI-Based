package com.webpilot.ai;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class LLMService {

    private final GeminiClient geminiClient;
    private final PromptBuilder promptBuilder;

    /**
     * Generates a response from the LLM using the user's goal.
     */
    public String generate(String userGoal) {

        String prompt = promptBuilder.build(userGoal);

        log.debug("Sending prompt to Gemini...");
        return geminiClient.generate(prompt);
    }

    /**
     * Generates a response using the user's goal and current page content.
     */
    public String generate(String userGoal, String pageContent) {

        String prompt = promptBuilder.build(userGoal, pageContent);

        log.debug("Sending contextual prompt to Gemini...");
        return geminiClient.generate(prompt);
    }

    /**
     * Generates a response using an already prepared prompt.
     */
    public String generateFromPrompt(String prompt) {

        log.debug("Sending custom prompt to Gemini...");
        return geminiClient.generate(prompt);
    }
}
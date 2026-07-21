package com.webpilot.browser;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class BrowserSessionManager {

    private final Browser browser;

    private final Map<String, BrowserContext> contexts =
            new ConcurrentHashMap<>();

    /**
     * Returns an existing browser context for a session
     * or creates a new one.
     */
    public BrowserContext getContext(String sessionId) {

        return contexts.computeIfAbsent(
                sessionId,
                id -> browser.newContext(
                        new Browser.NewContextOptions()
                                .setViewportSize(1440, 900)
                )
        );
    }

    /**
     * Closes one browser context.
     */
    public void closeContext(String sessionId) {

        BrowserContext context = contexts.remove(sessionId);

        if (context != null) {
            context.close();
        }
    }

    /**
     * Closes every active browser context.
     */
    public void closeAllContexts() {

        contexts.values().forEach(context -> {
            try {
                context.close();
            } catch (Exception ignored) {
            }
        });

        contexts.clear();
    }

    @PreDestroy
    public void cleanup() {

        closeAllContexts();

        /*
         * Browser bean lifecycle is managed by Spring.
         * Do NOT close the Browser here.
         */
    }
}
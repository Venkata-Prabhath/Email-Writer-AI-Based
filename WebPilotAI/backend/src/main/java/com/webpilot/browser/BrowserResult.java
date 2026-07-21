package com.webpilot.browser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BrowserResult {

    /**
     * Whether the browser action was successful.
     */
    private boolean success;

    /**
     * Status message.
     */
    private String message;

    /**
     * Extracted text or page output.
     */
    private String data;

    /**
     * Current page URL.
     */
    private String currentUrl;

    /**
     * Current page title.
     */
    private String pageTitle;

    /**
     * Time taken to execute (milliseconds).
     */
    private long executionTime;

    public static BrowserResult success(String message) {
        return BrowserResult.builder()
                .success(true)
                .message(message)
                .build();
    }

    public static BrowserResult success(String message, String data) {
        return BrowserResult.builder()
                .success(true)
                .message(message)
                .data(data)
                .build();
    }

    public static BrowserResult failure(String message) {
        return BrowserResult.builder()
                .success(false)
                .message(message)
                .build();
    }
}
package com.webpilot.browser;

public interface PlaywrightService {

    void open(String url);

    void search(String text);

    void click(String selector);

    void type(String selector, String value);

    /**
     * Wait for an element to become visible.
     */
    void waitFor(String selector);

    /**
     * Wait for a fixed amount of time in milliseconds.
     */
    void waitFor(long milliseconds);

    void scroll();

    void select(String selector, String value);

    void upload(String selector, String filePath);

    String extractText(String selector);

    void hover(String selector);

    void pressKey(String key);

    void back();

    void forward();

    void refresh();

    byte[] screenshot();

    String currentUrl();

    void close();

    String getPageContent();
}
package com.webpilot.browser;

import com.microsoft.playwright.Page;
import org.springframework.stereotype.Component;

@Component
public class PageAnalyzer {

    public String analyze(Page page) {

        StringBuilder summary = new StringBuilder();

        summary.append("URL:\n")
                .append(page.url())
                .append("\n\n");

        summary.append("TITLE:\n")
                .append(page.title())
                .append("\n\n");

        summary.append("VISIBLE TEXT:\n")
                .append(page.locator("body").innerText())
                .append("\n\n");

        summary.append("BUTTONS:\n");

        page.locator("button").all().forEach(button -> {
            try {
                summary.append("- ")
                        .append(button.innerText())
                        .append("\n");
            } catch (Exception ignored) {
            }
        });

        summary.append("\nINPUTS:\n");

        page.locator("input").all().forEach(input -> {
            try {
                summary.append("- ")
                        .append(input.getAttribute("type"))
                        .append(" | ")
                        .append(input.getAttribute("name"))
                        .append(" | ")
                        .append(input.getAttribute("placeholder"))
                        .append("\n");
            } catch (Exception ignored) {
            }
        });

        summary.append("\nLINKS:\n");

        page.locator("a").all().stream().limit(30).forEach(link -> {
            try {
                summary.append("- ")
                        .append(link.innerText())
                        .append(" -> ")
                        .append(link.getAttribute("href"))
                        .append("\n");
            } catch (Exception ignored) {
            }
        });

        return summary.toString();
    }
}
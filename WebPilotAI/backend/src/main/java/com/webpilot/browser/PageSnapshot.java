package com.webpilot.browser;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import org.springframework.stereotype.Component;

@Component
public class PageSnapshot {

    public String snapshot(Page page) {

        StringBuilder sb = new StringBuilder();

        sb.append("URL: ").append(page.url()).append("\n");
        sb.append("TITLE: ").append(page.title()).append("\n\n");

        appendInputs(page, sb);
        appendButtons(page, sb);
        appendLinks(page, sb);
        appendSelects(page, sb);

        return sb.toString();
    }

    private void appendInputs(Page page, StringBuilder sb) {

        sb.append("INPUTS\n");

        Locator inputs = page.locator("input");

        int count = inputs.count();

        for (int i = 0; i < count; i++) {

            Locator input = inputs.nth(i);

            sb.append(i)
                    .append(" | type=")
                    .append(value(input.getAttribute("type")))
                    .append(" | name=")
                    .append(value(input.getAttribute("name")))
                    .append(" | placeholder=")
                    .append(value(input.getAttribute("placeholder")))
                    .append("\n");
        }

        sb.append("\n");
    }

    private void appendButtons(Page page, StringBuilder sb) {

        sb.append("BUTTONS\n");

        Locator buttons = page.locator("button");

        int count = buttons.count();

        for (int i = 0; i < count; i++) {

            Locator button = buttons.nth(i);

            sb.append(i)
                    .append(" | ")
                    .append(button.innerText().trim())
                    .append("\n");
        }

        sb.append("\n");
    }

    private void appendLinks(Page page, StringBuilder sb) {

        sb.append("LINKS\n");

        Locator links = page.locator("a");

        int count = Math.min(links.count(), 30);

        for (int i = 0; i < count; i++) {

            Locator link = links.nth(i);

            sb.append(i)
                    .append(" | ")
                    .append(link.innerText().trim())
                    .append(" -> ")
                    .append(value(link.getAttribute("href")))
                    .append("\n");
        }

        sb.append("\n");
    }

    private void appendSelects(Page page, StringBuilder sb) {

        sb.append("SELECTS\n");

        Locator selects = page.locator("select");

        int count = selects.count();

        for (int i = 0; i < count; i++) {

            Locator select = selects.nth(i);

            sb.append(i)
                    .append(" | ")
                    .append(value(select.getAttribute("name")))
                    .append("\n");
        }

        sb.append("\n");
    }

    private String value(String s) {
        return s == null ? "" : s;
    }
}
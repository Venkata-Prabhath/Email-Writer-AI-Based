package com.webpilot.browser;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.WaitUntilState;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlaywrightServiceImpl implements PlaywrightService {

    private final Browser browser;
    private final PageAnalyzer pageAnalyzer;

    private BrowserContext context;
    private Page page;

    private Page page() {

        if (page == null || page.isClosed()) {

            context = browser.newContext(
                    new Browser.NewContextOptions()
                            .setViewportSize(1440, 900)
            );

            page = context.newPage();

            page.setDefaultTimeout(15000);
            page.setDefaultNavigationTimeout(30000);
        }

        return page;
    }

    @Override
    public void open(String url) {

        log.info("OPEN -> {}", url);

        try {

            page().navigate(
                    url,
                    new Page.NavigateOptions()
                            .setWaitUntil(WaitUntilState.DOMCONTENTLOADED)
            );

        } catch (Exception e) {

            log.warn("Navigation timeout or warning: {}", e.getMessage());

            // Continue execution if the page is already partially loaded.
            if (page().url() == null || page().url().isBlank()) {
                throw e;
            }
        }
    }

    @Override
    public void search(String text) {

        log.info("SEARCH -> {}", text);

        Page page = page();

        page.navigate(
                "https://www.google.com",
                new Page.NavigateOptions()
                        .setWaitUntil(WaitUntilState.DOMCONTENTLOADED)
        );

        Locator searchBox = page.locator("textarea[name='q']");

        searchBox.waitFor();

        searchBox.fill(text);

        searchBox.press("Enter");

        page.waitForLoadState();
    }

    @Override
    public void click(String selector) {

        log.info("CLICK -> {}", selector);

        page().locator(selector).click();
    }

    @Override
    public void type(String selector, String value) {

        log.info("TYPE -> {} = {}", selector, value);

        Locator locator = page().locator(selector);

        locator.fill("");

        locator.type(value);
    }

    @Override
    public void waitFor(String selector) {

        if (selector == null || selector.isBlank()) {
            page().waitForTimeout(2000);
            return;
        }

        page().locator(selector).waitFor();
    }

    @Override
    public void waitFor(long milliseconds) {

        page().waitForTimeout(milliseconds);
    }

    @Override
    public void scroll() {

        page().mouse().wheel(0, 1000);
    }

    @Override
    public void select(String selector, String value) {

        page().locator(selector).selectOption(value);
    }

    @Override
    public void upload(String selector, String filePath) {

        page().locator(selector).setInputFiles(Paths.get(filePath));
    }

    @Override
    public String extractText(String selector) {

        if (selector == null || selector.isBlank()) {
            selector = "body";
        }

        return page().locator(selector).innerText();
    }

    @Override
    public void hover(String selector) {

        page().locator(selector).hover();
    }

    @Override
    public void pressKey(String key) {

        page().keyboard().press(key);
    }

    @Override
    public void back() {

        page().goBack();
    }

    @Override
    public void forward() {

        page().goForward();
    }

    @Override
    public void refresh() {

        page().reload();
    }

    @Override
    public byte[] screenshot() {

        try {

            if (page == null || page.isClosed()) {
                return null;
            }

            return page.screenshot(
                    new Page.ScreenshotOptions()
                            .setFullPage(true)
            );

        } catch (Exception e) {

            log.warn("Unable to capture screenshot.", e);

            return null;
        }
    }

    @Override
    public String currentUrl() {

        try {

            if (page == null || page.isClosed()) {
                return "";
            }

            return page.url();

        } catch (Exception e) {

            log.warn("Unable to get current URL.", e);

            return "";
        }
    }

    @Override
    public String getPageContent() {

        return pageAnalyzer.analyze(page());
    }

    @Override
    public void close() {

        try {

            if (page != null && !page.isClosed()) {
                page.close();
            }

        } finally {

            page = null;

            try {
                if (context != null) {
                    context.close();
                }
            } finally {
                context = null;
            }
        }
    }
}
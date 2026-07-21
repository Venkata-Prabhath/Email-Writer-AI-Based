package com.webpilot.browser;

import com.webpilot.websocket.ProgressWebSocketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrowserExecutorImpl implements BrowserExecutor {

    private final PlaywrightService playwrightService;
    private final ProgressWebSocketService progressService;

    private final ThreadLocal<String> currentTaskId = new ThreadLocal<>();

    public void setTaskId(String taskId) {
        currentTaskId.set(taskId);
    }

    public void clearTaskId() {
        currentTaskId.remove();
    }

    private String taskId() {
        return currentTaskId.get() == null
                ? "default"
                : currentTaskId.get();
    }

    @Override
    public BrowserResult execute(BrowserInstruction instruction) throws Exception {
        return execute(List.of(instruction));
    }

    @Override
    public BrowserResult execute(List<BrowserInstruction> instructions) {

        long start = System.currentTimeMillis();

        try {

            for (BrowserInstruction instruction : instructions) {

                log.info(
                        "Executing {} | target={} | value={}",
                        instruction.getAction(),
                        instruction.getTarget(),
                        instruction.getValue()
                );

                executeInstruction(instruction);

                String url = safeUrl();

                String screenshot = null;

                try {
                    byte[] image = playwrightService.screenshot();

                    if (image != null && image.length > 0) {
                        screenshot = Base64.getEncoder()
                                .encodeToString(image);
                    }
                } catch (Exception ignored) {
                }

                progressService.send(
                        taskId(),
                        "RUNNING",
                        instruction.getAction().name(),
                        url,
                        screenshot
                );
            }

            long executionTime =
                    System.currentTimeMillis() - start;

            progressService.send(
                    taskId(),
                    "COMPLETED",
                    "Execution Completed",
                    safeUrl(),
                    null
            );

            return BrowserResult.builder()
                    .success(true)
                    .message("Execution completed successfully.")
                    .currentUrl(safeUrl())
                    .executionTime(executionTime)
                    .build();

        } catch (Exception ex) {

            log.error("Browser execution failed", ex);

            progressService.send(
                    taskId(),
                    "FAILED",
                    ex.getMessage(),
                    safeUrl(),
                    null
            );

            return BrowserResult.builder()
                    .success(false)
                    .message(ex.getMessage())
                    .currentUrl(safeUrl())
                    .executionTime(
                            System.currentTimeMillis() - start
                    )
                    .build();
        }
    }

    private void executeInstruction(BrowserInstruction instruction) throws Exception {

        String target = instruction.getTarget() == null
                ? ""
                : instruction.getTarget().trim();

        String value = instruction.getValue() == null
                ? ""
                : instruction.getValue().trim();

        switch (instruction.getAction()) {

            case OPEN -> {

                if (target.isBlank()) {
                    throw new BrowserException(
                            "OPEN action requires a URL."
                    );
                }

                playwrightService.open(target);
            }

            case SEARCH -> {

                if (value.isBlank()) {
                    throw new BrowserException(
                            "SEARCH action requires search text."
                    );
                }

                playwrightService.search(value);
            }

            case CLICK -> {

                if (target.isBlank()) {
                    throw new BrowserException(
                            "CLICK action requires a selector."
                    );
                }

                playwrightService.click(target);
            }

            case TYPE -> {

                if (target.isBlank()) {
                    throw new BrowserException(
                            "TYPE action requires a selector."
                    );
                }

                playwrightService.type(target, value);
            }
            case WAIT -> {

                if (target.isBlank()) {

                    long timeout = 2000;

                    if (!value.isBlank()) {
                        try {
                            timeout = Long.parseLong(value);
                        } catch (NumberFormatException ignored) {
                        }
                    }

                    playwrightService.waitFor(timeout);

                } else {

                    playwrightService.waitFor(target);
                }
            }

            case SCROLL -> {
                playwrightService.scroll();
            }

            case SELECT -> {

                if (target.isBlank()) {
                    throw new BrowserException(
                            "SELECT action requires a selector."
                    );
                }

                playwrightService.select(target, value);
            }

            case UPLOAD -> {

                if (target.isBlank()) {
                    throw new BrowserException(
                            "UPLOAD action requires a selector."
                    );
                }

                if (value.isBlank()) {
                    throw new BrowserException(
                            "UPLOAD action requires a file path."
                    );
                }

                playwrightService.upload(target, value);
            }

            case DOWNLOAD -> {

                log.info("DOWNLOAD action is not implemented yet.");
            }

            case EXTRACT_TEXT -> {

                String selector =
                        target.isBlank() ? "body" : target;

                String text =
                        playwrightService.extractText(selector);

                log.info("Extracted Text:\n{}", text);

                progressService.send(
                        taskId(),
                        "RUNNING",
                        text,
                        safeUrl(),
                        screenshotSafe()
                );
            }

            case HOVER -> {

                if (target.isBlank()) {
                    throw new BrowserException(
                            "HOVER action requires a selector."
                    );
                }

                playwrightService.hover(target);
            }

            case PRESS_KEY -> {

                if (value.isBlank()) {
                    throw new BrowserException(
                            "PRESS_KEY requires a key."
                    );
                }

                playwrightService.pressKey(value);
            }

            case BACK -> {
                playwrightService.back();
            }

            case FORWARD -> {
                playwrightService.forward();
            }

            case REFRESH -> {
                playwrightService.refresh();
            }

            case SCREENSHOT -> {

                progressService.send(
                        taskId(),
                        "RUNNING",
                        "Screenshot",
                        safeUrl(),
                        screenshotSafe()
                );
            }

            case CLOSE -> {
                playwrightService.close();
            }

            default -> throw new BrowserException(
                    "Unsupported action: " + instruction.getAction()
            );
        }
    }
    private String safeUrl() {

        try {

            String url = playwrightService.currentUrl();

            return url == null ? "" : url;

        } catch (Exception ex) {

            return "";
        }
    }

    private String screenshotSafe() {

        try {

            byte[] image = playwrightService.screenshot();

            if (image == null || image.length == 0) {
                return null;
            }

            return Base64.getEncoder().encodeToString(image);

        } catch (Exception ex) {

            log.debug("Unable to capture screenshot.", ex);
            return null;
        }
    }
}
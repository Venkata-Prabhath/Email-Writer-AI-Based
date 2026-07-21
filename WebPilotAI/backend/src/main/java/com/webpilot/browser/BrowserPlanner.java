package com.webpilot.browser;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BrowserPlanner {

    public List<BrowserInstruction> plan(String command) {

        List<BrowserInstruction> instructions = new ArrayList<>();

        if (command == null || command.isBlank()) {
            return instructions;
        }

        command = command.trim();

        String lower = command.toLowerCase();

        if (lower.startsWith("open ")) {

            String url = command.substring(5).trim();

            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "https://" + url;
            }

            instructions.add(
                    BrowserInstruction.builder()
                            .action(BrowserAction.OPEN)
                            .target(url)
                            .value("")
                            .build()
            );

            return instructions;
        }

        if (lower.startsWith("search ")) {

            instructions.add(
                    BrowserInstruction.builder()
                            .action(BrowserAction.SEARCH)
                            .target("")
                            .value(command.substring(7).trim())
                            .build()
            );

            return instructions;
        }

        if (lower.equals("back")) {

            instructions.add(
                    BrowserInstruction.builder()
                            .action(BrowserAction.BACK)
                            .target("")
                            .value("")
                            .build()
            );

            return instructions;
        }

        if (lower.equals("forward")) {

            instructions.add(
                    BrowserInstruction.builder()
                            .action(BrowserAction.FORWARD)
                            .target("")
                            .value("")
                            .build()
            );

            return instructions;
        }

        if (lower.equals("refresh")) {

            instructions.add(
                    BrowserInstruction.builder()
                            .action(BrowserAction.REFRESH)
                            .target("")
                            .value("")
                            .build()
            );

            return instructions;
        }

        if (lower.equals("close")) {

            instructions.add(
                    BrowserInstruction.builder()
                            .action(BrowserAction.CLOSE)
                            .target("")
                            .value("")
                            .build()
            );

            return instructions;
        }

        if (lower.equals("screenshot")) {

            instructions.add(
                    BrowserInstruction.builder()
                            .action(BrowserAction.SCREENSHOT)
                            .target("")
                            .value("")
                            .build()
            );

            return instructions;
        }

        if (lower.equals("extract")) {

            instructions.add(
                    BrowserInstruction.builder()
                            .action(BrowserAction.EXTRACT_TEXT)
                            .target("body")
                            .value("")
                            .build()
            );

            return instructions;
        }

        return instructions;
    }

}
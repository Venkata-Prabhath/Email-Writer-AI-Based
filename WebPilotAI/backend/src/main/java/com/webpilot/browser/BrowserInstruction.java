package com.webpilot.browser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BrowserInstruction {

    /**
     * Browser action to execute.
     */
    private BrowserAction action;

    /**
     * CSS selector, URL, or target element.
     */
    private String target;

    /**
     * Value associated with the action.
     * Examples:
     * TYPE  -> text to enter
     * WAIT  -> milliseconds
     * OPEN  -> optional
     * CLICK -> empty string
     */
    private String value;

    /**
     * Optional description for logging/debugging.
     */
    @Builder.Default
    private String description = "";

    /**
     * Whether execution should stop if this instruction fails.
     */
    @Builder.Default
    private boolean required = true;
}
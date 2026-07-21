package com.webpilot.browser;

import java.util.List;

public interface BrowserExecutor {

    /**
     * Executes a single browser instruction.
     *
     * @param instruction browser instruction
     * @return execution result
     */
    BrowserResult execute(BrowserInstruction instruction) throws Exception;

    /**
     * Executes multiple browser instructions sequentially.
     *
     * @param instructions list of browser instructions
     * @return final execution result
     */
    BrowserResult execute(List<BrowserInstruction> instructions) throws Exception;

}
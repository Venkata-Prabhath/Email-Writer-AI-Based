package com.webpilot.dto.ai;

import com.webpilot.browser.BrowserResult;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AgentResponse {

    private boolean success;
    private String message;
    private BrowserResult result;

}
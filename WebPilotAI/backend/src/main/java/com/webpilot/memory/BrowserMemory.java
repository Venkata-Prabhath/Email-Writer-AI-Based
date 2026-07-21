package com.webpilot.memory;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BrowserMemory {

    private String sessionId;

    private String currentUrl;

    private String currentPageTitle;

    private String lastAction;

}
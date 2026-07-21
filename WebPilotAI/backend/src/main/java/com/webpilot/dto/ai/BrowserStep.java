package com.webpilot.dto.ai;

import lombok.Data;

@Data
public class BrowserStep {

    private String action;
    private String target;
    private String value;

}
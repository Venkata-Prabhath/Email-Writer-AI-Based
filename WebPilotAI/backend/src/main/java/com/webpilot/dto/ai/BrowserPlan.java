package com.webpilot.dto.ai;

import lombok.Data;

import java.util.List;

@Data
public class BrowserPlan {

    private List<BrowserStep> steps;

}
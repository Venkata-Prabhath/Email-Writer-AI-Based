package com.webpilot.tool;

import org.springframework.stereotype.Service;

@Service
public class ToolExecutor {

    public Object execute(Tool tool, Object input) {
        return tool.execute(input);
    }

}
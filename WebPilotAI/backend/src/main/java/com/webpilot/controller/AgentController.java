package com.webpilot.controller;

import com.webpilot.service.ExecutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agent")
@RequiredArgsConstructor
public class AgentController {

    private final ExecutionService executionService;

    @PostMapping("/execute")
    public String execute(@RequestBody String prompt) {

        // TODO: Replace with the actual task ID after creating a Task.
        executionService.runTask(1L, prompt);

        return "Task started";
    }
}
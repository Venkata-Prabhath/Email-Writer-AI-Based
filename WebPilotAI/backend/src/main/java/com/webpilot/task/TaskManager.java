package com.webpilot.task;

import org.springframework.stereotype.Service;

@Service
public class TaskManager {

    public TaskContext createTask(String prompt) {

        return TaskContext.builder()
                .taskId(java.util.UUID.randomUUID().toString())
                .prompt(prompt)
                .status("PENDING")
                .build();

    }

}
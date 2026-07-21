package com.webpilot.task;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskContext {

    private String taskId;
    private String prompt;
    private String status;

}
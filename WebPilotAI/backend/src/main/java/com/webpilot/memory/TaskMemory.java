package com.webpilot.memory;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TaskMemory {

    private String taskId;

    private String prompt;

    private String status;

    private String result;

}
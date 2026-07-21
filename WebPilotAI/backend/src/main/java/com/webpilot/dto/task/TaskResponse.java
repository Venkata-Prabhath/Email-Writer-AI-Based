package com.webpilot.dto.task;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskResponse {

    private Long id;
    private String prompt;
    private String status;

}
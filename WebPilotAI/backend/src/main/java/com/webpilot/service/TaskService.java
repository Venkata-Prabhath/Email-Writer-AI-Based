package com.webpilot.service;

import com.webpilot.dto.task.CreateTaskRequest;
import com.webpilot.dto.task.TaskResponse;

import java.util.List;

public interface TaskService {

    TaskResponse createTask(CreateTaskRequest request);

    List<TaskResponse> getAllTasks();

    TaskResponse getTaskById(Long id);

    void deleteTask(Long id);

}
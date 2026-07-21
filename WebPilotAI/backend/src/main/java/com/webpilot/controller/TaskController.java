package com.webpilot.controller;

import com.webpilot.dto.task.CreateTaskRequest;
import com.webpilot.dto.task.TaskResponse;
import com.webpilot.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5176")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public TaskResponse createTask(
            @RequestBody CreateTaskRequest request) {

        return taskService.createTask(request);
    }

    @GetMapping
    public List<TaskResponse> getAllTasks() {

        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public TaskResponse getTask(
            @PathVariable Long id) {

        return taskService.getTaskById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(
            @PathVariable Long id) {

        taskService.deleteTask(id);
    }
}

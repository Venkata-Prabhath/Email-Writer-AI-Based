package com.webpilot.service;

import com.webpilot.dto.task.CreateTaskRequest;
import com.webpilot.dto.task.TaskResponse;
import com.webpilot.entity.Task;
import com.webpilot.entity.enums.TaskStatus;
import com.webpilot.exception.TaskNotFoundException;
import com.webpilot.repository.TaskRepository;
import com.webpilot.service.cache.RedisCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ExecutionService executionService;
    private final RedisCacheService redisCacheService;

    @Override
    public TaskResponse createTask(CreateTaskRequest request) {

        Task task = Task.builder()
                .prompt(request.getPrompt())
                .status(TaskStatus.PENDING)
                .build();

        Task savedTask = taskRepository.save(task);

        // Cache initial task status
        redisCacheService.saveTaskStatus(
                savedTask.getId(),
                savedTask.getStatus().name()
        );

        // Execute asynchronously
        executionService.runTask(
                savedTask.getId(),
                savedTask.getPrompt()
        );

        return new TaskResponse(
                savedTask.getId(),
                savedTask.getPrompt(),
                savedTask.getStatus().name()
        );
    }

    @Override
    public List<TaskResponse> getAllTasks() {

        return taskRepository.findAll()
                .stream()
                .map(task -> {

                    String status = redisCacheService.getTaskStatus(task.getId());

                    if (status == null) {
                        status = task.getStatus().name();
                    }

                    return new TaskResponse(
                            task.getId(),
                            task.getPrompt(),
                            status
                    );

                })
                .toList();
    }

    @Override
    public TaskResponse getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found"));

        String status = redisCacheService.getTaskStatus(id);

        if (status == null) {
            status = task.getStatus().name();
        }

        return new TaskResponse(
                task.getId(),
                task.getPrompt(),
                status
        );
    }

    @Override
    public void deleteTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found"));

        taskRepository.delete(task);

        redisCacheService.removeTaskStatus(id);
    }

}

package com.webpilot.service;

import com.webpilot.agent.DecisionEngine;
import com.webpilot.browser.BrowserExecutorImpl;
import com.webpilot.entity.Task;
import com.webpilot.entity.enums.TaskStatus;
import com.webpilot.repository.TaskRepository;
import com.webpilot.service.cache.RedisCacheService;
import com.webpilot.websocket.ProgressWebSocketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExecutionService {

    private final DecisionEngine decisionEngine;
    private final TaskRepository taskRepository;
    private final ProgressWebSocketService progressWebSocketService;
    private final BrowserExecutorImpl browserExecutor;
    private final RedisCacheService redisCacheService;

    @Async
    public void runTask(Long taskId, String prompt) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new RuntimeException("Task not found: " + taskId));

        try {

            // -----------------------------
            // RUNNING
            // -----------------------------

            task.setStatus(TaskStatus.RUNNING);
            taskRepository.save(task);

            redisCacheService.saveTaskStatus(
                    taskId,
                    TaskStatus.RUNNING.name()
            );

            browserExecutor.setTaskId(taskId.toString());

            progressWebSocketService.send(
                    taskId.toString(),
                    "RUNNING",
                    "Task started",
                    null,
                    null
            );

            // -----------------------------
            // Execute AI Task
            // -----------------------------

            decisionEngine.runTask(prompt);

            // -----------------------------
            // COMPLETED
            // -----------------------------

            task.setStatus(TaskStatus.COMPLETED);
            taskRepository.save(task);

            redisCacheService.saveTaskStatus(
                    taskId,
                    TaskStatus.COMPLETED.name()
            );

            progressWebSocketService.send(
                    taskId.toString(),
                    "COMPLETED",
                    "Task completed",
                    null,
                    null
            );

            log.info("Task {} completed successfully.", taskId);

        } catch (Exception ex) {

            log.error("Task {} failed.", taskId, ex);

            task.setStatus(TaskStatus.FAILED);
            taskRepository.save(task);

            redisCacheService.saveTaskStatus(
                    taskId,
                    TaskStatus.FAILED.name()
            );

            progressWebSocketService.send(
                    taskId.toString(),
                    "FAILED",
                    ex.getMessage(),
                    null,
                    null
            );

        } finally {

            browserExecutor.clearTaskId();

        }
    }

}
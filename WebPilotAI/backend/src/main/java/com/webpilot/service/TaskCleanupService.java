package com.webpilot.service;

import com.webpilot.entity.enums.TaskStatus;
import com.webpilot.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskCleanupService {

    private final TaskRepository taskRepository;

    /**
     * Runs every day at 2:00 AM
     *
     * COMPLETED / FAILED  -> Delete after 2 days
     * PENDING / RUNNING   -> Delete after 7 days
     */
    @Scheduled(cron = "0 0 2 * * *")
    public void cleanupTasks() {

        log.info("======================================");
        log.info("Starting Scheduled Task Cleanup");
        log.info("======================================");

        long completedDeleted =
                taskRepository.deleteByStatusInAndUpdatedAtBefore(
                        List.of(
                                TaskStatus.COMPLETED,
                                TaskStatus.FAILED
                        ),
                        LocalDateTime.now().minusDays(2)
                );

        long pendingDeleted =
                taskRepository.deleteByStatusInAndCreatedAtBefore(
                        List.of(
                                TaskStatus.PENDING,
                                TaskStatus.RUNNING
                        ),
                        LocalDateTime.now().minusDays(7)
                );

        log.info("--------------------------------------");
        log.info("Completed Tasks Deleted : {}", completedDeleted);
        log.info("Pending Tasks Deleted   : {}", pendingDeleted);
        log.info("--------------------------------------");
        log.info("Cleanup Finished Successfully");
        log.info("======================================");
    }
}
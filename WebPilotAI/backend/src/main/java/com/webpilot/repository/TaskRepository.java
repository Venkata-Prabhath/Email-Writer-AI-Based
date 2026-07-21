package com.webpilot.repository;

import com.webpilot.entity.Task;
import com.webpilot.entity.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    long deleteByStatusInAndUpdatedAtBefore(
            List<TaskStatus> statuses,
            LocalDateTime updatedAt
    );

    long deleteByStatusInAndCreatedAtBefore(
            List<TaskStatus> statuses,
            LocalDateTime createdAt
    );

}
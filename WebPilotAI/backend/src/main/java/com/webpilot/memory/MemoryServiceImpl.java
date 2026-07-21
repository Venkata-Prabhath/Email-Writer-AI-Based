package com.webpilot.memory;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MemoryServiceImpl implements MemoryService {

    private final Map<String, TaskMemory> tasks = new ConcurrentHashMap<>();
    private final Map<String, BrowserMemory> sessions = new ConcurrentHashMap<>();

    @Override
    public void saveTask(TaskMemory taskMemory) {
        tasks.put(taskMemory.getTaskId(), taskMemory);
    }

    @Override
    public TaskMemory getTask(String taskId) {
        return tasks.get(taskId);
    }

    @Override
    public void saveBrowserSession(BrowserMemory browserMemory) {
        sessions.put(browserMemory.getSessionId(), browserMemory);
    }

    @Override
    public BrowserMemory getBrowserSession(String sessionId) {
        return sessions.get(sessionId);
    }

}
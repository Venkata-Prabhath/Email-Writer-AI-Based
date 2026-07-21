package com.webpilot.memory;

public interface MemoryService {

    void saveTask(TaskMemory taskMemory);

    TaskMemory getTask(String taskId);

    void saveBrowserSession(BrowserMemory browserMemory);

    BrowserMemory getBrowserSession(String sessionId);

}
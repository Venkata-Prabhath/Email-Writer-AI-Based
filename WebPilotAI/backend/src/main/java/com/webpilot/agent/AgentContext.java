package com.webpilot.agent;

import com.webpilot.browser.BrowserInstruction;
import com.webpilot.browser.BrowserResult;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AgentContext {

    private String prompt;

    @Builder.Default
    private AgentState state = AgentState.IDLE;

    @Builder.Default
    private List<BrowserInstruction> instructions = List.of();

    private BrowserResult result;

    @Builder.Default
    private Map<String, Object> memory = new HashMap<>();

    public void putMemory(String key, Object value) {
        memory.put(key, value);
    }

    public Object getMemory(String key) {
        return memory.get(key);
    }

    public <T> T getMemory(String key, Class<T> type) {
        Object value = memory.get(key);
        if (value == null) {
            return null;
        }
        return type.cast(value);
    }

    public void clearMemory() {
        memory.clear();
    }
}
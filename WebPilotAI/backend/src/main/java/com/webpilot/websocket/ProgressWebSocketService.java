package com.webpilot.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProgressWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void send(String taskId,
                     String status,
                     String message,
                     String url,
                     String screenshot) {

        messagingTemplate.convertAndSend(
                "/topic/progress/" + taskId,
                new ProgressMessage(
                        status,
                        message,
                        url,
                        screenshot
                )
        );
    }

    @Data
    @AllArgsConstructor
    public static class ProgressMessage {

        private String status;
        private String message;
        private String url;
        private String screenshot;

    }
}
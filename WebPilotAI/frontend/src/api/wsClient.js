import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let client = null;

export const connectWebSocket = (taskId, onMessageReceived) => {
  client = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8084/ws"),

    onConnect: () => {
      client.subscribe(`/topic/progress/${taskId}`, (message) => {
        if (onMessageReceived) {
          onMessageReceived(JSON.parse(message.body));
        }
      });
    },

    onStompError: (frame) => {
      console.error("WebSocket Error:", frame);
    },
  });

  client.activate();
  return client;
};

export const disconnectWebSocket = () => {
  if (client) {
    client.deactivate();
    client = null;
  }
};
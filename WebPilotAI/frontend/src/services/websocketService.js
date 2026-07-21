import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let client = null;

export const connectWebSocket = () => {

    client = new Client({

        webSocketFactory: () =>
            new SockJS("http://localhost:8084/ws"),

        reconnectDelay: 5000

    });

    client.activate();

    return client;

};

export const disconnectWebSocket = () => {

    if (client) {

        client.deactivate();

    }

};
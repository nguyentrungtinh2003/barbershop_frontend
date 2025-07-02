import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const socketUrl = "http://localhost:8081/ws";

const client = new Client({
  webSocketFactory: () => new SockJS(socketUrl),
  debug: (str) => console.log(str),
  reconnectDelay: 5000,
});

export default client;

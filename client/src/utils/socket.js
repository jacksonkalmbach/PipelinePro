import { io } from "socket.io-client";

const socket = io("http://localhost:5001", {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
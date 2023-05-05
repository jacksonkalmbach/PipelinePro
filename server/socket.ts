import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";
import { v4 } from "uuid";

export class ServerSocket {
  public static instance: ServerSocket;
  private io: Server;

  public users: { [uid: string]: string };

  constructor(server: HTTPServer) {
    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "*",
      },
    });

    this.io.on("connect", this.StartListeners);

    console.info("Socket server initialized");
  }

  StartListeners = (socket: Socket) => {
    console.info("message received from", socket.id);

    socket.on("handshake", () => {
      console.info("handshake received from", socket.id);
    });

    socket.on("disconnect", () => {
      console.info("user disconnected", socket.id);
    });
  };
}

class Message {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
  }
  
  class ChatWebSocket {
  
    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === "http:" ? "ws" : "wss";
      this.socket = new WebSocket(
        `${protocol}://${window.location.hostname}:${port}/ws`
      );
      this.socket.onopen = (event) => {
        console.log("connected");
      };
      this.socket.onclose = (event) => {
        console.log("disconnected");
      };
      this.socket.onmessage = async (msg) => {
        try {
          const message = JSON.parse(await msg.data.text());
          // Run a function here depending on what the message is
          switch (message.type) {
            case "message":
              this.getMessage(message.value);
              break;
          }
        } catch {}
      };
    }
  
    sendMessage(type, value) {
      const event = new Message(type, value);
      this.socket.send(JSON.stringify(event));
    }
  }
  
  const chatWebSocket = new ChatWebSocket();
  export { chatWebSocket };
  
// src/socket.js
let io = null;

module.exports = {
  init: (serverIo) => { io = serverIo; },
  getIO: () => {
    if (!io) throw new Error("Socket.IO no inicializado!");
    return io;
  }
};
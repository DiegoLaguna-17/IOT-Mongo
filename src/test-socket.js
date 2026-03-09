// test-socket.js
const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Conectado al servidor con id:", socket.id);
});

socket.on("updateData", (datos) => {
  console.log("Datos recibidos:", datos);
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});
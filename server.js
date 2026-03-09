require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./src/db/mongo");
const socket = require("./src/socket");

const PORT = process.env.PORT || 3000;

connectDB();

const server = http.createServer(app);

// Configurar Socket.IO
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);
  socket.on("disconnect", () => console.log("Cliente desconectado:", socket.id));
});
socket.init(io);
// Exportar io para usarlo en controllers
module.exports = { server, io };

// Levantar servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
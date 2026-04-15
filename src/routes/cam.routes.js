const express = require("express");
const router = express.Router();
const camController = require("../controllers/ipcam.controller");

router.post("/foto", (req, res) => {
  console.log("Movimiento detectado desde ESP32");
    console.log(req.body)
  // 1️⃣ Respondemos rápido al ESP32
  res.json({ status: "grabacion_iniciada" });

  // 2️⃣ Grabación en segundo plano (no bloquea al ESP32)
  const timestamp = Date.now();
  camController.grabarVideo(`video_${timestamp}.mp4`, 6);
});

router.post("/notificar", camController.notificarESP);

module.exports = router;
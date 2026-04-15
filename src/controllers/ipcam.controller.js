const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
require("dotenv").config();
const CAM_IP = process.env.CAM_IP;
const CAM_PORT = process.env.CAM_PORT;
const USUARIO = process.env.CAM_USER;
const PASSWORD = process.env.CAM_PASS;
const ESP_IP = process.env.ESP_IP; 

// 🎯 URL de tu servidor FastAPI (ajusta la IP si FastAPI corre en otra máquina)
const FASTAPI_URL =process.env.PY_IP; 

let grabando = false;

async function setESPColor(r, g, b) {
  try {
    const url = `http://${ESP_IP}/rgb?r=${r}&g=${g}&b=${b}`;
    await axios.get(url, { timeout: 1500 });
    console.log(`[ESP32] Color actualizado -> R:${r} G:${g} B:${b}`);
  } catch (error) {
    console.warn("[ESP32] Error comunicando color:", error.message);
  }
}

// 🛠️ NUEVA FUNCIÓN: Extrae fotos y las manda a Python
async function extraerYEnviarFrames(videoPath) {
  const framesFolder = path.join(__dirname, 'frames');
  if (!fs.existsSync(framesFolder)) fs.mkdirSync(framesFolder);

  const baseName = path.basename(videoPath, '.mp4');
  console.log(`📸 Extrayendo 3 fotogramas de: ${videoPath}`);

  // Usamos fluent-ffmpeg para sacar 3 fotos repartidas en los 6 segundos
  ffmpeg(videoPath)
    .on('end', async () => {
      console.log("✅ Fotogramas listos. Evaluando con FastAPI...");
      const resultados = [];

      // Iteramos sobre las 3 imágenes generadas
      for (let i = 1; i <= 3; i++) {
        const framePath = path.join(framesFolder, `${baseName}-frame-${i}.jpg`);
        
        if (fs.existsSync(framePath)) {
          try {
            const form = new FormData();
            form.append("file", fs.createReadStream(framePath));

            // Llamamos a tu API en Python
            const response = await axios.post(FASTAPI_URL, form, {
              headers: { ...form.getHeaders() }
            });

            const data = response.data;
            console.log(`- Frame ${i}:`, data);

            // Si reconoció a alguien válido (no es Desconocido), lo guardamos
            if (data.result !== "Desconocido") {
              resultados.push(data.result);
            }

            // 🧹 Limpieza: borramos la foto extraída para no llenar tu disco duro
            fs.unlinkSync(framePath);

          } catch (error) {
            console.error(`❌ Error con FastAPI en frame ${i}:`, error.message);
          }
        }
      }

      // 🧠 LÓGICA DE CONSENSO: Decidir de quién es la asistencia
      if (resultados.length > 0) {
        // Encontrar el nombre que más se repite en el array
        const conteo = resultados.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {});
        const alumnoReconocido = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);
        
        console.log(`🏆 ASISTENCIA REGISTRADA PARA: ${alumnoReconocido.toUpperCase()}`);
        
        // 🎉 ¡Notificamos al ESP32 para que brille en azul!
        setESPColor(0, 0, 65535);
        setTimeout(() => setESPColor(0, 65535, 0), 3000); // Vuelve a verde
      } else {
        console.log("🤷‍♂️ No se reconoció a ningún alumno en el video.");
        // Podrías poner el ESP en amarillo o rojo para indicar error
      }
    })
    .on('error', (err) => {
      console.error("❌ Error extrayendo fotogramas:", err.message);
    })
    .screenshots({
      count: 3, // Cantidad de fotos a extraer
      filename: `${baseName}-frame-%i.jpg`,
      folder: framesFolder
    });
}

function grabarVideo(nombreArchivo = "video.mp4", duracion = 6) {
  if (grabando) {
    console.log("Ya hay una grabación en curso, ignorando nuevo request");
    return;
  }

  grabando = true;
  const url = `http://${USUARIO}:${PASSWORD}@${CAM_IP}:${CAM_PORT}/video`;

  setESPColor(65535, 0, 0); 

  ffmpeg(url)
    .inputFormat("mjpeg")
    .videoCodec("libx264")
    .outputOptions("-pix_fmt yuv420p")
    .duration(duracion)
    .save(nombreArchivo)
    .on("start", cmd => console.log("🎥 Grabando video..."))
    .on("end", () => {
      console.log("💾 Video guardado ✅");
      grabando = false; 
      setESPColor(0, 65535, 0); 
      
      // 👇 LLAMAMOS A LA NUEVA FUNCIÓN AQUÍ 👇
      extraerYEnviarFrames(nombreArchivo);
    })
    .on("error", err => {
      console.error("Error ffmpeg:", err.message);
      grabando = false; 
      setESPColor(0, 65535, 0); 
    });
}

async function notificarESP(req, res) {
  await setESPColor(0, 0, 65535);
  res.json({ status: "notificado, brillando azul por 3s" });

  setTimeout(() => {
    console.log("Fin de notificación, volviendo a verde...");
    setESPColor(0, 65535, 0); 
  }, 3000);
}

module.exports = {
  grabarVideo, 
  notificarESP,
  setESPColor 
};
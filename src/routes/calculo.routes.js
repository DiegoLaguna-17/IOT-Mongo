const express = require("express")
const router = express.Router()

const calculoController = require("../controllers/calculo.controller")

router.post("/", calculoController.crearCalculo)
router.get("/usuario/:usuarioId", calculoController.obtenerCalculosUsuario)
router.get("/:id", calculoController.obtenerCalculoId)
module.exports = router
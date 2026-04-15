const express = require("express")

const calculoRoutes = require("./calculo.routes")
const serieRoutes=require("./serie.routes")
const usuarioRoutes=require("./usuario.routes")
const camRoutes=require("./cam.routes")
const router = express.Router()
router.use("/usuarios",usuarioRoutes)
router.use("/calculos", calculoRoutes)
router.use("/series",serieRoutes)
router.use("/camara",camRoutes)

module.exports = router
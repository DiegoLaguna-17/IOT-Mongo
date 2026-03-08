const express = require("express")

const calculoRoutes = require("./calculo.routes")
const serieRoutes=require("./serie.routes")

const router = express.Router()

router.use("/calculos", calculoRoutes)
router.use("/series",serieRoutes)

module.exports = router
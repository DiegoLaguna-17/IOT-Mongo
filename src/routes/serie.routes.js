const express = require("express")
const router = express.Router()

const serieController = require("../controllers/serie.controller")

router.get("/", serieController.obtenerSeries)

module.exports = router
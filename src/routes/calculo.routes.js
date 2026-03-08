const express = require("express")
const router = express.Router()

const calculoController = require("../controllers/calculo.controller")

router.post("/", calculoController.crearCalculo)

module.exports = router
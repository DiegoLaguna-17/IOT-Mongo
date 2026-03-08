const calculoService = require("../services/calculo.service")

const crearCalculo = async (req, res) => {

    try {

        const nuevoCalculo = await calculoService.crearCalculo(req.body)

        res.status(201).json({
            success: true,
            data: nuevoCalculo
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}

module.exports = {
    crearCalculo
}
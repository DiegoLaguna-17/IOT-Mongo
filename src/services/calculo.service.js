const Calculo = require("../models/calculo.model")

const crearCalculo = async (data) => {

    const calculo = new Calculo(data)

    const resultado = await calculo.save()

    return resultado

}

module.exports = {
    crearCalculo
}
const Calculo = require("../models/calculo.model")
require("../models/usuario.model")
require("../models/serie.model")

const crearCalculo = async (data) => {

    const calculo = new Calculo(data)

    const resultado = await calculo.save()

    return resultado

}

const obtenerCalculosPorUsuario = async (usuarioId) => {

    const calculos = await Calculo
        .find(
            { usuario: usuarioId },
            "resultado_aprox valor_real error fecha serie nombre_calculo"
        )
        .populate("serie", "nombre")

    return calculos
}

const obtenerCalculoPorId = async (calculoId) => {

    const calculo = await Calculo
        .findById(calculoId)
        //.populate("usuario", "nombre correo")
        .populate("serie", "nombre funcion descripcion")

    return calculo
}
module.exports = {
    crearCalculo, obtenerCalculosPorUsuario, obtenerCalculoPorId
}
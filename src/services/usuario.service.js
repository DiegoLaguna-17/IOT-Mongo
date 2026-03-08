const Usuario = require("../models/usuario.model")
const bcrypt = require("bcrypt")

const crearUsuario = async ({ nombre, correo, contrasenia }) => {
    // Encriptar contraseña
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(contrasenia, saltRounds)

    const usuario = new Usuario({
        nombre,
        correo,
        contrasenia: hashedPassword
    })

    const resultado = await usuario.save()
    return resultado
}

module.exports = {
    crearUsuario
}
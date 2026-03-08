const Usuario = require("../models/usuario.model")
const bcrypt = require("bcrypt")


async function loginUsuario(correo, contrasenia) {
    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        throw new Error("Correo o contraseña incorrectos");
    }

    // Verificar contraseña
    const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!contraseniaValida) {
        throw new Error("Correo o contraseña incorrectos");
    }

    // Retornar solo los datos que quieres
    return {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo
    };
}

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
    crearUsuario,loginUsuario
}
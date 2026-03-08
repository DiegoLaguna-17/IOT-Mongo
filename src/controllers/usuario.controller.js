const usuarioService = require("../services/usuario.service")

const crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, contrasenia } = req.body

        const nuevoUsuario = await usuarioService.crearUsuario({ nombre, correo, contrasenia })

        res.status(201).json({
            success: true,
            data: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    crearUsuario
}
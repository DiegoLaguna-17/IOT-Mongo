const usuarioService = require("../services/usuario.service")


async function login(req, res) {
    console.log("📌 Endpoint /usuarios/login fue hiteado");

    try {
        const { correo, contrasenia } = req.body;

        console.log("📥 Datos recibidos:", { correo });

        if (!correo || !contrasenia) {
            console.log("⚠️ Faltan datos para login");

            return res.status(400).json({
                success: false,
                data: "Correo y contraseña son requeridos"
            });
        }

        const usuarioData = await usuarioService.loginUsuario(correo, contrasenia);

        console.log("✅ Login exitoso para:", correo);

        res.json({
            success: true,
            data: usuarioData
        });

    } catch (error) {
        console.log("❌ Error en login:", error.message);

        res.status(401).json({
            success: false,
            data: error.message
        });
    }
}

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
    crearUsuario,login, 
}
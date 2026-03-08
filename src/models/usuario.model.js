const mongoose = require("mongoose")

const usuarioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true,
        unique: true
    }

})

module.exports = mongoose.model("usuarios", usuarioSchema)
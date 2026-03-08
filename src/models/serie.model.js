const mongoose = require("mongoose")

const serieSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    funcion: {
        type: String,
        enum: ["sin", "cos"],
        required: true
    },

    descripcion: {
        type: String
    },

    requiere_x: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model("series", serieSchema)
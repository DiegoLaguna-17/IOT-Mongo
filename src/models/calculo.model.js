const mongoose = require("mongoose")

const iteracionSchema = new mongoose.Schema({

    paso: Number,
    valor: Number,
    error:Number

})

const calculoSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },

    serie: {
         type: mongoose.Schema.Types.ObjectId,
        ref: "series",
        required: true
    },

    x_valor: {
        type: Number,
        required: true
    },

    n_terminos: {
        type: Number,
        required: true
    },

    resultado_aprox: {
        type: Number,
        required: true
    },

    valor_real: {
        type: Number
    },

    error: {
        type: Number
    },

    iteraciones: [iteracionSchema],

    fecha: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Calculo", calculoSchema)
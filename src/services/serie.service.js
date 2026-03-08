const Serie = require("../models/serie.model")

const obtenerSeries = async () => {

    const series = await Serie.find({})

    return series
}

module.exports = {
    obtenerSeries
}
const serieService = require("../services/serie.service")

const obtenerSeries = async (req, res) => {

    try {

        const series = await serieService.obtenerSeries()

        res.status(200).json({
            success: true,
            data: series
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}

module.exports = {
    obtenerSeries
}
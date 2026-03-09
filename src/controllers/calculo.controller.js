const { getIO } = require("../socket");
const calculoService = require("../services/calculo.service");

const crearCalculo = async (req, res) => {
  try {
    const nuevoCalculo = await calculoService.crearCalculo(req.body);

    // Emitir evento a todos los clientes conectados
    const io = getIO();
    io.emit("nuevoCalculo", nuevoCalculo);

    res.status(201).json({ success: true, data: nuevoCalculo });
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const obtenerCalculosUsuario = async (req, res) => {

    try {

        const usuarioId = req.params.usuarioId

        const calculos = await calculoService.obtenerCalculosPorUsuario(usuarioId)

        res.status(200).json({
            success: true,
            data: calculos
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}


const obtenerCalculoId = async (req, res) => {

    try {

        const calculoId = req.params.id

        const calculo = await calculoService.obtenerCalculoPorId(calculoId)

        if (!calculo) {
            return res.status(404).json({
                success: false,
                message: "Cálculo no encontrado"
            })
        }

        res.status(200).json({
            success: true,
            data: calculo
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



const obtenerDashFuncion=async(req,res)=>{
    try{
        const id=req.params.id


        const calculos= await calculoService.obtenerDashPorFuncion(id)
        
         if (!calculos) {
            return res.status(404).json({
                success: false,
                message: "Cálculo no encontrado"
            })
        }

        res.status(200).json({
            success: true,
            data: calculos
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = {
    crearCalculo, obtenerCalculosUsuario,obtenerCalculoId,  obtenerDashFuncion
}
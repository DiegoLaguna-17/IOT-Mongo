require("dotenv").config()

const app = require("./app")
const connectDB = require("./db/mongo")

const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, () => {

    console.log(`Servidor corriendo en puerto ${PORT}`)

})
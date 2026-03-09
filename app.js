const express = require("express")
const cors=require("cors")
const routes = require("./src/routes/index")

const app = express()

app.use(express.json())
app.use(cors({origin:'*'}))
app.use("/api", routes)

module.exports = app
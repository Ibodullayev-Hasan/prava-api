const express = require(`express`)
require("dotenv").config()
const mongo = require("./config/mongo")
const rout = require("./routes/mainRout")
const app = express()
app.use(express.json())

// port
const SERVER_PORT = process.env.SERVER_PORT
mongo()
        .then(() => console.log("db connected"))
        .catch((err) => console.log(err))

app.use(rout)

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT}-port work`);
    
})

const express  = require("express");
const port  = process.env.port;
const userRouter  = require("./routers/user");
const cors = require("cors");
require("./db/db");


const app = express()
app.use(cors())
app.use(express.json())
app.use(userRouter)

app.listen(3001, () => {
    console.log("Server running on port 3001 ....")
})
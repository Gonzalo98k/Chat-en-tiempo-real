
import express from "express"
import dotenv from "dotenv"
import logger from "morgan"
import http from "http"
import { Server } from "socket.io"
import path from "path"

dotenv.config()

const __dirname = path.resolve()

const app = express()
app.use(logger("dev"))
const server = http.createServer(app)

const io = new Server(server)

io.on("connection", (socket)=>{
    console.log("conectado xd");

    socket.on("disconnect", ()=>{
        console.log("User has disconnected");
    })
})

io.on('connection', (socket) => {
    socket.on('messageClient', (arg) => {
      io.emit('message', arg);
    });
  });

app.get("/", (req, res)=>{
    const rutaHTML = path.join(__dirname + "/client" + "/index.html")
    res.sendFile(rutaHTML)
})

server.listen(process.env.PORT, ()=>{
    console.log("Server is listening on the port 3000");
})
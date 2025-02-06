import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser';
import { AuthRoute } from './routes/auth.routes.js';
import connectDb from './db/ConnectDb.js';
import { MessageRoute } from './routes/Message.Route.js';
import { UserRoute } from './routes/User.Route.js';
import { app, server } from './socket/Socket.js';
import cors from "cors";

app.use(cors());

dotenv.config()

// const app = express(); // come to socket io
const PORT = process.env.PORT || 8000


app.get('/', (req, res) => {
    res.send("backend running")
})

//middlewares
app.use(express.json())
app.use(cookieParser())

const __dirname = path.resolve();

//routes
app.use('/api/auth', AuthRoute);
app.use('/api/message', MessageRoute)
app.use('/api/sidebaruser', UserRoute)


app.use(express.static(path.join(__dirname, '/frontend/dist')))


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})


//app listening
server.listen(PORT, () => {
    connectDb()
    console.log(`app is running at port:http://localhost:${PORT}`)
})
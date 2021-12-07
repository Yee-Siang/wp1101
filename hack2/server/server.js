import express from 'express'
import Routes from './routes/post'
import mongoose from 'mongoose'
import { dataInit } from './upload'
import WebSocket from 'ws';
import http from 'http';

require('dotenv').config()
const app = express()
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const port = process.env.PORT || 4000
const dboptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// TODO 1: connect to your mongodb here
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("connect!!"))

if (process.env.MODE === 'EXAM')
  dataInit()
const db = mongoose.connection
db.once("open", () => {
  console.log("MongoDB connected!")

  wss.on("connection", (ws) => {
    db.once("open", () => {
      console.log("connected!")
      wss.on("connection success", (ws) => {
        initData(ws);
      })
    })
  })
})

//

app.use('/api', Routes)

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
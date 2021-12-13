import WebSocket from 'ws';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import http from 'http';
import { sendData ,sendStatus,initData,initUser} from './wssConnect';
import Message from "./models/message.js"

dotenv.config();

if (!process.env.MONGO_URL){
    console.error("Missing MONGO_URL!!");
    process.exit(1);
}

mongoose
    .connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,})

const db = mongoose.connection
db.on("error",(error) =>{
    throw new Error("DBConnectionError"+error)
})
const app =express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const broadcastMessage = (data,status)=> {
    wss.clients.forEach((client)=> {
        sendData(data,client);
        sendStatus(status,client);
    });
};

db.once("open",() => {
    console.log("MongoDB connected!")

    wss.on("connection",(ws) => {
        initData(ws);
        initUser(ws);
        ws.onmessage = async (byteString) => {
            const {data} = byteString
            const [task,payload] = JSON.parse(data)
            switch (task) {
                case "input" : {
                    const {name,body} = payload
                    const message = new Message({name,body}) 
                    try {
                        await message.save();
                    } catch(e) {throw new Error("MessageDBSaveError:"+e);}


                    broadcastMessage(["output",[payload]],{
                        type: "success",
                        msg: "Message sent."
                    });
                    break
                }
                case "clear":{
                    Message.deleteMany({},()=>{
                        sendData(["cleared"],ws)
                        sendStatus({type:'info',msg:"message cache cleared."},ws)
                    })
                    broadcastMessage(["cleared",[payload]],{
                        type: "success",
                        msg: "Somebody delete all the messages."
                    });
                    break
                }
                default:break
            }
            
        }
        
    })
    const PORT =process.env.port || 4000
    server.listen(PORT, () =>{
        console.log(`Listening on ${PORT}`)
    })
})
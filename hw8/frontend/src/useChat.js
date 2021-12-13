import { useState } from "react";
const client = new WebSocket('ws://localhost:4000')

const useChat = () => {
    const [messages,setMessages] = useState([]);
    const [status,setStatus] = useState({});
    const [Username,setUsername] = useState([]);
    const sendData = async ( data ) => {
        await client.send(JSON.stringify( data ));
    };
    const sendMessage = (payload) => {
        console.log(payload);
        sendData(["input",payload]);
    };
    
    const clearMessages=()=> {
        sendData(["clear"]);
    };
    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task,payload] = JSON.parse(data);
        switch (task) {
            case "init": {
            setMessages(()=>payload);break;}
            case "output" :{
            setMessages(() => 
            [...messages,...payload]); break;}
            case "status" :{
            setStatus(payload);break;}
            case "cleared":{
            setMessages([]);break;}
            case "inituser":{
            console.log(payload.length);
            if (!payload.length==0) {
            setUsername(()=>payload[payload.length-1].name);console.log(payload[payload.length-1].name);
            }break;}
            
            default:break;
        }
    }
   

    return {
        status,messages,sendMessage,clearMessages,Username,
    };
};
export default useChat;
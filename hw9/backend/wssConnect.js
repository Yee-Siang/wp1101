import Message from './models/message.js'

const sendData = async ( data ,ws) => {
    ws.send(JSON.stringify( data ));
}

const sendStatus = ( payload , ws ) => {
    sendData( [ "status" , payload ] , ws);
}
const initData = (ws) =>{
    Message.find()
    .sort({created_at:-1})
    .limit(100)
    .exec((err,res)=> {
        if (err) throw err;
        sendData(["init",res],ws);
    })
}

const initUser = (ws) =>{
    Message.find()
    .sort({created_at:-1})
    .limit(100)
    .exec((err,res)=> {
        if (err) throw err;
        sendData(["inituser",res],ws);
    })
}
export { sendData, sendStatus,initData ,initUser}
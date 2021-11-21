import axios from 'axios';

const instance=axios.create({baseURL:'http://localhost:4000/api/guess'})
const startGame=async()=>{
    const {data:{msg}}=await instance.get('/start')
    return msg
    
}
const guess=async(number)=>{
    try{
        const {data:{msg}}=await instance.get('/guess',{params:{number}})
        return msg}
    catch(error){
        return `Your input ${number} is not a legal number`
    }
    
}
const restart=async()=>{
    const {data:{msg}}=await instance.get('/restart')
    return msg}
export {startGame,guess,restart}

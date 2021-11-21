import express from 'express'
import  {getNumber,genNumber} from '../core/getNumber'
let number=''

const router=express.Router()
router.get('/start',(_,res)=>{
    number=genNumber()
    res.json({msg:`The game has started`})
})
router.get('/guess',(req,res)=>{
    number=getNumber()
    const guessed=req.query.number-0
    
    /*const guessed=roughScale(req.query.number,10)*/
    if (!guessed || guessed<1 || guessed>100){
        res.status(406).send({msg:'is not a legal number.'})
        
    }
    else if (number<guessed){
        res.json({msg:`${guessed} is too big`})
    }
    else if (number>guessed){
        res.json({msg:`${guessed} is too small`})
    }
    else if (number===guessed){
        res.json({msg:'Equal'})
    }
})
router.get('/restart',(_,res)=>{
    number=genNumber()
    res.json({msg:`The game has restarted`})})
export default router
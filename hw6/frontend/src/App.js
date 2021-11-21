import React,{useState} from 'react';
import './App.css';
import {guess,startGame,restart} from './axios';


function App() {
  const [hasStarted,setHasStarted]=useState("false")
  const [hasWon,setHasWon]=useState("false")
  const [number,setNumber]=useState("")
  const [status,setStatus]=useState("53")
  


  const handleGuess=async()=>{
    let nowinput=document.getElementById('inputnumber').value
    const response=await guess(nowinput)
    if (response==="Equal") {setHasWon("true");setStatus(response);setNumber(nowinput)}
    else {
      setStatus(response);
      document.getElementById('inputnumber').value=""
    }
  }

  const startMenu=
    <div>
      <button onClick={async()=>{
        setHasStarted("true");
        const response= await startGame();
        setStatus(response)}}>start game</button>
    </div>

  const gameMode=
    <>
    <p className="app__littletitle">Guess a number between 1 to 100</p>
    <input id='inputnumber'></input>
    
    <button onClick={handleGuess} >guess!</button>
    <p className="app__littletitle">{status}</p>
    
    </>

  const winningMode=(
    <>
    <p className="app__littletitle">you won! the number was {number}.</p>
    <button onClick={async()=>{
      setHasWon("flase");
      const response= await restart();
      setStatus(response)} }>restart</button>
    </>
  )

  const game=
    <div>{hasWon==="true" ? winningMode : gameMode}</div>

  
  return <div className="app__root">
    <div className="app__title">Fun Number Guessing Game</div>
    {hasStarted==="true" ? game : startMenu}
    
    
    </div>
}

export default App;

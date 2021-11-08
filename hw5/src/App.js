
import React, { useEffect, useState } from 'react'
import Button from "./Components/button.js";
import '../src/index.css';



function App() {
  const [number, setNumber] = useState(0)
  const [hidenumber, setHidenumber] = useState(0)
  const [condition, setCondition] = useState(0)
  const [sci, setSci] = useState("off")
  const [point, setPoint] = useState("off")
  const [save, setSave] = useState(0)

  const handleclick = (e) => {
    if (condition === 0) { setNumber(e); setCondition(1); }
    else if (condition === 1) { setNumber(number + e) }
    else if (condition === 2) { setNumber(e); setHidenumber(number); setCondition(3); setPoint("off") }
    else if (condition === 3) { setNumber(number + e); }
    else if (condition === 4) { setNumber(e); setCondition(1); }
    else if (condition === 5) { setNumber(e); setHidenumber(number); setCondition(6); setPoint("off") }
    else if (condition === 6) { setNumber(number + e); }
    else if (condition === 7) { setNumber(e); setCondition(1); }
    else if (condition === 8) { setNumber(e); setHidenumber(number); setCondition(9); setPoint("off") }
    else if (condition === 9) { setNumber(number + e); }
    else if (condition === 10) { setNumber(e); setCondition(1); }
    else if (condition === 11) { setNumber(e); setHidenumber(number); setCondition(12); setPoint("off") }
    else if (condition === 12) { setNumber(number + e); }
    else if (condition === 13) { setNumber(e); setCondition(1); }
  }
  const handleAC = () => { setNumber(0); setCondition(0); setHidenumber(0); setPoint("off") }


  const handlePlus = () => {
    setPoint("off");
    if (condition === 1) { setCondition(2); setHidenumber(number); }
    else if (condition === 2) { }
    else if (condition === 3) { setCondition(2); setNumber(number - (-hidenumber)); setHidenumber(number); }
    else if (condition === 4) { setCondition(2); setHidenumber(number); }
    else if (condition === 5) { setCondition(2); setHidenumber(number); }
    else if (condition === 6) { setCondition(2); setNumber(hidenumber - number); setHidenumber(number); }
    else if (condition === 7) { setCondition(2); setHidenumber(number); }
    else if (condition === 8) { setCondition(2); setHidenumber(number); }
    else if (condition === 9) { setCondition(2); setNumber(hidenumber * number); setHidenumber(number); }
    else if (condition === 10) { setCondition(2); setHidenumber(number); }
    else if (condition === 11) { setCondition(2); setHidenumber(number); }
    else if (condition === 12) { setCondition(2); setNumber(hidenumber / number); setHidenumber(number); }
    else if (condition === 13) { setCondition(2); setHidenumber(number); }
  }
  const handleMinus = () => {
    setPoint("off");
    if (condition === 1) { setCondition(5); setHidenumber(number); }
    else if (condition === 2) { setCondition(5); setHidenumber(number); }
    else if (condition === 3) { setCondition(5); setNumber(hidenumber - (-number)); setHidenumber(number); }
    else if (condition === 4) { setCondition(5); setHidenumber(number); }
    else if (condition === 5) { }
    else if (condition === 6) { setCondition(5); setNumber(hidenumber - number); setHidenumber(number); }
    else if (condition === 7) { setCondition(5); setHidenumber(number); }
    else if (condition === 8) { setCondition(5); setHidenumber(number); }
    else if (condition === 9) { setCondition(5); setNumber(hidenumber * number); setHidenumber(number); }
    else if (condition === 10) { setCondition(5); setHidenumber(number); }
    else if (condition === 11) { setCondition(5); setHidenumber(number); }
    else if (condition === 12) { setCondition(5); setNumber(hidenumber / number); setHidenumber(number); }
    else if (condition === 13) { setCondition(5); setHidenumber(number); }
  }
  const handleMul = () => {
    setPoint("off");
    if (condition === 1) { setCondition(8); setHidenumber(number); }
    else if (condition === 2) { setCondition(8); setHidenumber(number); }
    else if (condition === 3) { setCondition(8); setNumber(number - (-hidenumber)); setHidenumber(number); }
    else if (condition === 4) { setCondition(8); setHidenumber(number); }
    else if (condition === 5) { setCondition(8); setHidenumber(number); }
    else if (condition === 6) { setCondition(8); setNumber(hidenumber - number); setHidenumber(number); }
    else if (condition === 7) { setCondition(8); setHidenumber(number); }
    else if (condition === 8) { }
    else if (condition === 9) { setCondition(8); setNumber(hidenumber * number); setHidenumber(number); }
    else if (condition === 10) { setCondition(8); setHidenumber(number); }
    else if (condition === 11) { setCondition(8); setHidenumber(number); }
    else if (condition === 12) { setCondition(8); setNumber(hidenumber / number); setHidenumber(number); }
    else if (condition === 13) { setCondition(8); setHidenumber(number); }
  }
  const handleDivide = () => {
    setPoint("off");
    if (condition === 1) { setCondition(11); setHidenumber(number); }
    else if (condition === 2) { setCondition(11); setHidenumber(number); }
    else if (condition === 3) { setCondition(11); setNumber(number - (-hidenumber)); setHidenumber(number); }
    else if (condition === 4) { setCondition(11); setHidenumber(number); }
    else if (condition === 5) { setCondition(11); setHidenumber(number); }
    else if (condition === 6) { setCondition(11); setNumber(hidenumber - number); setHidenumber(number); }
    else if (condition === 7) { setCondition(11); setHidenumber(number); }
    else if (condition === 8) { setCondition(8); setHidenumber(number); }
    else if (condition === 9) { setCondition(8); setNumber(number * hidenumber); setHidenumber(number); }
    else if (condition === 10) { setCondition(8); setHidenumber(number); }
    else if (condition === 11) { }
    else if (condition === 12) { setCondition(11); setNumber(hidenumber / number); setHidenumber(number); }
    else if (condition === 13) { setCondition(11); setHidenumber(number); }
  }
  const handleEqual = () => {
    setPoint("off");
    if (condition === 1) { }
    else if (condition === 2) { setNumber(number - (-hidenumber)); }
    else if (condition === 3) { setNumber(number - (-hidenumber)); setHidenumber(number); setCondition(4); }
    else if (condition === 4) { setNumber(number - (-hidenumber)); }
    else if (condition === 5) { setNumber(number - hidenumber) }
    else if (condition === 6) { setNumber(hidenumber - number); setHidenumber(number); setCondition(7); }
    else if (condition === 7) { setNumber(number - hidenumber) }
    else if (condition === 8) { setNumber(number * hidenumber) }
    else if (condition === 9) { setNumber(hidenumber * number); setHidenumber(number); setCondition(10); }
    else if (condition === 10) { setNumber(number * hidenumber) }
    else if (condition === 11) { setNumber(number / hidenumber) }
    else if (condition === 12) { setNumber(hidenumber / number); setHidenumber(number); setCondition(13); }
    else if (condition === 13) { setNumber(number / hidenumber) }
  }


  const handlePoint = () => {
    if (point === "off") { setPoint("on"); setNumber(number + ".") }
    if (condition === 0) { setCondition(1); }
    else if (condition === 2) { setNumber("0."); setCondition(3); }
    else if (condition === 4) { setNumber("0."); setCondition(1); }
    else if (condition === 5) { setNumber("0."); setCondition(6); }
    else if (condition === 7) { setNumber("0."); setCondition(1); }
    else if (condition === 8) { setNumber("0."); setCondition(9); }
    else if (condition === 10) { setNumber("0."); setCondition(1); }
    else if (condition === 11) { setNumber("0."); setCondition(12); }
    else if (condition === 13) { setNumber("0."); setCondition(1); }
  }
  const handleInverse = () => { setNumber(-number) }
  const handleDelete = () => {
    if (Math.abs(number).toString().length > 1) {
      let temp = number.toString().slice(0, number.toString().length - 1)
      setNumber(temp)
    }
    else { setNumber(0) }
  }


  const handleSqrt = () => { if (number > 0) { setNumber(Math.sqrt(number)) } }
  const handleSquare = () => { setNumber(number ** 2) }
  const handleCube = () => { setNumber(number ** 3) }
  const handlePa = () => { setNumber(number / 100) }
  const handleSin = () => { setNumber(Math.sin(number)) }
  const handleCos = () => { setNumber(Math.cos(number)) }
  const handleTan = () => { setNumber(Math.tan(number)) }
  const handleExp = () => { setNumber(Math.exp(number)) }
  const handleLog10 = () => { if (number > 0) { setNumber(Math.log10(number)) } }
  const handleIn = () => { if (number > 0) { setNumber(Math.log(number)) } }
  const handleE = () => { setNumber(Math.E) }
  const handleP = () => { setNumber(Math.PI) }
  const handleRec = () => { if (number !== 0) { setNumber(1 / number) } }
  const handleStore = () => { setSave(number) }
  const handleRecall = () => { setNumber(save) }


  const handleSci = () => { sci === "off" ? setSci("on") : setSci("off") }
  useEffect(() => ((Math.abs(number).toString().length > 10) && (sci === "off")) ?
    setNumber(number.toString().slice(0, 10)) : {})

  return (
    <div className="App">
      <header className="app__header">

        <h1 className="app__littletitle">The result is :</h1>
        <h1 className="app__result">{
          ((sci === "on") && (Math.round((10 ** 15) * number) / (10 ** 15) !== 0)) ?
            `${number / (10 ** Math.floor(Math.log10(Math.abs(number))))}E${Math.floor(Math.log10(Math.abs(number)))}`
            : Math.round(number * 10000000000) / 10000000000}</h1>
        <h1 className="app__littletitle">{((number.toString() === "Infinity") || (number.toString() === "-Infinity")) ?
          "目前計算結果出現error" : ""}</h1>

      </header>


      <section className="app__main">
        <div className="app__row">
          <Button Styletype="3" No="AC" Click={() => handleAC()} />
          <Button Styletype="3" No="±" Click={() => handleInverse()} />
          <Button Styletype="3" No="%" Click={() => handlePa()} />
          <Button Styletype="1" No="÷" Click={() => handleDivide()} />
          <Button No="x^2" Click={() => handleSquare()} />
          <Button No="x^3" Click={() => handleCube()} />
          <Button No="√" Click={() => handleSqrt()} />
        </div>
        <div className="app__row">
          <Button Styletype="2" No="7" Click={(e) => handleclick(e)} />
          <Button Styletype="2" No="8" Click={(e) => handleclick(e)} />
          <Button Styletype="2" No="9" Click={(e) => handleclick(e)} />
          <Button Styletype="1" No="×" Click={() => handleMul()} />
          <Button No="Sin" Click={() => handleSin()} />
          <Button No="Cos" Click={() => handleCos()} />
          <Button No="Tan" Click={() => handleTan()} />
        </div>
        <div className="app__row">
          <Button Styletype="2" No="4" Click={(e) => handleclick(e)} />
          <Button Styletype="2" No="5" Click={(e) => handleclick(e)} />
          <Button Styletype="2" No="6" Click={(e) => handleclick(e)} />
          <Button Styletype="1" No="-" Click={() => handleMinus()} />
          <Button No="Exp" Click={() => handleExp()} />
          <Button No="Log" Click={() => handleLog10()} />
          <Button No="In" Click={() => handleIn()} />
        </div>
        <div className="app__row">
          <Button Styletype="2" No="1" Click={(e) => handleclick(e)} />
          <Button Styletype="2" No="2" Click={(e) => handleclick(e)} />
          <Button Styletype="2" No="3" Click={(e) => handleclick(e)} />
          <Button Styletype="1" No="+" Click={() => handlePlus()} />
          <Button No="e" Click={() => handleE()} />
          <Button No="π" Click={() => handleP()} />
          <Button No="1/x" Click={() => handleRec()} />
        </div>
        <div className="app__row">
          <Button Styletype="2" No="0" Click={(e) => handleclick(e)} />
          <Button Styletype="2" No="." Click={() => handlePoint()} />
          <Button Styletype="1" No="=" Click={() => handleEqual()} />
          <Button No="Sci" Click={() => handleSci()} />
          <Button No="Del" Click={() => handleDelete()} />
          <Button Styletype="3" No="Sto" Click={() => handleStore()} />
          <Button Styletype="3" No="Rec" Click={() => handleRecall()} />
        </div>
      </section>

      <h1 className="app__littletitle" >科學記號表示：{sci}，目前儲存的數字：{save}</h1>

    </div>)
}

export default App;

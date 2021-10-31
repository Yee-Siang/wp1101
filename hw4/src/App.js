import './App.css';
import React, { useEffect, useState, Compoent } from 'react';

function App() {

  let N = 0;
  let completeCount = 0;
  const [item, generate] = useState();

  //function process(ele) {
  //console.log(ele);
  // }
  let all = [];
  let completed = [];
  let deleted = [];

  useEffect(() => {

    const COUNT = document.getElementById("count");
    COUNT.style.display = "none";
    const waiter = document.getElementById("wait");
    const ls = document.getElementById("todo-list");
    waiter.addEventListener("keypress", function (e) {
      if ((e.key === "Enter") && (e.target.value != "")) {
        let node = document.createElement("li");
        node.className = "todo-app__item";
        let front = document.createElement("div");
        front.classList.add("todo-app__checkbox");
        let center = document.createElement("input");
        center.type = 'checkbox';
        let newlabel = document.createElement("label");
        newlabel.for = `${N}`;
        //center.id = `${N}`;
        front.appendChild(center);
        front.appendChild(newlabel);
        node.appendChild(front);
        let content = document.createElement("h1");
        content.className = "todo-app__item-detail";
        content.textContent = `${e.target.value}`;
        node.appendChild(content);
        let back = document.createElement("img");
        back.src = './x.png';
        back.className = "todo-app__item-x";
        node.appendChild(back);
        node.style.display = "flex";
        const tar = document.getElementById("todo-list");
        tar.appendChild(node);
        all.push(node);
        /////////////////////
        e.target.value = "";
        N += 1;

        const total = document.getElementById("!");
        if (!(N === 0)) {
          total.textContent = `${N} left`;
          const foot = document.getElementById("todo-app__footer");
          foot.style.display = "flex";
        }

        front.addEventListener("click", () => {
          front.classList.add("selected");
          content.classList.add("finished");
          if (!(completed.includes(node))) { N -= 1; completeCount += 1; }
          completed.push(node);
          total.textContent = `${N} left`;
          if (!(completeCount === 0)) { COUNT.style.display = "flex"; }
        })

        back.addEventListener("click", () => {
          node.style.display = "none";
          deleted.push(node);
          if (!(completed.includes(node))) { N -= 1; } else { completeCount -= 1; }
          total.textContent = `${N} left`;
          if (completeCount === 0) { COUNT.style.display = "none"; }
        })

        COUNT.addEventListener("click", () => {
          for (let ele of completed) {
            ele.style.display = "none";
            deleted.push(ele);
            completeCount = 0;
            COUNT.style.display = "none";
          }
        })
      }
    })


    const ALL = document.getElementById("ALL");
    ALL.addEventListener("click", () => {
      for (var ele of all) {
        if (!(deleted.includes(ele))) { ele.style.display = "flex"; }
      }
    })
    const ACTIVE = document.getElementById("ACTIVE");
    ACTIVE.addEventListener("click", () => {
      for (var ele of all) {
        ele.style.display = "none";
        if (!(completed.includes(ele))) {
          if (!(deleted.includes(ele))) { ele.style.display = "flex"; }
        }
      }
    })
    const COMPLETED = document.getElementById("COMPLETED");
    COMPLETED.addEventListener("click", () => {
      for (var ele of all) {
        if (!(deleted.includes(ele))) { ele.style.display = "flex"; }
        if (!(completed.includes(ele))) {
          ele.style.display = "none";
        }
      }
    })

  })

  function showAll() {
    for (var ele of all) {
      ele.style.display = "flex";
    }
  }
  function showActive() {

  }
  function showCompleted() {
    for (var ele of all) {
      if (!(completed.includes(ele))) {
        ele.style.display = "none";
      }
    }
  }


  return (
    <div id="root" className="todo-app__root">
      <header className="todo-app__header">
        <h1 className="todo-app__title">todos</h1>
      </header>
      <section className="todo-app__main">
        <input className="todo-app__input" id="wait" />
        <ul className="todo-app__list" id="todo-list">{item}</ul>
      </section>
      <div className="todo-app__total" id="!"></div>
      <footer className="todo-app__footer" id="todo-app__footer">
        <div className="todo-app__total"></div>
        <ul className="todo-app__view-buttons">
          <li><button id="ALL">All</button></li>
          <li><button id="ACTIVE">Active</button></li>
          <li><button id="COMPLETED">Completed</button></li>
        </ul>
        <div className="todo-app__clean"><button id="count">Clear Completed</button></div>
      </footer>
    </div>
  );
}

export default App;


let all = []
let deleted = []
let completed = []

const inputSection = document.getElementsByClassName("todo-app__input")[0];
const ls = document.getElementById("todo-list");
let num = 0;
let c_count = 0;  //Completed_count
let count = document.getElementsByClassName("todo-app__total")[0];
inputSection.addEventListener("keypress", generate);
count.textContent = `${num} left`;

let foot = document.getElementById("todo-app__footer");
let c = document.getElementById("count")
foot.style.display = "none";

class Row {
    constructor(data, N) {
        foot.style.display = "flex";
        if (c_count === 0) { c.style.display = "none" }
        this.node = document.createElement("li");
        this.node.classList.add("todo-app__item");
        let front = document.createElement("div");
        front.classList.add("todo-app__checkbox");
        let center = document.createElement("input");
        center.type = 'checkbox';
        let newlabel = document.createElement("label");
        newlabel.for = `${N}`;
        center.id = `${N}`;
        front.appendChild(center);
        front.appendChild(newlabel);
        this.node.appendChild(front);
        content = document.createElement("h1");
        content.classList.add("todo-app__item-detail");
        content.textContent = `${data}`;
        this.node.appendChild(content);
        this.content = content;
        let back = document.createElement("img");
        back.src = "./img/x.png";
        back.classList.add("todo-app__item-x");
        this.node.appendChild(back);
        this.node.style.display = "flex";

        all.push(this.node);

        back.addEventListener("click", () => {
            this.node.style.display = "none";
            deleted.push(this.node);
            if (!(completed.includes(this.node))) { num--; }
            count.textContent = `${num} left`;

            if (completed.includes(this.node)) { c_count--; }
            if (c_count === 0) {
                c.style.display = "none";
            }


            if (all.length === deleted.length) {
                foot.style.display = "none";
            }

        })


        front.addEventListener("click", () => {
            front.classList.add("selected");
            this.content.classList.add("finished");
            completed.push(this.node);
            num--;
            count.textContent = `${num} left`;
            c.style.display = "flex";
            c_count++;
        })
    }
    get rNode() {
        return this.node;
    }

}

function generate(e) {
    if ((e.key === "Enter") && (e.target.value != "")) {
        num++;
        let x = new Row(e.target.value, num);
        ls.appendChild(x.rNode);
        count.textContent = `${num} left`;
        e.target.value = "";
    }
}

function listAll() {
    for (let ele of all) {
        if (!(deleted.includes(ele))) { ele.style.display = "flex"; }

    }
}

function listActive() {

    for (let ele of all) {
        if (!(deleted.includes(ele))) { ele.style.display = "flex"; }
    }

    for (let ele of all) {
        if (completed.includes(ele)) {
            ele.style.display = "none";
        }
    }
}

function listCompleted() {

    for (let ele of all) {
        if (!(deleted.includes(ele))) { ele.style.display = "flex"; }
    }

    for (let ele of all) {
        if (!(completed.includes(ele))) {
            ele.style.display = "none";
        }
    }
}

function clearCompleted() {
    for (let ele of all) {
        if ((completed.includes(ele))) {
            deleted.push(ele);
            ele.style.display = "none";
        }
        c.style.display = "none";
    }


    if (all.length === deleted.length) {
        foot.style.display = "none";
    }
}

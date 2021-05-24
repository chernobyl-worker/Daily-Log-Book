const logHeading = document.querySelector(".Log-Heading");
const logContent = document.querySelector("#Log-Content");
const form = document.querySelector(".Input");
const list = document.querySelector(".List")


let data = [];
if(localStorage.getItem('data')){
    let item = localStorage.getItem('data');
    item = JSON.parse(item);
    data = item;
}

window.onload = () => {
    data.forEach(addItem);
};

form.onsubmit = (e) => {
    e.preventDefault();
    let newLog = new Log(logHeading.value,logContent.value);
    logContent.value = "";
    logHeading.value = "";
    logHeading.focus();
    data.push(newLog);
    addItem(newLog,data.length);
    localStorage.setItem("data",JSON.stringify(data));
};

function Log(Title, Body) {
    this.title = Title;
    this.body = Body;
    let temp = new Date();
    this.date = `${temp.getDay()}/${temp.getMonth()}/${temp.getFullYear()} - ${temp.getHours()}:${temp.getMinutes()}:${temp.getSeconds()}`;
}

function addItem(newLog,index) {
    const Item = document.createElement("li");
    const title = document.createElement("h4");
    const date = document.createElement("span");
    const body = document.createElement("p");
    const del = document.createElement("button");

    del.textContent = "Remove Item"
    del.onclick = () => {
        del.parentElement.parentElement.removeChild(Item);
        for(let i=0; i<data.length; i++) {
            if(data[i].date === newLog.date) {
                data.splice(i,1);        
            }        
        }
        localStorage.setItem("data",JSON.stringify(data));
    }
    body.textContent = newLog.body;
    title.textContent = newLog.title;
    date.textContent = newLog.date;
    Item.append(title,date,body,del);
    list.appendChild(Item);
}
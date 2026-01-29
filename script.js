const powerBtn = document.getElementById("powerBtn");
const shiftBtn = document.getElementById("shiftBtn");
const expressionEl = document.getElementById("expressionEl");
const displayEl = document.getElementById("displayEl");
const messageEl = document.getElementById("messageEl");
const keysEl = document.getElementById("keysEl");
const calculatorButtonsEl = document.getElementById("calculatorButtons");

let isOn = true;
let isShift = true;
let currentValue = "";

const keys = [
    {label:"0", type:"number", value:0},
    {label:"1", type:"number", value:1},
    {label:"2", type:"number", value:2},
    {label:"3", type:"number", value:3},
    {label:"4", type:"number", value:4},
    {label:"5", type:"number", value:5},
    {label:"6", type:"number", value:6},
    {label:"7", type:"number", value:7},
    {label:"8", type:"number", value:8},
    {label:"9", type:"number", value:9},
    {label:"C", type:"action", action:"clear"}
]

function resetCalculator(){
    expressionEl.textContent = "";
    displayEl.textContent = "0";
    messageEl.textContent = "";
    createKeys();
}

function turnOffCalculator(){
    expressionEl.textContent = "";
    displayEl.textContent = "";
    messageEl.textContent = "";
    calculatorButtonsEl.innerHTML = "";
}

function createKeys(){
    calculatorButtonsEl.innerHTML = "";
    for(let i=0;i<keys.length; i++){
        const key = keys[i];
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = key.label;

        btn.addEventListener("click", ()=>{
            handleKeyPress(key);
        });

        calculatorButtonsEl.appendChild(btn);
    }
}

function handleKeyPress(key){
    if(!isOn)
        return;
    if(key.type ==="number"){
        handleNumber(key.value);
    }
    if(key.type ==="action" && key.action == "clear"){
        clearInput();
    }
}

function handleNumber(num){
    currentValue +=num;
    displayEl.textContent = currentValue;
}

function clearInput(){
    currentValue = "";
    displayEl.textContent = "0";
}

powerBtn.addEventListener("click", handlePowerClick);

function handlePowerClick(){
    isOn = !isOn;

    if(isOn){
        resetCalculator();

        shiftBtn.disabled = false;
        isShift=true;
        shiftBtn.setAttribute("aria-pressed", "true")
        powerBtn.textContent = "Now is ON";
        powerBtn.setAttribute("aria-pressed", "true");
    }
    else{
        turnOffCalculator();

        shiftBtn.disabled = true;
        isShift=false;
        shiftBtn.setAttribute("aria-pressed", "false")
        powerBtn.textContent = "Now is OFF";
        powerBtn.setAttribute("aria-pressed", "false");
    }
}
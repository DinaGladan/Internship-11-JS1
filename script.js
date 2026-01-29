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

let firstValue = null;
let secondValue = null;
let currentOperation = null;

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
    {label:"+", type:"operation", operation:"add"},
    {label:"-", type:"operation", operation:"sub"},
    {label:"*", type:"operation", operation:"mul"},
    {label:"/", type:"operation", operation:"div"},
    {label:"^2", type:"operation", operation:"square"},
    {label:"C", type:"action", action:"clear"},
    {label:"=", type:"equals"}
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

    if(key.type ==="operation"){
        handleOperation(key.operation);
    }

    if(key.type ==="equals"){
        handleCalculation();
    }

    if(key.type ==="action" && key.action == "clear"){
        clearInput();
    }
}

function handleNumber(num){
    if(currentOperation === null){
        currentValue +=num;
        displayEl.textContent = currentValue;
    }
    else{
        if(secondValue === null){
            secondValue ="";
        }
        secondValue += num;
        displayEl.textContent = secondValue;
        expressionEl.textContent =`${firstValue} ${opSymbol(currentOperation)} ${secondValue}`;
    }
}

function handleOperation(operation){
    if(currentValue === "" || currentOperation !== null)
        return;

    firstValue = Number(currentValue);
    currentOperation = operation;
    currentValue = "";

    expressionEl.textContent = operation === "square" ? `${firstValue}^2` : `${firstValue} ${opSymbol(operation)}`;

}

function opSymbol(operation){
    if(operation ==="add"){
        return "+";
    }
    else if(operation ==="sub"){
        return "-";
    }
    else if(operation ==="mul"){
        return "*";
    }
    else if(operation ==="div"){
        return "/";
    }
}

function handleCalculation(){
    if(currentOperation === null || firstValue === null) return;
    let result;

    switch(currentOperation){
        case "add":
            result = firstValue + Number(secondValue);
            break;
        case "sub":
            result = firstValue - Number(secondValue);
            break;
        case "mul":
            result = firstValue * Number(secondValue);
            break;
        case "div":
            if(Number(secondValue) === 0){
                alert("Dijeljenje s nulom nije dozvoljeno");
                resetAfterCalculation();
                return;
            }
            result = firstValue / Number(secondValue);
            break;
        case "square":
            result = firstValue **2;
            break;
    }
    displayEl.textContent = result;
    resetAfterCalculation(result);
}

function resetAfterCalculation(result){
    firstValue = result;
    secondValue = null;
    currentOperation = null;
    currentValue = "";
    expressionEl.textContent = "";
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
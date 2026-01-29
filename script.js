const powerBtn = document.getElementById("powerBtn");
const shiftBtn = document.getElementById("shiftBtn");
const expressionEl = document.getElementById("expressionEl");
const displayEl = document.getElementById("displayEl");
const messageEl = document.getElementById("messageEl");

let isOn = true;
let isShift = true;

function resetCalculator(){
    expressionEl.textContent = "";
    displayEl.textContent = "0";
    messageEl.textContent = "";
}

function turnOffCalculator(){
    expressionEl.textContent = "";
    displayEl.textContent = "";
    messageEl.textContent = "";
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
const numbers = document.querySelectorAll(".num-key");
const add = document.getElementById("add-key");
const subtract = document.getElementById("subtract-key");
const multiply = document.getElementById("multiply-key");
const divide = document.getElementById("divide-key");
const equal_key = document.getElementById("equals-key");
const c_clear = document.getElementById("c-key");
const ce_clear = document.getElementById("ce-key");
const invert = document.getElementById("plusMinus-key");
const calcDisplay = document.getElementById("output-string");

let hasDecimal = false;
let equation = [];
let operand = [];

window.addEventListener("keydown", getInput);

equal_key.onclick = () => expandEquation("=");
add.onclick = () => expandEquation("+");
subtract.onclick = () => expandEquation("-");
multiply.onclick = () => expandEquation("*");
divide.onclick = () => expandEquation("/");
c_clear.onclick = () => clearDisplay();
ce_clear.onclick = () => clearEntry();
invert.onclick = () => invertEntry();

numbers.forEach(number => {number.addEventListener("click", () => {
    let digit = "";
    if (number.id == "decimal-key") {
        if (hasDecimal == false) {
            digit = ".";
            hasDecimal = true;
        }
    }
    else {
        digit = number.id.slice(4, 5);
    }
    operand.push(digit);
    let operandNum = Number(operand.join(""));
    calcDisplay.innerHTML = operandNum.toLocaleString();
    })
})

function expandEquation(operation) {
    if (operand.length != 0) {  
        equation.push(Number(operand.join("")));
        if (operation != "=") {
            equation.push(operation);
        }
        hasDecimal = false;
    }
    else {
        if (operation != "=") {
            equation.pop();
            equation.push(operation);
        }
    }  

    if (equation.length >= 3) {
        let result = operate(equation[0], equation[1], equation[2]);
        
        if (typeof result === "number") {
            equation = [result, operation];
        }

        calcDisplay.innerHTML = result.toLocaleString();
    }
    operand = [];
}
67
function operate(num1, operator, num2) {
   switch(operator) {
    case "+":
        return num1 + num2;
    case "-":
        return num1 - num2;
    case "*":
        return num1 *  num2;
    case "/":
        if (num2 == 0) {
            return "ERROR";
        }
        else {
            return num1 / num2;
        }
   }
}

function clearDisplay() {
    equation = [];
    operand = [];
    calcDisplay.innerHTML = "0";
}

function clearEntry() {
    operand = [];
    calcDisplay.innerHTML = "0";
}

function invertEntry() {
    if (operand.length != 0) {
        if (operand[0] == "-") {
            operand.shift();
        }
        else {
            operand.unshift("-");
        }
        calcDisplay.innerHTML = operand.join("").toLocaleString();
    }
    else if (equation.length != 0) {
        equation[0] = equation[0] * -1;
        calcDisplay.innerHTML = equation[0].toLocaleString();
    }
}

function getInput(e) {
    if (e.key >=0 && e.key <=9) {
        operand.push(e.key);
        let operandNum = Number(operand.join(""));
        calcDisplay.innerHTML = operandNum.toLocaleString();
    }
    if (e.key === "." && hasDecimal == false) {
        operand.push(e.key);
        hasDecimal = true;
        calcDisplay.innerHTML = operand.join("").toLocaleString();
    } 
    if (e.key == "/" || e.key == "*" || e.key == "-" || e.key == "+" || e.key == "=") {
        expandEquation(e.key);
    }
}
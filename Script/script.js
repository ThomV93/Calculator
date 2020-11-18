//create and cash all variables used
const clearButton = document.getElementById("clear");
const exponentButton = document.getElementById("exponent");
const factorialButton = document.getElementById("factorial");
const equalButton = document.getElementById("equal");
const allFirstLine_btn = document.getElementsByClassName("btn");
const allOperator_btn = document.getElementsByClassName("operator");
const allNum_btn = document.getElementsByClassName("btn-num");
const currentDisplay = document.getElementById("current-display");
const pastDisplay = document.getElementById("past-display");
let firstNumber = "";
let operator = "";
let secondNumber = "";



//store the numbers and the operator in the variables
//only run the operate function when the = sign is pressed
//push the old values into an array to display them correctly
function numBtns() {
    Array.from(allNum_btn).map(btn => btn.addEventListener("click", e => {
        if (operator.length === 0) {
            firstNumber += e.target.innerText;
            currentDisplay.innerHTML = firstNumber;
        } else {
            secondNumber += e.target.innerText;
            currentDisplay.innerHTML = secondNumber;
        };
    }));
};

numBtns();

function operatorBtns() {
    Array.from(allOperator_btn).map(btn => btn.addEventListener("click", e =>{
        operator += e.target.innerText;
        pastDisplay.innerHTML = `${firstNumber} ${operator}`;
        currentDisplay.innerHTML = "0";
    }));
};

operatorBtns();

function equalBtn() {
    equalButton.addEventListener("click", () => {
        operate(operator);
        pastDisplay.innerHTML = `${firstNumber} ${operator} ${secondNumber}`;
        currentDisplay.innerHTML = result;
    });
};

equalBtn();

//basic calculator functions
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function exponent(a, b) {
	return Math.pow(a, b);
};

function factorial(n) {
	if(n < 2) return 1;
	return n *= factorial(n-1);
};

function operate(op) {
    switch (op) {
        case "+":
            result = add(parseInt(firstNumber), parseInt(secondNumber));
            break;
        case "-":
            result = subtract(parseInt(firstNumber), parseInt(secondNumber));
            break;
        case "*":
            result = multiply(parseInt(firstNumber), parseInt(secondNumber));
            break;
        case "/":
            result = divide(parseInt(firstNumber), parseInt(secondNumber));
            break;
        case "^":
            result = exponent(parseInt(firstNumber), parseInt(secondNumber));
            break;
        case "!":
            result = factorial(parseInt(firstNumber), parseInt(secondNumber));
            break;
    };
    return result;
};
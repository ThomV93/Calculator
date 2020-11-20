//create and cash all variables used
const clearButton = document.getElementById("clear");
const exponentButton = document.getElementById("exponent");
const factorialButton = document.getElementById("factorial");
const backspaceButton = document.getElementById("backspace");
const equalButton = document.getElementById("equal");
const extraOperator_btn = document.getElementsByClassName("extra-operator");
const allOperator_btn = document.getElementsByClassName("operator");
const allNum_btn = document.getElementsByClassName("btn-num");
const currentDisplay = document.getElementById("current-display");
const pastDisplay = document.getElementById("past-display");
let firstNumber = "";
let operator = "";
let secondNumber = "";
let oldValues = [];
let result = "";


//add click event to the numbered buttons and update the display as necessary
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

//add click event to the operator buttons and update the display as necessary
function operatorBtns() {
    Array.from(allOperator_btn).map(btn => btn.addEventListener("click", e =>{
        if (operator.length === 0) {
            oldValues.push(firstNumber);
            operator = e.target.innerText;
            oldValues.push(operator);
            pastDisplay.innerHTML = oldValues.join(" ");
        } else {
            oldValues.push(secondNumber);
            operate(operator);
            firstNumber = result;
            secondNumber = "";
            currentDisplay.innerHTML = firstNumber;
            pastDisplay.innerHTML = oldValues.join(" ");
            operator = e.target.innerText;
            oldValues.push(operator);
        }
    }));
};

//add click event to the exponent button and update the display as necessary
function exponentBtn() {
    exponentButton.addEventListener("click", () => {
        oldValues.push(firstNumber);
        operator = "^";
        oldValues.push(operator);
        pastDisplay.innerHTML = oldValues.join(" ");
        currentDisplay.innerHTML = firstNumber;
    });
};

//add click event to the factorial button and update the display as necessary
function factorialBtn() {
    factorialButton.addEventListener("click", () => {
        operator = "!";
        operate("!");
        currentDisplay.innerHTML = result;
    });
};

function backspaceBtn() {
    backspaceButton.addEventListener("click", () => {
        if (operator.length === 0) {
            firstNumber = firstNumber.split("");
            firstNumber.pop();
            firstNumber = firstNumber.join("");
            currentDisplay.innerHTML = firstNumber;
        } else {
            secondNumber = secondNumber.split("");
            secondNumber.pop();
            secondNumber = secondNumber.join("");
            currentDisplay.innerHTML = secondNumber;
        };
    });
};

//add click event to the equal button and run the calculations
function equalBtn() {
    equalButton.addEventListener("click", () => {
        oldValues.push(secondNumber);
        operate(operator);
        currentDisplay.innerHTML = result;
        pastDisplay.innerHTML = oldValues.join(" ");
    });
};

//add click event to the clear button and clear all the variables and display
function clearBtn() {
    clearButton.addEventListener("click", () => {
        firstNumber = "";
        operator = "";
        secondNumber = "";
        oldValues = [];
        currentDisplay.innerHTML = 0;
        pastDisplay.innerHTML = oldValues;
    });
};


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


//run the calculations depending on user input
function operate(op) {
    switch (op) {
        case "+":
            result = add(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
        case "-":
            result = subtract(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
        case "x":
            result = multiply(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
        case "÷":
            result = divide(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
        case "^":
            result = exponent(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
        case "!":
            result = factorial(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
    };
    return result;
};

numBtns();

operatorBtns();

exponentBtn();

factorialBtn();

backspaceBtn();

equalBtn();

clearBtn();


//make sequence of calculations work
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
let result 

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
        operator += e.target.innerText;
        pastDisplay.innerHTML = `${firstNumber} ${operator}`;
        currentDisplay.innerHTML = "0";
    }));
};
//add click event to the equal button and run the calculations
function equalBtn() {
    equalButton.addEventListener("click", () => {
        operate(operator);
        pastDisplay.innerHTML = `${firstNumber} ${operator} ${secondNumber}`;
        currentDisplay.innerHTML = result;
    });
};
//add click event to the clear button and clear all the variables and display
function clearBtn() {
    clearButton.addEventListener("click", () => {
        firstNumber = "";
        operator = "";
        secondNumber = "";
        pastDisplay.innerHTML = "";
        currentDisplay.innerHTML = 0;
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
        case "—":
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

equalBtn();

clearBtn();

//need to recognize the comma
//push the old values into an array to display them correctly
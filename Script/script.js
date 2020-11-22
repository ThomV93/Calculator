//create and cash all constants and variables used
const clearButton = document.getElementById("clear");
const exponentButton = document.getElementById("exponent");
const factorialButton = document.getElementById("factorial");
const backspaceButton = document.getElementById("backspace");
const equalButton = document.getElementById("equal");
const extraOperator_btn = document.getElementsByClassName("extra-operator");
const allOperator_btn = document.getElementsByClassName("operator");
const allNum_btn = document.getElementsByClassName("btn-num");
const currentDisplay = document.getElementById("current-display");
const oldValuesDisplay = document.getElementById("past-display");
let firstNumber = "";
let secondNumber = "";
let operator = "";
let oldValuesRecord = [];
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
            operator = e.target.innerText;
            oldValuesRecord.push(firstNumber, operator);
            oldValuesDisplay.innerHTML = oldValuesRecord.join(" ");
        } else {
            oldValuesRecord.push(secondNumber);
            //run the calculations and update the variables
            operate(operator);
            firstNumber = result;
            secondNumber = "";
            //updates the display
            currentDisplay.innerHTML = firstNumber;
            oldValuesDisplay.innerHTML = oldValuesRecord.join(" ");
            //updates and record the new operator
            operator = e.target.innerText;
            oldValuesRecord.push(operator);
        }
    }));
};

//add click event to the exponent button and update the display as necessary
function exponentBtn() {
    exponentButton.addEventListener("click", () => {
        operator = "^";
        oldValuesRecord.push(firstNumber);
        oldValuesRecord.push(operator);
        oldValuesDisplay.innerHTML = oldValuesRecord.join(" ");
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

//remove the last number when clicked
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
        oldValuesRecord.push(secondNumber);
        operate(operator);
        currentDisplay.innerHTML = (result === undefined) ? 0 : result;
        oldValuesDisplay.innerHTML = oldValuesRecord.join(" ");
    });
};

//clear all the values stored
function clearAll() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    oldValuesRecord = [];
    currentDisplay.innerHTML = 0;
    oldValuesDisplay.innerHTML = oldValuesRecord;
};

//add click event to the clear button
function clearBtn() {
    clearButton.addEventListener("click", () => {
        clearAll();
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
    if ( b === 0) {
        alert("Don't you try to crash me!");
        clearAll();
    } else {
        return a / b;
    };
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


//round long decimals
//can switch operators after one is picked. Leave the operator "selected"
//equal btn only works when all values are inputed
//only possible to add one dot
//add keyboard support
//switch factorial function for +/-
//fix historic display when calculating after =
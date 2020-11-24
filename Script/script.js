//create and cash all constants and variables used
const clearButton = document.getElementById("clear");
const exponentButton = document.getElementById("exponent");
const posOrNegButton = document.getElementById("pos-or-neg");
const backspaceButton = document.getElementById("backspace");
const equalButton = document.getElementById("equal");
const extraOperator_btn = document.getElementsByClassName("extra-operator");
const allOperator_btn = document.getElementsByClassName("operator");
const allNum_btn = document.getElementsByClassName("btn-num");
const currentDisplay = document.getElementById("current-display");
let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";


//turn the number into a negative and vice versa
function reverseSign(num) {
    parseFloat(num);
    num *= -1;
    return num.toString();
};

//erase last char
function eraseChar(num) {
    num = num.split("");
    num.pop();
    return num.join("");
}

function clearAll() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    currentDisplay.innerHTML = 0;
};

function roundDecimals(num) {
    num = Math.round((num + Number.EPSILON) * 100) / 100;
    return num;
}


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
        } else {
            operate(operator);
            result = roundDecimals(result);
            firstNumber = result;
            secondNumber = "";
            currentDisplay.innerHTML = firstNumber;
            operator = e.target.innerText;
        }
    }));
};

//add click event to the exponent button and update the display as necessary
function exponentBtn() {
    exponentButton.addEventListener("click", () => {
        operator = "^";
        currentDisplay.innerHTML = firstNumber;
    });
};

//add click event to the +/- button, run the function and update the display as necessary
function posOrNegBtn() {
    posOrNegButton.addEventListener("click", () => {
        if (operator.length === 0) {
            firstNumber = reverseSign(firstNumber);
            currentDisplay.innerHTML = firstNumber;
        } else {
            secondNumber = reverseSign(secondNumber);
            currentDisplay.innerHTML = secondNumber;
        };
    });
};

//remove the last number when clicked
function backspaceBtn() {
    backspaceButton.addEventListener("click", () => {
        if (operator.length === 0) {
            firstNumber = eraseChar(firstNumber);
            currentDisplay.innerHTML = firstNumber;
        } else {
            secondNumber = eraseChar(secondNumber);
            currentDisplay.innerHTML = secondNumber;
        };
    });
};

//add click event to the equal button and run the calculations
function equalBtn() {
    equalButton.addEventListener("click", () => {
        operate(operator);
        result = roundDecimals(result);
        currentDisplay.innerHTML = (result === undefined) ? 0 : result;
    });
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
    };
    return result;
};

numBtns();

operatorBtns();

exponentBtn();

posOrNegBtn();

backspaceBtn();

equalBtn();

clearBtn();



//can switch operators after one is picked. Leave the operator "selected"
//equal btn only works when all values are inputed
//only possible to add one dot
//add keyboard support
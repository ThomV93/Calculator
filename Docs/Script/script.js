//create and cash all constants and global variables used
const clearButton = document.getElementById("clear");
const percentageButton = document.getElementById("percentage");
const posOrNegButton = document.getElementById("pos-or-neg");
const dotButton = document.getElementById("dot");
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

//Reset the calculator
function clearAll() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    currentDisplay.innerText = 0;
};

//Round long decimals to 2 when needed
function roundDecimals(num) {
    num = Math.round((num + Number.EPSILON) * 100) / 100;
    return num;
};

//Calculate the values when a string of calculations is needed without the equal button
function calcSequence() {
    operate(operator);
    result = roundDecimals(result);
    firstNumber = result;
    secondNumber = "";
    currentDisplay.innerText = firstNumber;
};


//add click event to the numbered buttons and update the display as necessary
function numBtns() {
    Array.from(allNum_btn).map(btn => btn.addEventListener("click", e => {
        //regEx to check if the input is a number
        let rawInput = parseInt(e.target.innerText);
        let treatedInput = /[^0-9]/.test(rawInput);

        //if it is a number, do the following
        if (treatedInput === false) {
            if (operator.length === 0) {
                firstNumber += e.target.innerText;
                currentDisplay.innerText = firstNumber;
            } else {
                secondNumber += e.target.innerText;
                currentDisplay.innerText = secondNumber;
            };
        //if it is a dot
        } else if (e.target.innerText === ".") {
            if (operator.length === 0) {
                //if there is already a dot, disable class
                (firstNumber.indexOf(".") !== -1) ? dotButton.classList.remove("btn-num") : firstNumber += ".";
                currentDisplay.innerText = firstNumber;
            } else {
                dotButton.classList.add("btn-num"); //add the class again do the second number can have a dot as well
                (secondNumber.indexOf(".") !== -1) ? dotButton.classList.remove("btn-num") : secondNumber += ".";
                currentDisplay.innerText = secondNumber;
            };
        } else {
            return;
        };
    }));
};

//add click event to the operator buttons
function operatorBtns() {
    Array.from(allOperator_btn).map(btn => btn.addEventListener("click", e =>{
        switch (e.target.innerText) {
            //in case of the "calculators"
            case "+":
            case "-":
            case "x":
            case "÷":
            case "%":
                if (operator.length === 0) { //first operator chosen
                    operator = e.target.innerText;
                } else if (secondNumber.length > 0){ //in case of a string of calculations
                    calcSequence();
                    operator = e.target.innerText;
                } else { //can swich between operators after selected
                    operator = "";
                    operator = e.target.innerText;
                };
                break;
            case "": //for the backspace, since it is only an image
                if (operator.length === 0) {
                    firstNumber = eraseChar(firstNumber);
                    currentDisplay.innerText = firstNumber;
                } else {
                    secondNumber = eraseChar(secondNumber);
                    currentDisplay.innerText = secondNumber;
                };
                break;
            case "=":
                if (secondNumber.length === 0) { //run only if all values are present
                    return;
                } else {
                    operate(operator);
                    result = roundDecimals(result);
                    currentDisplay.innerText = result;
                };
                break;
        };
    }));
};

//add click event to the +/- button, run the function and update the display as necessary
function posOrNegBtn() {
    posOrNegButton.addEventListener("click", () => {
        if (operator.length === 0) {
            firstNumber = reverseSign(firstNumber);
            currentDisplay.innerText = firstNumber;
        } else {
            secondNumber = reverseSign(secondNumber);
            currentDisplay.innerText = secondNumber;
        };
    });
};

//add click event to the clear button
function clearBtn() {
    clearButton.addEventListener("click", () => {
        clearAll();
    });
};


//------Keyboard section------
//keyboard support for numbers and dot
function keyboardNums() {
    window.addEventListener("keydown", e => {
        //regEx to check if the input is a number
        let rawInput = parseInt(e.key);
        let treatedInput = /[^0-9]/.test(rawInput);

        //if it is a number, do the following
        if (treatedInput === false) {
            if (operator.length === 0) {
                firstNumber += e.key;
                currentDisplay.innerText = firstNumber;
            } else {
                secondNumber += e.key;
                currentDisplay.innerText = secondNumber;
            };
        //if it is a dot
        } else if (e.key === ".") {
            if (operator.length === 0) {
                //if there is already a dot, disable class
                (firstNumber.indexOf(".") !== -1) ? dotButton.classList.remove("btn-num") : firstNumber += ".";
                currentDisplay.innerText = firstNumber;
            } else {
                dotButton.classList.add("btn-num"); //add the class again do the second number can have a dot as well
                (secondNumber.indexOf(".") !== -1) ? dotButton.classList.remove("btn-num") : secondNumber += ".";
                currentDisplay.innerText = secondNumber;
            };
        } else {
            return;
        };
    });
};

//keyboard support for operators and equal sign
function keyboardOperators() {
    window.addEventListener("keydown", e => {
        switch (e.key) {
            case "+":
            case "-":
            case "x":
            case "/":
            case "%":
                if (operator.length === 0) { //first operator chosen
                    operator = e.key;
                } else if (secondNumber.length > 0){ //in case of a string of calculations
                    calcSequence();
                    operator = e.key;
                } else { //swich between operators after selected
                    operator = "";
                    operator = e.key;
                };
                break;
            case "Backspace":
                if (operator.length === 0) {
                    firstNumber = eraseChar(firstNumber);
                    currentDisplay.innerText = firstNumber;
                } else {
                    secondNumber = eraseChar(secondNumber);
                    currentDisplay.innerText = secondNumber;
                };
                break;
            case "=":
                if (secondNumber.length === 0) { //run only if all values are present
                    return;
                } else {
                    operate(operator);
                    result = roundDecimals(result);
                    currentDisplay.innerText = result;
                };
                break;
        };
    });
};
//------Keyboard section------


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
    if ( b === 0) {//can't divide by 0
        alert("Don't you try to crash me!");
        clearAll();
    } else {
        return a / b;
    };
};

function percentage(a, b) {
	return (a / 100) * b;
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
        //the second option for the division is needed for the keyboard support
        case "/":
            result = divide(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
        case "%":
            result = percentage(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
    };
    return result;
};


numBtns();

operatorBtns();

posOrNegBtn();

clearBtn();

keyboardNums();

keyboardOperators();
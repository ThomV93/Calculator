/*let firstNumber = parseInt(prompt("Choose a number to calculate:"));
let operator = prompt("Choose the operator (+, -, *, /) to calculate:");
let secondNumber = parseInt(prompt("Choose a number to calculate:"));
let result = 0;*/

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

function operate(operator) {
    switch (operator) {
        case "+":
            result = add(firstNumber, secondNumber);
            break;
        case "-":
            result = subtract(firstNumber, secondNumber);
            break;
        case "*":
            result = multiply(firstNumber, secondNumber);
            break;
        case "/":
            result = divide(firstNumber, secondNumber);
            break;
    };
    return result;
};

console.log(operate(operator));
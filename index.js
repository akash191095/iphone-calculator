const calculator = document.querySelector("#calculator");
const calculatorDisplay = document.querySelector("#calculator-display");
let value = "0";
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;

function refreshDisplay() {
  calculatorDisplay.textContent = value;
}

function handleNumberClick(number) {
  value = `${value !== "0" ? value : ""}${number}`;
  refreshDisplay();
}

function doCalculation(operator, firstNumber, secondNumber) {
  if (operator === "plus") {
    return firstNumber + secondNumber;
  } else if (operator === "multiply") {
    return firstNumber * secondNumber;
  } else if (operator === "divide") {
    return firstNumber / secondNumber;
  } else if (operator === "minus") {
    return firstNumber - secondNumber;
  }
}

function handleOperation(event) {
  // save number
  if (firstNumber === null) {
    firstNumber = Number(value);
    // save operator
    currentOperator = event.target.dataset.operator;
  } else {
    secondNumber = Number(value);
  }
  value = "0";
  refreshDisplay();

  // check operator is equals to
  if (event.target.dataset.operator === "equals") {
    if (firstNumber && secondNumber) {
      // get result
      const result = doCalculation(currentOperator, firstNumber, secondNumber);
      // show result
      value = `${result}`;
      refreshDisplay();
      // clear
      firstNumber = null;
      secondNumber = null;
      currentOperator = null;
    }
  }
}

function handleCalculatorClick(event) {
  if (event.target.dataset.number) {
    // handle number click
    handleNumberClick(event.target.dataset.number);
  } else if (event.target.dataset.clear !== undefined) {
    // handle clear
    value = "0";
    refreshDisplay();
  } else if (event.target.dataset.backspace !== undefined) {
    // handle backspace
    value = `${value.length >= 2 ? value.slice(0, -1) : "0"}`;
    refreshDisplay();
  } else if (event.target.dataset.operator !== undefined) {
    // handle operator
    handleOperation(event);
  }
}

calculator.addEventListener("click", handleCalculatorClick);

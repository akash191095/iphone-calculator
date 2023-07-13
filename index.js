const calculator = document.querySelector("#calculator");
const calculatorDisplay = document.querySelector("#calculator-display");
const steps = [];
let number = null;

function refreshDisplay(value) {
  calculatorDisplay.textContent = value;
}

function handleNumberClick(value) {
  // save number
  number = Number(`${number !== null ? number : ""}${value}`);
  refreshDisplay(number);
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
  } else {
    return secondNumber;
  }
}

function handleOperation(event) {
  const prevOperator = steps.length ? steps[steps.length - 1].operator : false;
  const isEqualsTo = event.target.dataset.operator === "equals";

  steps.push({
    operator: event.target.dataset.operator,
    // isEqualsTo && prevOperator ? prevOperator : event.target.dataset.operator,
    number,
    isEqualsTo,
    prevOperator,
  });

  number = null;

  if (event.target.dataset.operator === "equals") {
    const total = steps.reduce((total, step, currentIndex, steps) => {
      // const prevOperator = steps[currentIndex - 1];
      // console.log(prevOperator);
      const result = doCalculation(step.prevOperator, total, step.number);
      return result;
    }, 0);
    refreshDisplay(total.toString());
    number = total;
  }
}

function handleCalculatorClick(event) {
  if (event.target.dataset.number) {
    // handle number click
    handleNumberClick(event.target.dataset.number);
  } else if (event.target.dataset.clear !== undefined) {
    // handle clear
    steps.length = 0;
    number = null;
    refreshDisplay("0");
  } else if (event.target.dataset.backspace !== undefined) {
    // handle backspace
    number = Number(
      `${number.toString().length >= 2 ? number.toString().slice(0, -1) : 0}`
    );
    refreshDisplay(number);
  } else if (event.target.dataset.operator !== undefined) {
    // handle operator
    handleOperation(event);
  }
}

calculator.addEventListener("click", handleCalculatorClick);

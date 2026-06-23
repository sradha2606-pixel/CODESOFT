const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '0';
let previousValue = null;
let currentOperation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function clearCalculator() {
    currentInput = '0';
    previousValue = null;
    currentOperation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function appendDigit(digit) {
    if (shouldResetDisplay) {
        currentInput = digit;
        shouldResetDisplay = false;
        return;
    }

    if (currentInput === '0') {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
}

function setOperation(operation) {
    if (currentOperation !== null && !shouldResetDisplay) {
        computeResult();
    }

    previousValue = parseFloat(currentInput);
    currentOperation = operation;
    shouldResetDisplay = true;
}

function computeResult() {
    if (currentOperation === null || previousValue === null) {
        return;
    }

    const currentValue = parseFloat(currentInput);
    let result;

    switch (currentOperation) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case 'X':
            result = previousValue * currentValue;
            break;
        default:
            return;
    }

    currentInput = String(result);
    currentOperation = null;
    previousValue = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function applyPercent() {
    const value = parseFloat(currentInput);
    currentInput = String(value / 100);
    updateDisplay();
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            clearCalculator();
            return;
        }

        if (value === '=') {
            computeResult();
            return;
        }

        if (value === '%') {
            applyPercent();
            return;
        }

        if (value === '+' || value === '-' || value === 'X') {
            setOperation(value);
            return;
        }

        if (/^[0-9]$/.test(value)) {
            appendDigit(value);
            updateDisplay();
            return;
        }
    });
});

updateDisplay();

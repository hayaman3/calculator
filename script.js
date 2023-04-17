let numbersArray = [];
let operatorsArray = [];
let operatorsRegex = /[+\-\*\/]/;
let ans = 0;

//displays
const displayCurrent = document.getElementById("display-current");
const displayPast = document.getElementById("display-past");
//buttons
const allClear = document.getElementById("all-clear");
const equal = document.getElementById("equal");
const numbers = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const positveNegative = document.getElementById("positive-negative");;
const backspace = document.getElementById("backspace");

//css
const glitch = document.getElementById("glitch");

//button functions
allClear.addEventListener('click', allClearFunc);
equal.addEventListener('click', equalFunc);
backspace.addEventListener('click', backspaceFunc);
document.addEventListener('keydown', handleKeyboardInput);

numbers.forEach((button, i) => {
    button.addEventListener("click", () => {
        let input = numbers[i].textContent;
        if (fitsDisplay() && !hasDecimal(input)) {
            updateDisplay(input, "number");
        }
    })
})

operator.forEach((button, i) => {
    button.addEventListener("click", () => {
        let input = operator[i].textContent;
        if (fitsDisplay() && !hasRepeatOperators() &&(displayPast.innerText.length!=0||displayCurrent.innerText.length!=0)) {
            updateDisplay(input, "operator");
        }
    })
})

function equalFunc() {
    getData();
    if (!isRecentlySolved("=") && !areDisplaysEmpty()) {
        if (numbersArray.length == 0) {
            return;
        } else if (numbersArray.length == 1) {
            ans = numbersArray[0];
        } else {
            ans = evaluate();
        }
        updateDisplay(ans, "equal");
    }
}

function allClearFunc() {
    displayCurrent.textContent = "";
    displayPast.textContent = "";
    numbersArray = [];
    operatorsArray = [];
    glitchAnimation(false);
}

function backspaceFunc() {
    if (displayCurrent.textContent.length == 0) {
        displayPast.textContent = displayPast.textContent.slice(0, -1);
    } else {
        displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);
    }
}

function handleKeyboardInput(e) {
    if (/[0-9\.]/.test(e.key)) {
        if (fitsDisplay() && !hasDecimal(e.key)) {
            updateDisplay(e.key, "number");
        }
    }
    if (operatorsRegex.test(e.key)) {
        if (fitsDisplay() && !hasRepeatOperators()) {
            updateDisplay(e.key, "operator");
        }
    }
    if (e.key === '=' || e.key === 'Enter') equalFunc()
    if (e.key === 'Backspace') backspaceFunc()
    if (e.key === 'Escape') allClearFunc()
}

//auxiliary functions
function getData(){
    let display = displayPast.textContent + displayCurrent.textContent;
    numbersArray = display.split(operatorsRegex);
    let operators = display.replace(/[0-9\.]/g, '');
    operatorsArray = operators.split("");
}

function evaluate() {
    let nextNumber = Number(numbersArray[0]);
    ans = nextNumber;
    for(let i = 1, j = 0; j < operatorsArray.length; i++, j++){
        nextNumber = Number(numbersArray[i]);
        switch (operatorsArray[j]) {
            case "+":
                ans += nextNumber;
                break;
            case "-":
                ans -= nextNumber;
                break;
            case "*":
                ans *= nextNumber;
                break;
            case "/":
                if (nextNumber == 0) {
                    ans = 0;
                    updateDisplay(ans, "didivdedByZero");
                    return
                } else {
                    ans /= nextNumber;
                    break;
                }
            default:
                // do nothing
                console.log("something is wrong in switch(operator)");
                break;
        }
    }
    return ans;
}

function updateDisplay(input, buttonClicked) {
    if (isRecentlySolved()) {
        displayPast.textContent = "";
    }
    switch (buttonClicked) {
        case "number":
            if (!(displayCurrent.textContent[0] == 0)) {
                displayCurrent.textContent += input;
            } else {
                displayCurrent.textContent = input;
            }
            break;
        case "operator":
            displayPast.textContent += displayCurrent.textContent;
            displayPast.textContent += input;
            displayCurrent.textContent = "";
            break;
        case "equal":
            if (hasExtraOperator()) {
                displayPast.textContent = displayPast.textContent.slice(0, -1);
                displayPast.textContent += displayCurrent.textContent;
                displayPast.textContent += "=";
                displayCurrent.textContent = input;
            } else {
                displayPast.textContent += displayCurrent.textContent;
                displayPast.textContent += "=";
                displayCurrent.textContent = input;
            }
            break;
        case "didivdedByZero":
            glitchAnimation(true);
            break;
        default:
            // do nothing
            console.log("something is wrong in display update");
            break;
    }
}

// boolean checks
function fitsDisplay() {
    if (displayCurrent.textContent.length > 9) {
        shakeAnimation(displayCurrent);
        return false;
    } else if (displayPast.textContent.length > 12) {
        shakeAnimation(displayPast);
        return false;
    } else if (displayCurrent.textContent.length + displayPast.textContent.length > 9) {
        shakeAnimation(displayCurrent);
        shakeAnimation(displayPast);
        return false;
    } else {
        return true;
    }
}

function hasRepeatOperators() {
    let currentDisplayLength = displayCurrent.textContent.length;
    let pastDisplayLength = displayPast.textContent.length;
    let lastIndex = displayPast.textContent.length - 1;
    let lastChar = displayPast.textContent[lastIndex];
    if (!(operatorsRegex.test(lastChar)) || currentDisplayLength > 0) {
        return false;
    } else {
        shakeAnimation(displayPast);
        return true;
    }
}

function hasExtraOperator() {
    let lastIndex = displayPast.textContent.length - 1;
    if ((operatorsRegex.test(displayPast.textContent[lastIndex])) && displayCurrent.textContent.length == 0) {
        return true;
    } else {
        return false;
    }
}

function hasDecimal(button) {
    if (button == ".") {
        if ((/[.]/.test(displayCurrent.textContent))) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function areDisplaysEmpty() {
    let current = displayCurrent.textContent.length;
    let past = displayPast.textContent.length;
    if (current > 0 || past > 0) {
        return false;
    } else {
        return true;
    }
}

function isRecentlySolved() {
    let lastIndex = displayPast.textContent.length - 1;
    let lastChar = displayPast.textContent[lastIndex];
    if (lastChar == "=") {
        return true;
    } else {
        return false;
    }
}

// animation
function shakeAnimation(element) {
    element.classList.remove("shake");
    element.offsetWidth;
    element.classList.add("shake");
}

function glitchAnimation(invalidOperation) {
    if (invalidOperation) {
        displayPast.style.display = "none";
        displayCurrent.style.display = "none";
        glitch.style.display = "block";
        allClear.classList.add("shake-infinite");
    } else {
        displayPast.style.display = "block";
        displayCurrent.style.display = "block";
        glitch.style.display = "none";
        allClear.classList.remove("shake-infinite");
    }
}
 
document.getElementById('theme-toggle').addEventListener('click', setTheme)
const root = document.documentElement;

function setTheme() {
    root.classList.toggle("light")
}
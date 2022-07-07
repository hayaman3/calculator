let numbersArray = [];
let operatorsArray = [];
let currentIndex = 0;

//displays
const displayCurrent = document.getElementById("display-current");
const displayPast = document.getElementById("display-past");
//buttons
const allClear = document.getElementById("all-clear");
const equal = document.getElementById("equal");
const numbers = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");

const glitch = document.getElementById("glitch")

//button functions
allClear.addEventListener('click',allClearFunc);
equal.addEventListener('click' , equalFunc);

numbers.forEach((button, i) => {
    button.addEventListener("click", () => {
        let input = numbers[i].textContent;
        if(fitsDisplay() && !hasDecimal(input)){
            updateDisplay(input,"number");
            updateNumbersArray(input);
        }
    })
})

operator.forEach((button, i) => {
    button.addEventListener("click", () => {
        let input = operator[i].textContent;
        if(fitsDisplay() && !hasRepeatOperators()){
            updateDisplay(input,"operator");
            updateOperatorsArray(input);
        }
    })
})

function equalFunc(){
    if(!recentlySolved("=")){
        let ans = 0;
        updateArrays();
        if(numbersArray.length == 0){
            return;
        }else if(numbersArray.length == 1 ){
            ans = numbersArray[0];
        }else{
            ans = evaluate();
        }
        updateDisplay(ans,"equal");
        saveAns(ans);
    }
}

function evaluate(){
    let nextNumber = Number(numbersArray[0]);
    ans = nextNumber;
    for (let i = 1, j = 0; j < operatorsArray.length; i++, j++){
        nextNumber =  Number(numbersArray[i]);
        switch(operatorsArray[j]){
            case "+":
                ans  += nextNumber;
                break;
            case "-":
                ans -= nextNumber;
                break;
            case "x":
                ans *= nextNumber;
                break;
            case "÷":
                if(nextNumber==0){
                    ans = 0;
                    updateDisplay(ans,"didivdedByZero");
                    return
                }else{
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

function allClearFunc(){
    displayCurrent.textContent = "";
    displayPast.textContent = "";
    numbersArray = [];
    operatorsArray = [];
    currentIndex = 0;
    glitchAnimation(false);
}

function saveAns(ans){
    numbersArray = [];
    currentIndex = 0;
    numbersArray[0] = ans;
    operatorsArray = [];
}

//update functions
function updateNumbersArray(data){
    if(numbersArray[currentIndex]===undefined){
        numbersArray[currentIndex] = data;
    }else{
        numbersArray[currentIndex] += data;
    }
}

function updateOperatorsArray(operatorSign){
    currentIndex ++;
    operatorsArray.push(operatorSign);
}

function updateDisplay(input,buttonClicked){
    if(recentlySolved()){
        displayPast.textContent = "";
    }
    switch(buttonClicked){
        case "number":
            if(!(displayCurrent.textContent[0]==0)){
                displayCurrent.textContent += input;
            }else{
                displayCurrent.textContent = input;
            }
            break;
        case "operator":
            displayPast.textContent += displayCurrent.textContent;
            displayPast.textContent += input;
            displayCurrent.textContent = "";
            break;
        case "equal":
            if(hasExtraOperator()){
                displayPast.textContent = displayPast.textContent.slice(0,-1);
                displayPast.textContent += displayCurrent.textContent;
                displayPast.textContent +=  "=";
                displayCurrent.textContent = input;
            }else{
                displayPast.textContent += displayCurrent.textContent;
                displayPast.textContent +=  "=";
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

function hasExtraOperator(){
    let lastIndex = displayPast.textContent.length-1;
    if((/[+\-\x\÷]/.test(displayPast.textContent[lastIndex]))&&displayCurrent.textContent.length==0){
        return true;
    }else{
        return false;
    }
}

function updateArrays(){
    if(numbersArray.length <= operatorsArray.length){
        operatorsArray.pop();
    }
    numbersArray = numbersArray.map(stringToNumber =>{
        return Number(stringToNumber)
    });
}

// boolean checks
function fitsDisplay(){
    if(displayCurrent.textContent.length>12){
        shakeAnimation(displayCurrent);
        return false;
    }else if(displayPast.textContent.length>17){
        shakeAnimation(displayPast);
        return false;
    }else if(displayCurrent.textContent.length+displayPast.textContent.length>17){
        shakeAnimation(displayCurrent);
        shakeAnimation(displayPast);
        return false;
    }else{
        return true;
    }
}

function hasRepeatOperators(){
    let currentDisplayLength = displayCurrent.textContent.length;
    let numbersArrayLength = numbersArray.length;

    if(numbersArrayLength>0 && currentDisplayLength>0){
        return false;
    }else{
        shakeAnimation(displayPast);
        return true;
    }
}

function hasDecimal(button){
    if(button=="."){
        if((/[.]/.test(displayCurrent.textContent))){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

function recentlySolved(){
    let lastIndex = displayPast.textContent.length-1;
    if(displayPast.textContent[lastIndex] == "="){
        return true;
    }else{
        return false;
    }
}

// animation
function shakeAnimation(element){
    element.classList.remove("shake");
    element.offsetWidth;
    element.classList.add("shake");
}

function glitchAnimation(invalidOperation){
    if(invalidOperation){
        displayPast.style.display = "none";
        displayCurrent.style.display = "none";
        glitch.style.display = "block";
        allClear.classList.add("shake-infinite");
    }else{
        displayPast.style.display = "block";
        displayCurrent.style.display = "block";
        glitch.style.display = "none";
        allClear.classList.remove("shake-infinite");
    }
}

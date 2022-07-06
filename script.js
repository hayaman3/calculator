let numbersArray = [];
let operatorsArray = [];
let currentIndex = 0;

const numbers = document.querySelectorAll(".number");
const displayCurrent = document.getElementById("display-current");
const displayPast = document.getElementById("display-past");
const main = document.getElementById("main")

const allClear = document.getElementById("all-clear");
const equal = document.getElementById("equal");
const operator = document.querySelectorAll(".operator");

allClear.addEventListener('click',clearScreen);
equal.addEventListener('click' , evaluate);

numbers.forEach((button, i) => {
    button.addEventListener("click", () => {
        let input = numbers[i].textContent;
        if(viableDisplaySize() && periodExists(input)){
            updateDisplay(input,"number");
            updateNumbersArray(input);
        }else{

        }
    });
});

function periodExists(button){
    if(button=="."){
        if((/[.]/.test(displayCurrent.textContent))){
            return false;
        }else{
            return true;
        }
    }else{
        return true;
    }
}

operator.forEach((button, i) => {
    button.addEventListener("click", () => {
        let input = operator[i].textContent;
        if(viableDisplaySize() && preventRepeatedOperator()){
            updateDisplay(input,"operator");
            updateOperatorsArray(input);
        }else{
            
        }
    });
});

function updateNumbersArray(data){
    if(numbersArray[currentIndex]===undefined){
        numbersArray[currentIndex] = data
    }else{
        numbersArray[currentIndex] += data
    }
}

function updateOperatorsArray(operatorSign){
    currentIndex ++;
    operatorsArray.push(operatorSign)
}

function viableDisplaySize(){
    if(displayCurrent.textContent.length>12){
        shake(displayCurrent)
        return false;
    }else if(displayPast.textContent.length>17){
        shake(displayPast)
        return false;
    }else if(displayCurrent.textContent.length+displayPast.textContent.length>17){
        shake(displayCurrent)
        shake(displayPast)
        return false;
    }else{
        return true;
    }
}

function preventRepeatedOperator(){
    let currentDisplayLength = displayCurrent.textContent.length;
    let numbersArrayLength = numbersArray.length;

    if(numbersArrayLength>0 && currentDisplayLength>0){
        return true;
    }else{
        shake(displayPast)
        return false;
    }
}

function shake(element){
    element.classList.remove("shake");
    element.offsetWidth;
    element.classList.add("shake");
}

function updateDisplay(input,buttonClicked){
    if(previouslyEvaluated()){
        displayPast.textContent = "";
    }
    if(buttonClicked==="number"){
        if(!(displayCurrent.textContent[0]==0)){
            displayCurrent.textContent += input;
        }else{
            displayCurrent.textContent = input;
        }
    }else if(buttonClicked==="operator"){
        displayPast.textContent += displayCurrent.textContent;
        displayPast.textContent += input
        displayCurrent.textContent = "";
    }else if(buttonClicked==="equal"){
        let lastIndex = displayPast.textContent.length-1;
        if((/[+\-\x\÷]/.test(displayPast.textContent[lastIndex]))&&displayCurrent.textContent.length==0){
            displayPast.textContent = displayPast.textContent.slice(0,-1)
            displayPast.textContent += displayCurrent.textContent
            displayPast.textContent +=  "="
            displayCurrent.textContent = input;
        }else{
            displayPast.textContent += displayCurrent.textContent
            displayPast.textContent +=  "="
            displayCurrent.textContent = input;
        }
    }
    else{
        console.log("did  not updateDisplay")
    }
}

function previouslyEvaluated(){
    let lastIndex = displayPast.textContent.length-1;
    if(displayPast.textContent[lastIndex] == "="){
        return true;
    }else{
        return false;
    }
}



function evaluate(){
    if(!previouslyEvaluated("=")){
        let ans = 0;
        updateArrays()
        if(numbersArray.length == 0){
            return;
        }else if(numbersArray.length == 1 ){
            ans = numbersArray[0];
        }else{
            let placeHolder = Number(numbersArray[0]);
            ans = placeHolder;

            for (let i = 1, j = 0; j <= operatorsArray.length; i++, j++){
                placeHolder =  Number(numbersArray[i]);
                switch(operatorsArray[j]){
                    case "+":
                        ans  += placeHolder;
                        break;
                    case "-":
                        ans -= placeHolder;
                        break;
                    case "x":
                        ans *= placeHolder;
                        break;
                    case "÷":
                        if(placeHolder==0){
                            updateDisplay(null,"didivdedByZero")
                            numbersArray = [];
                            currentIndex = 0;
                            operatorsArray = [];
                            return
                        }else{
                            ans /= placeHolder;
                            break;
                        }
                    case null:
                        console.log(operatorsArray[j])
                        break;
                    default:
                        // do nothing
                        console.log("something is wrong in switch(operator)||end of loop")
                        break;
                }
            }
        }
        console.log(ans)

        updateDisplay(ans,"equal")
        resetData(ans)
    }
}

function resetData(ans){
    numbersArray = [];
    currentIndex = 0;
    numbersArray[0] = ans;
    operatorsArray = [];
}

function updateArrays(){
    if(numbersArray.length <= operatorsArray.length){
        operatorsArray.pop();
    }
    numbersArray = numbersArray.map(str =>{
        return Number(str)
    });
}

function clearScreen(){
    displayCurrent.textContent = "";
    displayPast.textContent = "";
    numbersArray = [];
    operatorsArray = [];
    currentIndex = 0;
}
const numbers = document.querySelectorAll(".number")
const displayCurrent = document.getElementById("display-current");
const displayPast = document.getElementById("display-past");

const allClear = document.getElementById("all-clear")
const equal = document.getElementById("equal")
const operator = document.querySelectorAll(".operator")

let numbersArray = [];
let operatorsArray = [];

allClear.addEventListener('click',clearScreen)
equal.addEventListener('click' , operate)


let currentIndex = 0;

numbers.forEach((button, i) => {
    button.addEventListener("click", () => {
        if(exceedDisplaySize()){
            updateDisplay(numbers[i].innerText,false);
            updateNumbersArray(numbers[i].innerText);
        }else{

        }
    });
});

operator.forEach((button, i) => {
    button.addEventListener("click", () => {
        if(exceedDisplaySize()){
            currentIndex ++;
            updateDisplay(operator[i].innerText,true)
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

function updateOperatorsArray(data){

}

function exceedDisplaySize(){
    if(displayCurrent.innerText.length<15 && displayPast.innerText.length<20){
        return true;
    }else{
        return false; 
    }
}



function updateDisplay(data,operatorClicked){
    if(!operatorClicked){
        displayCurrent.innerText += data;
    }else if(operatorClicked&&hasPreviousOperator()){
        displayPast.innerText += displayCurrent.innerText;
        displayPast.innerText += data
        displayCurrent.innerText = "";
    }else{
        console.log("updateDisplay")
    }
}

function hasPreviousOperator(data){
    let lastIndex = displayPast.innerText.length-1;
        if(!(/[+\-\x\÷]/.test(displayPast.innerText[lastIndex]))){
            console.log("hasPreviousOperator true")
            return true;
        }else{
            console.log("hasPreviousOperator false")
            return false;
        }
}

function operate(){
    if(!equalClicked){
        //check to push last number
        if(!(displayCurrent.innerHTML=="")){
            numbersArray.push(parseFloat(Math.abs(displayCurrent.innerHTML)));
            displayPast.innerText += displayCurrent.innerText;
        }

        //check numbers array for length
        if(numbersArray.length==0){
            ans = 0
        }
        if(numbersArray.length==1){
            ans = numbersArray[0]
        }
        
        else{
            let placeHolder = parseFloat(Math.abs(numbersArray[0]));
            let ans = placeHolder;

            for (let i = 1, j = 0; j <= operatorsArray.length; i++, j++){
                placeHolder =  parseFloat(numbersArray[i]);

                if(operatorsArray[j]=="+"){
                    ans  += placeHolder;
                    
                }else if(operatorsArray[j]=="-"){
                    ans -= placeHolder;
                
                }else if(operatorsArray[j]=="x"){
                    ans *= placeHolder;
                
                }else if(operatorsArray[j]=="÷"){
                    ans /= placeHolder;
                }
                console.log(j+" : " +ans) 
            }
            console.log("total : "+ans) 
            displayCurrent.innerText = ans;
            operatorsArray = [];
            numbersArray = [];
            numbersArray.push(ans);
        }
    }
    equalClicked = true;
}

function clearScreen(){
    displayCurrent.innerText = "";
    displayPast.innerText = "";
    numbersArray = [];
    operatorsArray = [];
}


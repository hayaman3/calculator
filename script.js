const numbers = document.querySelectorAll(".number")
const displayCurrent = document.getElementById("display-current");
const displayPast = document.getElementById("display-past");

const allClear = document.getElementById("all-clear")
const equal = document.getElementById("equal")
const operator = document.querySelectorAll(".operator")

let numbersArray = [];
let operatorsArray = [];
let temp = "";
let operatorClicked = true;
let lastOperator = "none";
let equalClicked = false;

allClear.addEventListener('click',clearScreen)
equal.addEventListener('click' , operate)

numbers.forEach((button, i) => {
    button.addEventListener("click", () => {

        displayCurrent.innerText += numbers[i].innerText;;

        temp = parseFloat(Math.abs(displayCurrent.innerText));


        if(operatorClicked&&lastOperator!="none"){
            operatorsArray.push(lastOperator)
        }

        operatorClicked = false;
        equalClicked = false;

    });
});

operator.forEach((button, i) => {
    button.addEventListener("click", () => {
        if(equalClicked){

        }

        if(!operatorClicked){

            operatorClicked = true;
            equalClicked = false;

            numbersArray.push(temp);

            lastOperator = operator[i].innerText;
            displayPast.innerText += displayCurrent.innerText;
            displayCurrent.innerText = operator[i].innerText;
        }
    });
});

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
    operatorClicked = false;
    equalClicked = false;
}

//create function for check state

const numbers = document.querySelectorAll(".number")
const displayCurrent = document.getElementById("display-current");
const displayPast = document.getElementById("display-past");

const allClear = document.getElementById("all-clear")
const equal = document.getElementById("equal")
const operator = document.querySelectorAll(".operator")

let num = [];
let temp = "";
let operatorClicked = false;
let lastOperator = "";

allClear.addEventListener('click',clearScreen)
equal.addEventListener('click' , operate)

numbers.forEach((button, i) => {
    button.addEventListener("click", () => {

        displayCurrent.innerText += numbers[i].innerText;;

        temp = parseFloat(displayCurrent.innerText);
        
        operatorClicked = true;

        if(!operatorClicked){
            num.push(lastOperator)
        }

    });
});

operator.forEach((button, i) => {
    button.addEventListener("click", () => {
        if(operatorClicked){

            operatorClicked = false;

            num.push(temp);

            lastOperator = operator[i].innerText;
            displayPast.innerText += displayCurrent.innerText;
            displayCurrent.innerText = operator[i].innerText;
        }
    });
});

function operate(){
    if (num.length==0){
        displayCurrent.innerText = "0"
    }

}

function clearScreen(){
    displayCurrent.innerText = "";
    displayPast.innerText = "";
    num = [];
}
     
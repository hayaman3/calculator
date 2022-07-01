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

allClear.addEventListener('click',clearScreen)
equal.addEventListener('click' , operate)

numbers.forEach((button, i) => {
    button.addEventListener("click", () => {

        displayCurrent.innerText += numbers[i].innerText;;

        temp = parseFloat(displayCurrent.innerText);


        if(operatorClicked&&lastOperator!="none"){
            operatorsArray.push(lastOperator)
        }

        operatorClicked = false;


    });
});

operator.forEach((button, i) => {
    button.addEventListener("click", () => {
        if(!operatorClicked){

            operatorClicked = true;

            numbersArray.push(temp);

            lastOperator = operator[i].innerText;
            displayPast.innerText += displayCurrent.innerText;
            displayCurrent.innerText = operator[i].innerText;
        }
    });
});

let ans = +"";

function operate(){
    //check to push last number
    if(!(displayCurrent.innerHTML=="")){
        numbersArray.push(parseFloat(displayCurrent.innerHTML));
    }

    //check numbers array for length
    if(numbersArray.length==0){
        ans = 0
    }
    if(numbersArray.length==1){
        ans = numbersArray[0]

    }else{
        for (let i = 0; i <= operatorsArray.length;i++){

            numi = Number(numbersArray[i]);
            numi1 = Number(numbersArray[i+1]);
            let placeHolder = +""

            if(operatorsArray[i]=="+"){

                placeHolder = numi + numi1;
                ans = placeHolder + Number(ans);
                console.log(ans)

                
            }
        }
    }

    //ans = numbersArray[0]+numbersArray[1]
    //console.log(ans)

}

function clearScreen(){
    displayCurrent.innerText = "";
    displayPast.innerText = "";
    num = [];
    operatorClicked = false;
}

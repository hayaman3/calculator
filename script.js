const numbers = document.querySelectorAll(".number")
const currentDisplay = document.getElementById("current-display");
const pastDisplay = document.getElementById("past-display");

const allClear = document.getElementById("all-clear")
const equal = document.getElementById("equal")
const operator = document.querySelectorAll(".operator")

let num = [];
let placeholder = "";
let sign = "";
let ans = "";

allClear.addEventListener('click',clearScreen)
equal.addEventListener('click' , operate)

numbers.forEach((button, i) => {
    button.addEventListener("click", () => {
        let value = numbers[i].innerText;  
        currentDisplay.innerText += value;
        placeholder = currentDisplay.innerText;
    });
});

operator.forEach((button, i) => {
    button.addEventListener("click", () => {
        sign = operator[i].innerText;
        num.push = placeholder;
        pastDisplay.innerText = currentDisplay.innerText;
        currentDisplay.innerText = sign;
    });
});


signs = [];

function operate(){

}

function clearScreen(){
    currentDisplay.innerText = "";
}

//    // Javascript program to find sum of given array of
//     // string type in integer form   
     
//     // Function to find the sum of given array
//     function calculateSum(arr, n)
//     {
           
//         // if string is empty
//         if (n == 0)
//             return 0;
//         let s = arr[0];
           
//         // parseInt function to convert
//         // string into integer
//         let value = parseInt(s);
//         let sum = value;
       
//         for (let i = 2; i < n; i = i + 2)
//         {
//             s = arr[i];
       
//             // parseInt function to convert
//             // string into integer
//             value = parseInt(s);
       
//             // Find operator
//             let operation = arr[i - 1][0];
       
//             // If operator is equal to '+',
//             // add value in sum variable
//             // else subtract
//             if (operation == '+')
//                 sum += value;
//             else
//                 sum -= value;
//         }
           
//         return sum;
//     }
     
//     let arr = [ "3", "+", "4", "-", "7", "+", "13" ];
//     let n = arr.length;
 
//     document.write(calculateSum(arr, n));
     
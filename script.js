const inputbox = document.getElementById('inputbox');
const buttons = document.querySelectorAll('button');
let currentInput = "";

// Helper function : check karne ke liye ki kya akhri character ek operator hai 
const isOperator = (char) => ['+','-','*','/','%'].includes(char);

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText  = e.target.innerHTML;

if (buttonText === '='){
    try{
        if (currentInput !== ""){
            // agar user ne akhri mai koi operator chod diya hai (e.g. 5+)
        if ( isOperator(currentInput.slice(-1))){
                currentInput = currentInput(0,-1);
        }
            // Safe calculation Mathamatical formulation
        let result = Function('"use strict";return (' + currentInput + ')')();

            // division by zero yaa galat math ko handle karne ke liye 
        if (!isFinite(result) || isNaN(result)){
                inputbox.value = "Error";
                currentInput = "";
        }else{
                // Javascript floating point error fix
                // isko fix karne ke liye roundoff decimal use kiya hain 
                result = Math.round(result * 100000000) / 100000000;
                inputbox.value = result;
                currentInput = result.toString();
        }
        }
    } catch (error){
        inputbox.value = "Error";
        currentInput = "";
    }
}
else if (buttonText === 'AC'){
    currentInput = "";
    inputbox.value = "0";
}
else if (buttonText === 'DEL'){
    currentInput = currentInput.slice(0,-1);
    inputbox.value = currentInput || "0";
}
else{
    // BUG FIX 1 : agar shuru me hi koi direct operator dabaye (+,/,*,%) to pehle '0' lag jaye 
    if (currentInput === " " && ['+','*','/','%'].includes(buttonText)){
        currentInput = "0" + buttonText;
    }
    // BUG FIX 2 : Do Operator ek sath dabane se rokein( '++', '+*')
    else if (isOperator(buttonText) && isOperator(currentInput.slice(-1))){
    //  Purane operator ko naye wale se replace kar do 
    currentInput = currentInput.slice(0,-1) + buttonText;
    }
    // Normal number inputs ke liye 
    else if ( currentInput === "0" && buttonText !== "."){
        currentInput = buttonText;
    }
    else{
        currentInput += buttonText;
    }
    inputbox.value = currentInput;
}
    });
});
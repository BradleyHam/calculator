// ---------- Global Variables -----------

let empty = '';

// ----------- Dom Elements ------------------

let buttons = document.querySelectorAll('.calculator__button');
let screen = document.getElementById('calcScreen');
let operatorButtons = document.querySelectorAll('[data-operator]');

// ------------- State ---------------

let calcState = {
    operatorPressed: false,
    operatorPressedCount: 0,
    firstOperand: empty,
    secondOperand: empty,
    operator: null,
    calculate  // <<------ Function - declaration at bottom
};

// -------- Main Program ---------

buttons.forEach(item => {
    item.addEventListener('click', handleButtonPress)
})

function handleButtonPress(event){
    if(event.target.dataset.operator){
        handleOperatorPress(event);
    
    }else{
        handleNumberPress(event);
    }  
    console.log(calcState)
}

// ------------------- Function Declarations -----------

function handleOperatorPress(event){
    if(calcState.firstOperand === empty){
        return;
    };
    if(event.target.dataset.operator === 'equals'){
        calcState.calculate()
        return
    };
    if(event.target.dataset.operator === 'clear'){
        calcState = {
            operatorPressed: false,
            operatorPressedCount: 0,
            firstOperand: empty,
            secondOperand: empty,
            operator: null,
            calculate  
        }
        screen.innerText = '';
        return;
    };
    if(calcState.operatorPressed){
        toggleButtonBackground(event);
        setOperator(event);
        if(calcState.seconOperand){
            calcState.calculate();
        }
        }else{
            toggleButtonBackground(event);
            calcState.operatorPressed = true;
            calcState.operatorPressedCount++;
            setOperator(event);
     }

};

function handleNumberPress(event){
    if(calcState.operatorPressed && calcState.secondOperand === empty){
        screen.innerText = '';
    };
    if(calcState.operatorPressed === false){
        displayFirstOperand(event);
    }else{
        removeActiveOperators();
        displaySecondOperand(event);
    }
}

function setOperator(event){
    switch(event.target.dataset.operator) {
        case 'add':
          calcState.operator = '+';
          break;
        case 'subtract':
            calcState.operator = '-';
          break;
        case 'multiply':
            calcState.operator = 'x';
          break;
        case 'divide':
            calcState.operator = '/';
          break;
        default:
            calcState.operator = '=';
      }
}

function removeActiveOperators(){
    operatorButtons.forEach(item => {
        item.classList.remove('button__active');
    })
}

function toggleButtonBackground(event){
    event.target.classList.toggle('button__active');
}

function displaySecondOperand(event){
    
    calcState.secondOperand += event.target.innerText;
    screen.innerText += event.target.innerText;
}

function displayFirstOperand(event){
    calcState.firstOperand += event.target.innerText;
    screen.innerText += event.target.innerText;
}

function calculate(){
    let firstOperand = +this.firstOperand;
    let secondOperand = +this.secondOperand;
    let operator = this.operator
    let result;

    if(operator === '+'){
        result = firstOperand + secondOperand;
    }else if(operator === '-'){
        result = firstOperand - secondOperand;
    }else if(operator === '/'){
        result = firstOperand / secondOperand;
    }else{
        result = firstOperand * secondOperand;
        } 

    displayResult(result);
}

function displayResult(result){
    screen.innerText = result;
    calcState.firstOperand = result;
    calcState.secondOperand = empty;
}
// ----------- Dom Elements ------------------
let buttons = document.querySelectorAll('.calculator__button');
let screen = document.getElementById('calcScreen');

// ------------- State ---------------

let calcState = {
    operatorPressed: false,
    operatorPressedCount: 0,
    firstOperand: null,
    secondOperand: 0,
    operator: null,
    calculate: function(){
      if(this.operator === '+'){
          return this.firstOperand + this.secondOperand;
      }else if(this.operator === '-'){
        return this.firstOperand - this.secondOperand;
      }else if(this.operator === '/'){
        return this.firstOperand / this.secondOperand;
      }else{
        return this.firstOperand * this.secondOperand;
      }
    }
};

// -------- Main Program

buttons.forEach(item => {
    item.addEventListener('click', handleButtonPress)
})

function handleButtonPress(event){
    if(event.target.dataset.operator && calcState.operatorPressedCount === 0){
        handleFirstOperatorPress(event);
    }else if(event.target.dataset.operator && calcState.operatorPressedCount === 1){
        handleSecondOperatorPress(event);
    }else{
        handleNumberPress(event);
    }
}

// ------------------- Function Declarations -----------

function handleSecondOperatorPress(event){
    toggleButtonBackground(event);
    let result = calcState.calculate();
    screen.innerText = result;
};

function handleFirstOperatorPress(event){
    if(calcState.firstOperand === null){
        return;
    }
    toggleButtonBackground(event);
    screen.innerText = '';  
    calcState.operatorPressed = true;
    calcState.operatorPressedCount++;
    checkOperator(event)
}

function handleNumberPress(event){
    if(calcState.operatorPressed === false){
        calcState.firstOperand += +event.target.innerText
    }else{
        calcState.secondOperand += +event.target.innerText
    }
    screen.innerText = screen.innerText + event.target.innerText;
    console.log(calcState)
}

function checkOperator(event){
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
          // code block
      }
}


function toggleButtonBackground(event){
    event.target.classList.toggle('button__active');
}
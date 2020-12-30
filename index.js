// ---------- Global Variables -----------
let empty = '';

// ----------- Dom Elements ------------------

let buttons = document.querySelectorAll('.calculator__button');
let screen = document.getElementById('calcScreen');
let operatorButtons = document.querySelectorAll('[data-operator]');
let modal = document.getElementById('modal');
let modalContainer = document.getElementById('modal-container');

// ------------- State ---------------

let calcState = {
    operatorPressed: false,
    firstOperand: empty,
    secondOperand: empty,
    operator: null,
    calculate  // <<------ Function - declaration at bottom
};

// -------- Event Listners  ---------

buttons.forEach(item => {
    item.addEventListener('click', handleButtonPress)
})

modalContainer.addEventListener('click', removeModal);



// ------------------- Function Declarations -----------


function handleButtonPress(event){
    if(event.target.dataset.operator){
        handleOperatorPress(event);
    
    }else if(event.target.dataset.equals){
        calcState.secondOperand && calcState.calculate();
        return;

    }else if(event.target.dataset.clear){
        clear();
          
    }else{
        handleNumberPress(event);

    }  
    console.log(calcState)
}

function handleOperatorPress(event){
    if(calcState.firstOperand === empty){
        return;
    };
    if(calcState.operatorPressed){
        removeActiveOperators();
        toggleButtonBackground(event);
       
        if(calcState.secondOperand){
            calcState.calculate();
        }
        }else{
            toggleButtonBackground(event);
            calcState.operatorPressed = true;
            setOperator(event);
     }
         setOperator(event);
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

    console.log(operator)
    if(operator === '+'){
        result = firstOperand + secondOperand;
    }else if(operator === '-'){
        result = firstOperand - secondOperand;
    }else if(operator === '/'){
        result = firstOperand / secondOperand;
        if(result === Infinity){
            clear();
            showModal();
            return 
        }       
    }else if(operator === 'x'){
        result = firstOperand * secondOperand;
        } 

    screen.innerText = result;
    calcState.firstOperand = result;
    calcState.secondOperand = empty;
}

function clear(){
    calcState = {
        operatorPressed: false,
        firstOperand: empty,
        secondOperand: empty,
        operator: null,
        calculate  
    }
    screen.innerText = '';
}

function showModal(){
    modal.classList.add('active');
    modalContainer.classList.add('show');
}

function removeModal(){
    modal.classList.remove('active');
    modalContainer.classList.remove('show');
}
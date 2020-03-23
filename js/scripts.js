
const numberButtons = document.querySelectorAll('[number]');
console.log(numberButtons);
const operationButtons = document.querySelectorAll('[operation]');
const equalButton = document.querySelector('[equal]');
const deleteButton = document.querySelector('[delete]');
const clearButton = document.querySelector('[clear]');
const previousOperandTextElement = document.querySelector('[previous-operand]');
const currentOperandTextElement = document.querySelector('[current-operand]');


class Calculator{
     constructor(previousOperandTextElement, currentOperandTextElement){
          this.previousOperandTextElement = previousOperandTextElement;
          this.currentOperandTextElement = currentOperandTextElement;
          this.clear();
     }

     clear(){
          this.previousOperand= '';
          this.currentOperand = '';
          this.operation = undefined;
     }
     delete(){
          this.currentOperand=this.currentOperand.toString().slice(0,-1);
     }
     appendNumber(number){
          if(number === '.' && this.currentOperand.includes('.')) return
          this.currentOperand =this.currentOperand.toString() + number.toString();
     }
     chooseOperation(operation){
          if(this.currentOperand === '') return
          if(this.previousOperand !=''){
               this.compute()
          }
          this.operation = operation;
          this.previousOperand = this.currentOperand
          this.currentOperand= ''
     }
     compute(){
          let computation;
          const prev=parseFloat(this.previousOperand);
          const current= parseFloat(this.currentOperand);
          if(isNaN(prev) || isNaN(current)) return
          switch (this.operation) {
               case '+':
                    computation = prev + current
                    break;
                case '-':
                    computation = prev - current
                    break;
               case '*':
                     computation = prev * current
                    break;
               case '÷':
                    computation= prev / current
                    break;
               default:
                    return
          }
          this.currentOperand = computation
          this.operation= undefined
          this.previousOperand = ''
     }
     getDisplay(number){
          const stringNum = number.toString();
          const integerDigits=parseFloat(stringNum.split('.')[0]);
          const decimalDigits=stringNum.split('.')[1];
          let integerDisplay;
          if(isNaN(integerDigits)) {
               integerDisplay = '';
          } else{
               integerDisplay = integerDigits.toLocaleString('en', {maxFractionDigits : 0})
          }
          if(decimalDigits !=null) {
               return `${integerDisplay}.${decimalDigits}`
          } else{
               return integerDisplay;
          }
     }
     updateDisplay(){
          this.currentOperandTextElement.innerText = this.getDisplay(this.currentOperand);
          if(this.operation != null){
               this.previousOperandTextElement.innerText= `${this.getDisplay(this.previousOperand)} ${this.operation}`;
          } else {
               this.previousOperandTextElement.innerText= '';
          }
          
     }
}

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach((button)=>{
     button.addEventListener('click',()=>{
          console.log(button.innerText);
          calculator.appendNumber(button.innerText);

          calculator.updateDisplay();
     })
});

operationButtons.forEach((button)=>{
     button.addEventListener('click',()=>{
          console.log(button.innerText);
          calculator.chooseOperation(button.innerText);

          calculator.updateDisplay();
     })
});
equalButton.addEventListener('click',(button)=>{
     calculator.compute();
     calculator.updateDisplay();
});

clearButton.addEventListener('click',()=>{
     calculator.clear();
     calculator.updateDisplay();
});

deleteButton.addEventListener('click',()=>{
     calculator.delete();
     calculator.updateDisplay();
})
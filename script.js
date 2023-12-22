const currentPrincipal = document.getElementById("myRange");
const currentMortgagePayment = document.getElementById("myRange2");
const currentInterest = document.getElementById("myRange3");
const currentExtraPayment = document.getElementById("myRange4");
const currentSavingsAmount = document.getElementById("myRange5");
const currentMonthlySavings = document.getElementById("myRange6");

const principal = document.getElementById("mortgageAmount");
const monthlyPayment = document.getElementById("monthlyPayment");
const interest = document.getElementById("mortgageInterest");
const extra = document.getElementById("mortgageExtra");
const currentSavings = document.getElementById("currentSavings");  
const savings = document.getElementById("savings");    


currentPrincipal.value = 305000;
currentMortgagePayment.value = 2750;
currentInterest.value = 8.0;
currentExtraPayment.value = 0;
currentSavingsAmount.value = 0;
currentMonthlySavings.value = 0;



principal.value = currentPrincipal.value;
monthlyPayment.value = currentMortgagePayment.value;
interest.value = currentInterest.value;
extra.value = currentExtraPayment.value;
currentSavings.value = currentSavingsAmount.value;
savings.value = currentMonthlySavings.value;



document.getElementById("mortgageAmount").innerHTML = currencyFormat(principal.value);
document.getElementById("monthlyPayment").innerHTML = currencyFormat(monthlyPayment.value);
document.getElementById("mortgageInterest").innerHTML = percentageFormat(interest.value);
document.getElementById("mortgageExtra").innerHTML = currencyFormat(extra.value);
document.getElementById("currentSavings").innerHTML = currencyFormat(currentSavings.value);
document.getElementById("savings").innerHTML = currencyFormat(savings.value);


compute();

function currencyFormat(num){
  if(num>1000){
    num/=1000;
    return('$'+num)+'k';
  }
  return('$'+num);
}

function percentageFormat(num){
  return(num+'%');
}

// Update the current slider value (each time you drag the slider handle)
currentPrincipal.oninput = function() {
  //output.innerHTML = this.value;
  document.getElementById("mortgageAmount").innerHTML = currencyFormat(this.value);
  principal.value = this.value;
  if(inputValidation) { 
    compute();
    } 
  
}

currentMortgagePayment.oninput = function() {
    //output.innerHTML = this.value;
    document.getElementById("monthlyPayment").innerHTML = currencyFormat(this.value);
    monthlyPayment.value = this.value;
    if(inputValidation) { 
      compute();
      } 
    
  }

  currentInterest.oninput = function() {
    //output.innerHTML = this.value;
    document.getElementById("mortgageInterest").innerHTML = percentageFormat(this.value);
    interest.value = this.value;
    if(inputValidation) { 
      compute();
      } 
    
  }

  currentExtraPayment.oninput = function() {
    //output.innerHTML = this.value;
    document.getElementById("mortgageExtra").innerHTML = currencyFormat(this.value);
    extra.value = this.value;
    if(inputValidation) { 
      compute();
      } 
    
  }

  currentSavingsAmount.oninput = function() {
    //output.innerHTML = this.value;
    document.getElementById("currentSavings").innerHTML= currencyFormat(this.value);
    currentSavings.value = this.value;
    if(inputValidation) { 
      compute();
      } 
  }
    currentMonthlySavings.oninput = function() {
    //output.innerHTML = this.value;
    document.getElementById("savings").innerHTML= currencyFormat(this.value);
    savings.value = this.value;
    if(inputValidation) { 
    compute();
    }  
  }

  function inputValidation() {
    if(!isNaN(principal.value) &&!isNaN(monthlyPayment.value) && !isNaN(interest.value) && !isNaN(extra.value) &&!isNaN(currentSavings.value) &&!isNaN(savings.value))
      return true;
    else{
      return false;
    }
  }
  function compute() {
    const paymentsPending=getTerm(Number(principal.value)-Number(currentSavings.value),Number(monthlyPayment.value),Number(interest.value),Number(extra.value)+Number(savings.value));
      

    document.getElementById("dueMonth").innerHTML = addMonthsToDate(paymentsPending).toLocaleString('en-US', { month: 'short' });
    
    document.getElementById("dueYear").innerHTML = addMonthsToDate(paymentsPending).getFullYear();

    const futureSavings = currentSavings.value + paymentsPending*savings.value;

    if(futureSavings>0){
      document.getElementById("outputText3").innerHTML = "You could pay your mortgage on: "
    }
    else{
          document.getElementById("outputText3").innerHTML = "You will pay your mortgage on: "
        }  
  }

  function getTerm(principal,monthlyPayment,interest,extra){
    let term = 0;
    function mortgageTerm(principalInput,monthlyPaymentInput,interestInput,extraInput){
        if(principalInput>0){
            principalInput-=(extraInput+monthlyPaymentInput-principalInput*interestInput/100/12);
            term=term+1;
            return mortgageTerm(principalInput,monthlyPaymentInput,interestInput,extraInput);
            console.log(principalInput);
        }
        else{
            return term;
        }
    }

    return mortgageTerm(principal,monthlyPayment,interest,extra);    
}

function completionNumber(paymentQty) {
  if(paymentQty===0) {
    return 100;
  }
  else{
      return Math.round(100-(paymentQty/360)*100);
    }
}

function addMonthsToDate(monthsToAdd) {

  if (!Number.isInteger(monthsToAdd)) {
    throw new Error('Months should be an integer');
  }

  // Clone the input date to avoid modifying the original date
  const resultDate = new Date;

  // Calculate the new date
  resultDate.setMonth(resultDate.getMonth() + monthsToAdd + 1);
  resultDate.setDate(0); // Set the day to the last day of the previous month

  return resultDate;

  //addMonthsToDate(62).toLocaleString('en-US', { month: 'short' });
  //addMonthsToDate(62).getFullYear();
}


 
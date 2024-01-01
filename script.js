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

// currentPrincipal.value = 350000;
// currentMortgagePayment.value = 2570;
// currentInterest.value = 8.0;
// currentExtraPayment.value = 0;
// currentSavingsAmount.value = 0;
// currentMonthlySavings.value = 0;



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
  return(Number(num).toFixed(2)+'%');
}

function PMT(rate, nperiod, pv, fv, type) {
  if (!fv) fv = 0;
  if (!type) type = 0;

  if (rate == 0) return -(pv + fv)/nperiod;

  var pvif = Math.pow(1 + rate, nperiod);
  var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

  if (type == 1) {
      pmt /= (1 + rate);
  };

  return pmt;
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
    if(!isNaN(currentPrincipal.value) &&!isNaN(currentMortgagePayment.value) && !isNaN(currentInterest.value) && !isNaN(currentExtraPayment.value) &&!isNaN(currentSavingsAmount.value) &&!isNaN(currentMonthlySavings.value) && currentMortgagePayment.value >= PMT(currentInterest.value/100/12,30*12,currentPrincipal,0,0))
      return true;
    else{
      return false;
    }
  }
  function compute() {
    console.clear();
    const paymentsPending=getTerm(Number(currentPrincipal.value),Number(currentMortgagePayment.value),Number(currentInterest.value),Number(currentExtraPayment.value),Number(currentSavingsAmount.value),Number(currentMonthlySavings.value));
      

    document.getElementById("dueMonth").innerHTML = addMonthsToDate(paymentsPending).toLocaleString('en-US', { month: 'short' });
    
    document.getElementById("dueYear").innerHTML = addMonthsToDate(paymentsPending).getFullYear();

    const futureSavings = currentSavingsAmount.value + paymentsPending*currentMonthlySavings.value;

    if(futureSavings>0){
      document.getElementById("outputText3").innerHTML = "You could pay your mortgage on: "
    }
    else{
          document.getElementById("outputText3").innerHTML = "You will pay your mortgage on: "
        }  
  }

  function getTerm(principal,monthlyPayment,interest,extra,savingAmount,monthlySavings){
    let term = 0;
    let projectedSavings=savingAmount;
    
    function mortgageTerm(principalInput,monthlyPaymentInput,interestInput,extraInput,projectedSavings){
      

        if(monthlyPaymentInput-principalInput<=monthlyPaymentInput && principalInput>= projectedSavings){
            principalInput-=(extraInput+monthlyPaymentInput-(principalInput*interestInput/100/12).toFixed(2));
            
            term+=1;
            projectedSavings+=monthlySavings;

            console.log(term + "=>" + principalInput.toFixed(2) + "=>" + projectedSavings);

            return mortgageTerm(principalInput,monthlyPaymentInput,interestInput,extraInput,projectedSavings);
        }
        else{
            return term;
        }
    }

    return mortgageTerm(principal,monthlyPayment,interest,extra,projectedSavings);     
}

function completionNumber(paymentQty) {
  if(paymentQty===0) {
    return 100;
  }
  else{
      return Math.round(100-(paymentQty/360)*100);
    }
}

// function addMonthsToDate(monthsToAdd) {

//   if (!Number.isInteger(monthsToAdd)) {
//     throw new Error('Months should be an integer');
//   }

//   // Clone the input date to avoid modifying the original date
//   const resultDate = new Date;

//   // Calculate the new date
//   resultDate.setMonth(resultDate.getMonth() + monthsToAdd+1);
//   resultDate.setDate(0); // Set the day to the last day of the previous month

//   return resultDate;
// }

function inputByButton(buttonID){
  //Get ID of Button pressed
  const buttonName=buttonID;
  //Identify variable and slider to update
   let variableToUpdate;
   let sliderToUpdate;
   let userPrompt;
  if(buttonName==="mortgageAmount"){
    variableToUpdate=principal;
    sliderToUpdate=currentPrincipal;
    userPrompt="Please enter current loan amount to the nearest thousand."
  }
  else if(buttonName==="monthlyPayment"){
    variableToUpdate=monthlyPayment;
    sliderToUpdate=currentMortgagePayment;
    userPrompt="Please enter current monthly payment to the nearest multiple of 10."
  }
  else if(buttonName==="mortgageInterest"){
    variableToUpdate=interest;
    sliderToUpdate=currentInterest;
    userPrompt="Please enter loan interest truncated to 2 decimal places."
  }
  else if(buttonName==="mortgageExtra"){
    variableToUpdate=extra;
    sliderToUpdate=currentExtraPayment;
    userPrompt="Please enter current monthly payment to the nearest multiple of 10."
  }
  else if(buttonName==="currentSavings"){
    variableToUpdate=currentSavings;
    sliderToUpdate=currentSavingsAmount;
    userPrompt="Please enter current savings amount to the nearest multiple of 10."
  }
  else if(buttonName==="savings"){
    variableToUpdate=savings;
    sliderToUpdate=currentMonthlySavings;
    userPrompt="Please enter monthly saving amount to the nearest multiple of 10."
  }
  //Store previous value
  let previousValue = sliderToUpdate.value;
  //Get current value
  let proposedValue = Number(prompt(userPrompt, sliderToUpdate.value));
  console.log(proposedValue);
  //Check proposed value
  if(proposedValue != 0 && proposedValue>=sliderToUpdate.min && proposedValue<=sliderToUpdate.max){
    sliderToUpdate.value = proposedValue;
    
    //Format Value and assign as button text
    if(buttonName==="mortgageInterest"){
      document.getElementById(buttonName).innerHTML=percentageFormat(sliderToUpdate.value)
    }
    else{
      document.getElementById(buttonName).innerHTML=currencyFormat(sliderToUpdate.value);
    }
    //Refresh Calculation
    if(inputValidation) { 
      compute();
      }      
  }
  else if(proposedValue===0){
    //Format Value and assign as button text
    if(buttonName==="mortgageExtra" || buttonName==="currentSavings" || buttonName==="savings"){
      document.getElementById(buttonName).innerHTML=currencyFormat(0);
    }
  }
  else{
    alert("Invalid Input. Try again.")
  }

}

function addMonthsToDate(monthsToAdd) {

  if (!Number.isInteger(monthsToAdd)) {
    throw new Error('Months should be an integer');
  }

  let tempDate = new Date();
  let yearOffset = monthsToAdd/12;
  let monthOffset = monthsToAdd%12;
  const newDate = new Date(tempDate.getFullYear()+yearOffset, tempDate.getMonth()+monthOffset);
  return newDate;
}

 
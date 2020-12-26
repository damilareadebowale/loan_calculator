// Here's to listen for submit event
document.getElementById('loan-params').addEventListener('submit', function(e){
    // Hide results
    document.getElementById('results').style.display = 'none';
    // show spinner
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});
// Calculate Results
function calculateResults(){
    // console.log('running calculations');
    // UI Vars
    const amountBorrowed = document.getElementById('amount');
    const interestRate = document.getElementById('interest');
    const yearsToRepay = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    // Converting all to numbers with parsefloat
    const principal = parseFloat(amountBorrowed.value);
    const calculatedInterest = parseFloat(interestRate.value) /100 /12;
    const calculatedYears = parseFloat(yearsToRepay.value) * 12;
    // Monthly payment
    const constant = Math.pow(1 + calculatedInterest, calculatedYears);
    const amountToPay = (principal * calculatedInterest * constant)/(constant - 1);
    // console.log(amountToPay);
    // To check if the number is a legal number and fixed to two decimal
    if(isFinite(amountToPay)){
        monthlyPayment.value = amountToPay.toFixed(2);
        totalPayment.value = (amountToPay * calculatedYears).toFixed(2);
        totalInterest.value = ((amountToPay * calculatedYears) - principal).toFixed(2);
        // Show results
        document.getElementById('results').style.display = 'block';
        // Hide spinner
        document.getElementById('loading').style.display = 'none';
    } else {
        // console.log('Error in numbers');
        showError('Please check your numbers');
    }
}
// showError function
function showError(error){
    // Hide spinner
    document.getElementById('loading').style.display = 'none';
    // Replacing the heading with the error message
    const errDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // Add class
    errDiv.className = 'alert alert-danger';
    errDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errDiv, heading);
    // Remove error message
    setTimeout(removeError, 3000);
}
// removeError function
function removeError(){
    document.querySelector('.alert').remove();
}
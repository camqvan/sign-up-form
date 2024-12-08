const form = document.getElementById('signup-form');
const inputFields = document.querySelectorAll('input');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('confirm-password');
const email = document.getElementById('mail');
const phone = document.getElementById('phone');

// Handles the validation of the input fields
function handleValidation(input, errorField, isValid, message) {
  if (isValid) {
    errorField.textContent = ''; // Clear the error message if the input is valid
    errorField.classList.remove('visible'); // Remove the visible class
    input.classList.remove('invalid'); // Remove the invalid class
    input.classList.add('valid'); // Add valid class
  } else {
    errorField.textContent = message; // Set the error message if the input is invalid
    errorField.classList.add('visible'); // Add the visible class
    input.classList.add('invalid'); // Add the invalid class
    input.classList.remove('valid'); // Remove the valid class
  }
}

// Validation functions
function validateRequired(input) {
  const errorField = input.parentElement.querySelector('.error');
  const isValid = input.value.trim() !== ''; // Check if the input is not empty
  handleValidation(input, errorField, isValid, '*This field is required'); // Call handleValidation with the appropriate parameters
  return isValid;
}

function validateName(input) {
  const errorField = input.parentElement.querySelector('.error');
  const isValid =
    /^[a-zA-Z]+$/.test(input.value.trim()) && input.value.trim().length >= 2; // Check if the input is alphabetic and at least 2 characters long
  handleValidation(
    input,
    errorField,
    isValid,
    '*Name cannot contain numbers, symbols, or be empty.'
  );
  return isValid;
}

function validateEmail(input) {
  const errorField = input.parentElement.querySelector('.error');
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()); // Check if the input is a valid email address
  handleValidation(
    input,
    errorField,
    isValid,
    '*Please enter a valid email address.'
  );
  return isValid;
}

function validatePhone(input) {
  const errorField = input.parentElement.querySelector('.error');
  const isValid = /^\d{10}$/.test(input.value.trim()); // Check if the input is a 10-digit number
  handleValidation(
    input,
    errorField,
    isValid,
    '*Phone number must be 10 digits.'
  );
  return isValid;
}

function validatePassword(input) {
  const errorField = input.parentElement.querySelector('#password-error');
  const isValid =
    input.value.trim().length >= 8 && input.value.trim().length <= 15; // Check if the input is at least 8 characters long and at most 15 characters long
  handleValidation(
    input,
    errorField,
    isValid,
    '*Password must be at least 8 characters long.'
  );
  return isValid;
}

function validatePasswordConfirm(input) {
  const errorField = input.parentElement.querySelector(
    '#confirm-password-error'
  );
  const isValid = input.value === password.value;
  handleValidation(input, errorField, isValid, '*Passwords do not match.');
  return isValid;
}

// Attaches the validation functions to the input fields
inputFields.forEach(input => {
  input.addEventListener('input', () => {
    if (input.id === 'first-name' || input.id === 'last-name')
      validateName(input);
    else if (input.id === 'mail') validateEmail(input);
    else if (input.id === 'phone') validatePhone(input);
    else if (input.id === 'password') validatePassword(input);
    else if (input.id === 'confirm-password') validatePasswordConfirm(input);
    else if (input.id === 'required') validateRequired(input);
  });
});

// Handles the submission of the form
form.addEventListener('submit', event => {
  event.preventDefault();

  let isFormValid = true;

  // Validate the form fields
  inputFields.forEach(input => {
    if (input.id === 'first-name' || input.id === 'last-name')
      isFormValid = validateName(input) && isFormValid;
    else if (input.id === 'mail')
      isFormValid = validateEmail(input) && isFormValid;
    else if (input.id === 'phone')
      isFormValid = validatePhone(input) && isFormValid;
    else if (input.id === 'password')
      isFormValid = validatePassword(input) && isFormValid;
    else if (input.id === 'confirm-password')
      isFormValid = validatePasswordConfirm(input) && isFormValid;
    else isFormValid = validateRequired(input) && isFormValid;
  });

  // If the form is valid, submit it
  if (isFormValid) {
    alert('Form submitted successfully');
    form.reset();
    inputFields.forEach(input => {
      input.classList.remove('valid', 'invalid');
    });
  }
});

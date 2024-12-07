// Select required elements
const form = document.getElementById('signup-form');
const inputFields = document.querySelectorAll('input');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('confirm-password');
const email = document.getElementById('mail');
const phone = document.getElementById('phone');

// Utility function to handle validation
function handleValidation(input, errorField, isValid, message) {
  if (isValid) {
    errorField.textContent = ''; // Clear error message
    errorField.style.display = 'none'; // Hide error message
    input.classList.remove('invalid');
    input.classList.add('valid');
  } else {
    errorField.textContent = message; // Show error message
    errorField.style.display = 'block'; // Display error message
    input.classList.add('invalid');
    input.classList.remove('valid');
  }
}

// Validation functions
function validateRequired(input) {
  const errorField = input.parentElement.querySelector('.error');
  const isValid = input.value.trim() !== '';
  handleValidation(input, errorField, isValid, '*This field is required.');
  return isValid;
}

function validateName(input) {
  const errorField = input.parentElement.querySelector('.error');
  const isValid =
    /^[A-Za-z\s]+$/.test(input.value.trim()) && input.value.trim() !== '';
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
  const isValid = input.value.includes('@') && input.value.includes('.com');
  handleValidation(
    input,
    errorField,
    isValid,
    '*Please provide a valid email.'
  );
  return isValid;
}

function validatePhone(input) {
  const errorField = input.parentElement.querySelector('.error');
  const isValid = /^\d+$/.test(input.value);
  handleValidation(
    input,
    errorField,
    isValid,
    '*Please enter a valid phone number.'
  );
  return isValid;
}

function validatePassword(input) {
  const errorField = document.getElementById('password-error');
  const isValid = input.value.length >= 8 && input.value.length <= 15;
  handleValidation(
    input,
    errorField,
    isValid,
    '*Password must be between 8 and 15 characters long.'
  );
  return isValid;
}

function validatePasswordConfirm(input) {
  const errorField = document.getElementById('confirm-password-error');
  const isValid = input.value === password.value;
  handleValidation(input, errorField, isValid, '*Passwords do not match.');
  return isValid;
}

// Attach event listeners for real-time validation
inputFields.forEach(input => {
  input.addEventListener('input', () => {
    if (input.id === 'first-name' || input.id === 'last-name')
      validateName(input);
    else if (input.id === 'mail') validateEmail(input);
    else if (input.id === 'phone') validatePhone(input);
    else if (input.id === 'password') validatePassword(input);
    else if (input.id === 'confirm-password') validatePasswordConfirm(input);
    else validateRequired(input);
  });
});

// Form submission handler
form.addEventListener('submit', e => {
  e.preventDefault();

  let isFormValid = true;

  // Validate all fields
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

  // If the form is valid, simulate successful submission
  if (isFormValid) {
    alert('Form submitted successfully!');
    form.reset();
    inputFields.forEach(input => input.classList.remove('valid', 'invalid')); // Reset styles
  }
});

// Real-time validation for inputs
document
  .getElementById('signup-form')
  .addEventListener('input', function (event) {
    // Get the input field triggering the event
    const input = event.target;

    // Validate the input based on its constraints
    if (input.checkValidity()) {
      input.classList.remove('invalid');
    } else {
      input.classList.add('invalid');
    }
  });

// Validate on form submission
document
  .getElementById('signup-form')
  .addEventListener('submit', function (event) {
    // Prevent form submission
    event.preventDefault();

    // Get password fields
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    // Get error messages
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById(
      'confirm-password-error'
    );

    let isValid = true;

    // Check if password meets minlength requirement
    if (password.value.length < 8) {
      passwordError.style.display = 'block';
      isValid = false;
      console.log(password.value.length);
    } else {
      passwordError.style.display = 'none';
    }

    // Check if passwords match
    if (password.value !== confirmPassword.value) {
      confirmPasswordError.style.display = 'block';
      isValid = false;
    } else {
      confirmPasswordError.style.display = 'none';
    }

    // If all validations pass, submit the form
    if (isValid) {
      alert('Form submitted successfully');
    }
  });

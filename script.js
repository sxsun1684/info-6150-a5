// Get references to form elements
const form = document.getElementById('pizzaForm');
const usResident = document.getElementById('usResident');
const zipContainer = document.getElementById('zipContainer');
const resultMsg = document.getElementById('resultMsg');

// Toggle ZIP code field visibility based on US resident checkbox
usResident.addEventListener('change', () => {
    zipContainer.hidden = !usResident.checked;
});

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent default form submission
    clearErrors();      // clear any previous error messages
    resultMsg.textContent = '';
    resultMsg.classList.remove('accepted');

    // Collect and sanitize form inputs
    const name = document.getElementById('name').value.trim();
    const year = parseInt(document.getElementById('year').value);
    const password = document.getElementById('password').value;
    const zipcode = document.getElementById('zipcode').value.trim();
    const pizza = document.querySelector('input[name="pizza"]:checked');
    const currentYear = new Date().getFullYear();
    let valid = true;

    // Validate name
    if (name.length < 3) {
        showError('nameError', 'Name must be 3 or more characters.');
        valid = false;
    }

    // Validate birth year
    if (isNaN(year) || year <= 1900 || year >= currentYear) {
        showError('yearError', `Year must be between 1900 and ${currentYear - 1}.`);
        valid = false;
    }

    // Validate ZIP code only if user is a US resident
    if (usResident.checked) {
        if (!/^[0-9]{5}$/.test(zipcode)) {
            showError('zipError', 'Zipcode must be exactly 5 digits.');
            valid = false;
        }
    }

    // Validate password length
    if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters.');
        valid = false;
    }

    // Check if a pizza option is selected
    if (!pizza) {
        showError('pizzaError', 'Please select your pizza preference.');
        valid = false;
    }

    // If all fields pass validation
    if (valid) {
        resultMsg.textContent = 'Accepted! Your pizza is on the way!';
        resultMsg.classList.add('accepted');
        form.reset();
        zipContainer.hidden = true; // hide ZIP code field again
    }
});

// Display a specific error message by element ID
function showError(id, msg) {
    document.getElementById(id).textContent = msg;
}

// Clear all error message elements
function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

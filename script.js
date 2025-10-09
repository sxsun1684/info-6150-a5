const form = document.getElementById('pizzaForm');
const usResident = document.getElementById('usResident');
const zipContainer = document.getElementById('zipContainer');
const resultMsg = document.getElementById('resultMsg');

usResident.addEventListener('change', () => {
    zipContainer.hidden = !usResident.checked;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    resultMsg.textContent = '';
    resultMsg.classList.remove('accepted');

    const name = document.getElementById('name').value.trim();
    const year = parseInt(document.getElementById('year').value);
    const password = document.getElementById('password').value;
    const zipcode = document.getElementById('zipcode').value.trim();
    const pizza = document.querySelector('input[name="pizza"]:checked');
    const currentYear = new Date().getFullYear();
    let valid = true;

    if (name.length < 3) {
        showError('nameError', 'Name must be at least 3 characters.');
        valid = false;
    }

    if (isNaN(year) || year <= 1900 || year >= currentYear) {
        showError('yearError', `Year must be between 1900 and ${currentYear - 1}.`);
        valid = false;
    }

    if (usResident.checked) {
        if (!/^[0-9]{5}$/.test(zipcode)) {
            showError('zipError', 'Zipcode must be exactly 5 digits.');
            valid = false;
        }
    }

    if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters.');
        valid = false;
    }

    if (!pizza) {
        showError('pizzaError', 'Please select your pizza preference.');
        valid = false;
    }

    if (valid) {
        resultMsg.textContent = 'Accepted Your pizza is on the way!';
        resultMsg.classList.add('accepted');
        form.reset();
        zipContainer.hidden = true;
    }
});

function showError(id, msg) {
    document.getElementById(id).textContent = msg;
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

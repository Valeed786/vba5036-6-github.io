// Function to validate individual form fields
function validate(obj) {
    const errorElement = document.getElementById(obj.id + '-error');
    let isValid = true;
    let errorMessage = '';

    // Reset error styling
    obj.classList.remove('is-invalid');
    obj.classList.remove('is-valid');
    errorElement.textContent = '';

    if (obj.value.trim() === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else {
        switch (obj.id) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(obj.value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'password':
                if (obj.value.length < 8) {
                    isValid = false;
                    errorMessage = 'Password must be at least 8 characters long';
                }
                break;
            case 'confirm-password':
                const password = document.getElementById('password').value;
                if (obj.value !== password) {
                    isValid = false;
                    errorMessage = 'Passwords do not match';
                }
                break;
        }
    }

    if (!isValid) {
        obj.classList.add('is-invalid');
        errorElement.textContent = errorMessage;
    } else {
        obj.classList.add('is-valid');
    }

    return isValid;
}

// Function to create and display JSON
function createFormJSON() {
    const jsonDisplay = document.getElementById('json-output');
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        timestamp: new Date().toISOString()
    };

    jsonDisplay.style.display = 'block';
    jsonDisplay.textContent = JSON.stringify(formData, null, 2);

    return formData;
}

// Function to validate the entire form
function validateForm(event) {
    event.preventDefault();
    const fields = ['username', 'email', 'password', 'confirm-password'];
    let isValid = true;

    fields.forEach(field => {
        if (!validate(document.getElementById(field))) {
            isValid = false;
        }
    });

    if (isValid) {
        const jsonData = createFormJSON();
        console.log('Form data:', jsonData);
    }
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', validateForm);

        const fields = ['username', 'email', 'password', 'confirm-password'];
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('blur', function() {
                    validate(this);
                });
            }
        });
    }
});
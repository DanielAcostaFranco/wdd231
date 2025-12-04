let usernameEl = document.querySelector('#username');
let emailEl = document.querySelector('#email');
let passwordEl = document.querySelector('#password');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

const formElement = document.forms[0];
let isValid = true;

usernameEl.addEventListener('input', usernameVal);
emailEl.addEventListener('input', emailVal);
passwordEl.addEventListener('input', passwordVal);
function usernameVal() {
    // Username Validation
    let username = usernameEl.value;
    if (username.length < 6 || username.length > 15) {
        usernameError.textContent = "Username must be 6-15 characters long.";
        isValid = false;
    } else {
        usernameError.textContent = "";
        isValid = true;
        usernameEl.value = sanitizeString(username);
    }

};
function emailVal() {
    // Email Validation
    const email = emailEl.value;
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    } else {
        emailError.textContent = "";
        isValid = true;
    }
}
function passwordVal() {
    // Password Validation
    const password = passwordEl.value;
    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters long.";
        isValid = false;
    } else {
        passwordError.textContent = "";
        isValid = true;
    }
}

formElement.addEventListener('submit', function (e) {
    // stop the form from doing the default action.
    if (!isValid) {
        e.preventDefault();
    }
});
function sanitizeString(input) {
    console.log(input);
    let sanitized = '';
    // Loop through each character in the string
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        switch (char) {
            case '<':
                sanitized += '&lt;';
                break;
            case '>':
                sanitized += '&gt;';
                break;
            case '"':
                sanitized += '&quot;';
                break;
            case "'":
                sanitized += '&#39;';
                break;
            case '&':
                sanitized += '&amp;';
                break;
            default:
                sanitized += char;
        }
    }
    console.log(sanitized);
    return sanitized;
}
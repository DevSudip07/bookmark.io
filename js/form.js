const signUpForm = document.querySelector('.signUp');
const loginForm = document.querySelector('.login');
const loginButton = document.querySelector('.login-btn');
const signUpButton = document.querySelector('.signUp-btn');
const signUpText = document.querySelector('.signUp-text');
const loginText = document.querySelector('.login-text');
const emailInput = document.querySelector('.email');
const emailWarn = document.querySelector('.email-warn');
const passWarn = document.querySelector('.pass-warn');
const form = document.querySelector('.form-bg');
const closeIcon = document.querySelector('.close-icon');

closeIcon.addEventListener('click', ()=> {
    form.style.zIndex = '-99';
    nav.style.opacity = '100%';
})

signUpText.addEventListener('click', () => {
    loginForm.style.opacity = '0%';
    loginForm.style.zIndex = '-99';
});

loginText.addEventListener('click', () => {
    loginForm.style.opacity = '100%';
    loginForm.style.zIndex = '99';
});



// 🔍 Eye icon for the password input fields
const eyeIcon = document.querySelector('.eye-icon');
const password = document.querySelector('.password');
const confirmPassword = document.querySelector('.conPassword');
eyeIcon.addEventListener('click', () => {
    if (password.type === 'password' && confirmPassword.type === 'password') {
        password.type = 'text';
        confirmPassword.type = 'text';
        eyeIcon.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        password.type = 'password';
        confirmPassword.type = 'password';
        eyeIcon.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
});

const loginEyeIcon = document.querySelector('.login-eye');
loginEyeIcon.addEventListener('click', () => {
    if (userPassword.type === 'password') {
        userPassword.type = 'text';
        loginEyeIcon.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        userPassword.type = 'password';
        loginEyeIcon.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
});

// 🔍 Check two passwords are same only for sign up page

password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validatePassword);

function validatePassword() {
    if (password.value !== confirmPassword.value) {
        passWarn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please enter the same password';
        signUpButton.disabled = true; 
    } else {
        passWarn.innerHTML = "";
        signUpButton.disabled = false; 
    }
};

// ✨ Sign-up Form Submission
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get input values
    const names = document.querySelector('.name').value;
    const number = document.querySelector('.number').value;
    const email = emailInput.value;
    const password = document.querySelector('.password').value;
    const confirmPassword = document.querySelector('.conPassword').value;

    // Validate input fields
    if (names && number && email && password && confirmPassword) {
        // Create user data object
        const userData = {
            username: names,
            number: number,
            email: email,
            password: password,
        };
        // Convert object to JSON and store in localStorage
        localStorage.setItem(email, JSON.stringify(userData));
        // Show success message
        signUpButton.innerHTML = 'Account Created Successfully <i class="fa-solid fa-circle-check"></i>';
        // Reset form after 3 seconds
        setTimeout(() => {
            signUpButton.innerHTML = 'Sign Up';
            signUpForm.reset();
        }, 3000);

    } else {
        alert('❌ Please fill in all fields.'); // Alert user to fill all fields
    }
});

// 🔍 Check if email already exists in localStorage
emailInput.addEventListener('input', function () {
    const email = emailInput.value;

    if (localStorage.getItem(email) != null) {
        emailWarn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> The email already exist...'; // Show warning message
        signUpButton.disabled = true; // Disable sign-up button
    } else {
        emailWarn.innerHTML = ''; // Hide warning message
        signUpButton.disabled = false; // Enable sign-up button
    }
});

// 🔍Match the password
const userPassword = document.querySelector('.userPassword');
emailInput.addEventListener('input', function () {
    const email = emailInput.value;

    if (localStorage.getItem(email) != null) {
        emailWarn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> The email already exist...'; // Show warning message
        signUpButton.disabled = true; // Disable sign-up button
    } else {
        emailWarn.innerHTML = ''; // Hide warning message
        signUpButton.disabled = false; // Enable sign-up button
    }
});


// 🔐 Login Form Submission
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload

    // Get user input values
    const userEmail = document.querySelector('.userEmail').value;
    const userPassword = document.querySelector('.userPassword').value;
    const emailWarn = document.querySelector('.login-email-warn');
    const passWarn = document.querySelector('.login-pass-warn');
    // Check if email exists in localStorage
    if (!localStorage.getItem(userEmail)) {
        emailWarn.innerHTML = '❌ This email does not exist! Please sign up first.';
        // alert('');
        // return;
    }

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem(userEmail));

    // Check if email and password match
    if (userEmail !== userData.email) {
        emailWarn.innerHTML = '❌ This email does not exist! Please sign up first.';
        // alert('✅ Login Successful! Redirecting...');
    } else if ( userPassword !== userData.password) {
        passWarn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>  The password is wrong...';
        // alert('❌ Invalid Email or Password!'); // Show error message
    }else {
        window.location.href = 'home.html';
    }
});

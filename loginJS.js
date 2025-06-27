document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send data to your backend
        console.log('Login attempt with:', {email, password, rememberMe});
        
        // For demo purposes, we'll simulate a successful login
        simulateLogin();
    });
    
    function simulateLogin() {
        // Show loading state
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to homepage after successful login
            window.location.href = 'projectttHtml.html';
        }, 1500);
    }
    
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'projectttHtml.html';
    }
});

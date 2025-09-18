// SecureVault Authentication System
// Version 2.1.3 - Enhanced Security Module

// Security configuration
const config = {
    maxAttempts: 5,
    lockoutTime: 300000, // 5 minutes
    sessionTimeout: 3600000 // 1 hour
};

// Initialize login attempt counter
let loginAttempts = 0;

// Authentication hash components (for enhanced security)
// Note: Hash is split for additional security measures
const part1 = "5f4dcc3b5aa76";
const part2 = "5d61d8327deb882cf99";
const correctHash = part1 + part2;

// Expected username (provided to participants)
const expectedUsername = "admin"; // Username is given, password must be discovered

// Simple MD5 hash function for client-side validation
// Note: In production, always use server-side authentication
function simpleHash(str) {
    // This is a placeholder - in real implementation, use proper hashing
    // For this challenge, we'll directly compare with the pre-computed hash
    return md5(str);
}

// Validate login credentials
function validateLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');
    
    // Clear previous error messages
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
    
    // Check if account is locked
    if (loginAttempts >= config.maxAttempts) {
        showError('Account temporarily locked. Please try again later.');
        return false;
    }
    
    // Increment login attempts
    loginAttempts++;
    
    // Validate username (pre-filled, but still validate)
    if (username !== expectedUsername) {
        showError('Username field has been modified. Please refresh the page.');
        return false;
    }
    
    // Generate hash of entered password for comparison
    const enteredPasswordHash = md5(password);
    
    // Compare with stored hash
    if (enteredPasswordHash === correctHash) {
        // Authentication successful
        console.log('Authentication successful for user:', username);
        
        // Set session storage
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('loginTime', new Date().getTime());
        
        // Redirect to secure area
        window.location.href = 'flag.html';
        return true;
    } else {
        // Authentication failed
        showError(`Invalid password. Attempts remaining: ${config.maxAttempts - loginAttempts}`);
        logFailedAttempt(username, 'Invalid password');
        
        if (loginAttempts >= config.maxAttempts) {
            showError('Maximum login attempts exceeded. Account locked.');
            setTimeout(() => {
                loginAttempts = 0; // Reset after lockout period
            }, config.lockoutTime);
        }
        
        return false;
    }
}

// Display error message
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Log failed login attempts (for security monitoring)
function logFailedAttempt(username, reason) {
    const timestamp = new Date().toISOString();
    console.warn(`Failed login attempt: ${username} at ${timestamp} - Reason: ${reason}`);
    
    // In production, this would send to a security monitoring system
    const failedAttempts = JSON.parse(localStorage.getItem('failedAttempts') || '[]');
    failedAttempts.push({
        username: username,
        timestamp: timestamp,
        reason: reason,
        ip: 'localhost' // In production, get real IP
    });
    
    // Keep only last 50 failed attempts
    if (failedAttempts.length > 50) {
        failedAttempts.splice(0, failedAttempts.length - 50);
    }
    
    localStorage.setItem('failedAttempts', JSON.stringify(failedAttempts));
}

// Check session validity
function checkSession() {
    const authenticated = sessionStorage.getItem('authenticated');
    const loginTime = sessionStorage.getItem('loginTime');
    
    if (authenticated === 'true' && loginTime) {
        const currentTime = new Date().getTime();
        const sessionAge = currentTime - parseInt(loginTime);
        
        if (sessionAge > config.sessionTimeout) {
            // Session expired
            sessionStorage.clear();
            return false;
        }
        return true;
    }
    return false;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (checkSession()) {
        window.location.href = 'flag.html';
    }
    
    // Add some visual feedback
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add enter key support
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('loginForm').dispatchEvent(new Event('submit'));
        }
    });
});

// Security notice in console
console.log('%c🔒 SecureVault Security Notice', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
console.log('%cThis application implements advanced security measures.', 'color: #666; font-size: 12px;');
console.log('%cAll authentication attempts are logged and monitored.', 'color: #666; font-size: 12px;');

// Simple MD5 implementation for the challenge
// Note: This is for educational purposes only
function md5(string) {
    // For simplicity, we'll use a basic lookup for the specific password
    // In a real application, use a proper crypto library
    const md5Hashes = {
        'password': '5f4dcc3b5aa765d61d8327deb882cf99',
        'admin': '21232f297a57a5a743894a0e4a801fc3',
        '123456': 'e10adc3949ba59abbe56e057f20f883e',
        'test': '098f6bcd4621d373cade4e832627b4f6'
    };
    
    return md5Hashes[string] || '';
}
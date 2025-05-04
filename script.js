function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'neon';
    html.setAttribute('data-theme', currentTheme === 'neon' ? 'light' : 'neon');
    localStorage.setItem('theme', html.getAttribute('data-theme'));
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', savedTheme || 'neon');
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
});

// Sample Tabs Switching
const tabButtons = document.querySelectorAll('.tab-button');
const sampleContents = document.querySelectorAll('.sample-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        sampleContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const genre = button.getAttribute('data-genre');
        const targetContent = document.getElementById(`${genre}-sample`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Pricing Toggle
const billingToggle = document.getElementById('billing-toggle');
const pricingCards = document.querySelectorAll('.pricing-card');

billingToggle.addEventListener('change', () => {
    const isAnnual = billingToggle.checked;
    pricingCards.forEach(card => {
        const priceElement = card.querySelector('.price');
        const monthlyPrice = parseFloat(priceElement.dataset.monthly);
        const annualPrice = parseFloat(priceElement.dataset.annual);
        priceElement.innerHTML = `$${isAnnual ? annualPrice : monthlyPrice}<span>/${isAnnual ? 'year' : 'month'}</span>`;
    });
});

// Initialize pricing data (set data attributes for monthly/annual prices)
pricingCards.forEach(card => {
    const priceElement = card.querySelector('.price');
    const monthlyPrice = priceElement.textContent.match(/[\d.]+/)[0];
    const annualPrice = (monthlyPrice * 12 * 0.8).toFixed(2); // 20% discount for annual
    priceElement.dataset.monthly = monthlyPrice;
    priceElement.dataset.annual = annualPrice;
});

// Cookie Banner
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieSettings = document.getElementById('cookieSettings');

if (!localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'flex';
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
});

cookieSettings.addEventListener('click', () => {
    alert('Customize your cookie preferences here. (Placeholder for settings modal)');
    // In a real implementation, this would open a modal for cookie preferences
});

// Testimonial Carousel
const testimonialCards = document.querySelectorAll('.testimonial-card');
const carousel = document.querySelector('.testimonial-carousel');
let currentIndex = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });
}

// Initialize carousel
showTestimonial(currentIndex);

// Add navigation dots
const dotsContainer = document.createElement('div');
dotsContainer.className = 'carousel-dots';
testimonialCards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
    dot.addEventListener('click', () => {
        currentIndex = i;
        showTestimonial(currentIndex);
        updateActiveDot();
    });
    dotsContainer.appendChild(dot);
});
carousel.appendChild(dotsContainer);

function updateActiveDot() {
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Auto-rotate carousel every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    showTestimonial(currentIndex);
    updateActiveDot();
}, 5000);

// Initialize first dot as active
updateActiveDot();

// Handle newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Subscribed with email: ${email}`);
    e.target.reset();
});

// Handle auth form submissions (login and register)
document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.querySelector('.auth-form');
    if (!authForm) return;

    // Helper function to generate a mock CSRF token (for demo; in production, get from server)
    function generateCsrfToken() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 32; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }

    // Helper function to sanitize input (basic XSS prevention)
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Helper function to validate non-empty fields
    function isFieldEmpty(value, fieldName) {
        const trimmed = value.trim();
        if (!trimmed) {
            alert(`Please enter a valid ${fieldName}.`);
            return true;
        }
        return false;
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address (e.g., user@example.com).');
            return false;
        }
        return true;
    }

    // Helper function to validate username (alphanumeric, underscore, hyphen)
    function isValidUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
        if (!usernameRegex.test(username)) {
            alert('Username must be 3-20 characters long and contain only letters, numbers, underscores, or hyphens.');
            return false;
        }
        return true;
    }

    // Helper function to validate password strength
    function isPasswordValid(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).');
            return false;
        }
        return true;
    }

    // Set CSRF token on form load
    const csrfInput = authForm.querySelector('#csrf_token');
    if (csrfInput) {
        csrfInput.value = generateCsrfToken();
    }

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formType = authForm.dataset.formType;
        const submitButton = authForm.querySelector('button[type="submit"]');

        // Disable submit button to prevent rapid submissions
        submitButton.disabled = true;
        setTimeout(() => {
            submitButton.disabled = false;
        }, 1000); // Re-enable after 1 second

        // Verify CSRF token (mock check; in production, validate on server)
        const csrfToken = authForm.querySelector('#csrf_token').value;
        if (!csrfToken || csrfToken.length !== 32) {
            alert('Invalid CSRF token. Please refresh the page and try again.');
            return;
        }

        if (formType === 'login') {
            const email = authForm.querySelector('#email').value;
            const password = authForm.querySelector('#password').value;

            // Validate non-empty fields
            if (isFieldEmpty(email, 'email') || isFieldEmpty(password, 'password')) {
                return;
            }

            // Validate email format
            if (!isValidEmail(email)) {
                return;
            }

            // Sanitize inputs
            const sanitizedEmail = sanitizeInput(email);
            const sanitizedPassword = sanitizeInput(password);

            alert(`Login successful!\nEmail: ${sanitizedEmail}\nPassword: [hidden for security]`);
            authForm.reset();
            // Reset CSRF token
            authForm.querySelector('#csrf_token').value = generateCsrfToken();
        } else if (formType === 'register') {
            const username = authForm.querySelector('#username').value;
            const email = authForm.querySelector('#email').value;
            const password = authForm.querySelector('#password').value;
            const confirmPassword = authForm.querySelector('#confirm-password').value;

            // Validate non-empty fields
            if (
                isFieldEmpty(username, 'username') ||
                isFieldEmpty(email, 'email') ||
                isFieldEmpty(password, 'password') ||
                isFieldEmpty(confirmPassword, 'confirm password')
            ) {
                return;
            }

            // Validate formats and strength
            if (!isValidUsername(username) || !isValidEmail(email) || !isPasswordValid(password)) {
                return;
            }

            // Validate password match
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            // Sanitize inputs
            const sanitizedUsername = sanitizeInput(username);
            const sanitizedEmail = sanitizeInput(email);

            alert(`Registration successful!\nUsername: ${sanitizedUsername}\nEmail: ${sanitizedEmail}`);
            authForm.reset();
            // Reset CSRF token
            authForm.querySelector('#csrf_token').value = generateCsrfToken();
        }
    });
});
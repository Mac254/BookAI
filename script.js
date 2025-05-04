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

    // Helper function to validate non-empty fields
    function isFieldEmpty(value, fieldName) {
        const trimmed = value.trim();
        if (!trimmed) {
            alert(`Please enter a valid ${fieldName}.`);
            return true;
        }
        return false;
    }

    // Helper function to validate password
    function isPasswordValid(password) {
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return false;
        }
        return true;
    }

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formType = authForm.dataset.formType;

        if (formType === 'login') {
            const email = authForm.querySelector('#email').value;
            const password = authForm.querySelector('#password').value;

            if (isFieldEmpty(email, 'email') || isFieldEmpty(password, 'password')) {
                return;
            }

            alert(`Login successful!\nEmail: ${email}\nPassword: ${password}`);
            authForm.reset();
        } else if (formType === 'register') {
            const username = authForm.querySelector('#username').value;
            const email = authForm.querySelector('#email').value;
            const password = authForm.querySelector('#password').value;
            const confirmPassword = authForm.querySelector('#confirm-password').value;

            if (
                isFieldEmpty(username, 'username') ||
                isFieldEmpty(email, 'email') ||
                isFieldEmpty(password, 'password') ||
                isFieldEmpty(confirmPassword, 'confirm password')
            ) {
                return;
            }

            if (!isPasswordValid(password)) {
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            alert(`Registration successful!\nUsername: ${username}\nEmail: ${email}`);
            authForm.reset();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark/Light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        });
    });

    // Initialize EmailJS
    (function() {
        emailjs.init("YOUR_USER_ID"); // Replace with your actual User ID
    })();

    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        emailjs.sendForm('service_fp69n1h', 'template_hjo3ba9', this, 'jD7GDZlTgU0kQTefj')
            .then(function() {
                console.log('SUCCESS!');
                showNotification('Message sent successfully!', 'success');
                contactForm.reset(); // Clear the form
            }, function(error) {
                console.log('FAILED...', error);
                showNotification('Failed to send message. Please try again.', 'error');
            })
            .finally(function() {
                // Re-enable submit button and restore original text
                submitButton.disabled = false;
                submitButton.textContent = 'Send';
            });
    });

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000); // Remove after 5 seconds
    }
});
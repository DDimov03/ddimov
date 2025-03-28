document.addEventListener('DOMContentLoaded', () => {
    const sideNav = document.querySelector('.side-nav');
    const mainContent = document.querySelector('.main-content');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    document.body.appendChild(hamburger);

    hamburger.addEventListener('click', () => {
        sideNav.classList.toggle('active');
        hamburger.classList.toggle('active');
        mainContent.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            sideNav.classList.remove('active');
            hamburger.classList.remove('active');
            mainContent.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !hamburger.contains(e.target)) {
            sideNav.classList.remove('active');
            hamburger.classList.remove('active');
            mainContent.classList.remove('menu-open');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px'
    });

    // Observe all sections and cards
    document.querySelectorAll('.section, .experience-card, .certificate-card, .education-card').forEach(element => {
        observer.observe(element);
    });

    // Theme Toggle Functionality
    function toggleDarkMode() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem("darkMode", !isDark);
        
        const themeButton = document.getElementById('theme-toggle-btn');
        const homeSection = document.getElementById('home');
        const allSections = document.querySelectorAll('.section.animate, .section, .main-content, .experience-card, .certificate-card, .education-card, .contact-section, #certificates, #experience, #education, #contact');
        
        if (!isDark) {
            themeButton.innerHTML = '☀️ Light Mode';
            document.body.style.backgroundColor = '#2c3e50';
            if (homeSection) {
                homeSection.style.backgroundColor = '#2c3e50';
            }
            // Update all sections and containers
            allSections.forEach(section => {
                section.style.backgroundColor = '#2c3e50';
            });
        } else {
            themeButton.innerHTML = '🌙 Dark Mode';
            document.body.style.backgroundColor = '#ffffff';
            if (homeSection) {
                homeSection.style.backgroundColor = '#ffffff';
            }
            // Update all sections and containers
            allSections.forEach(section => {
                section.style.backgroundColor = '#ffffff';
            });
        }
    }

    // Check for saved theme preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('theme-toggle-btn').innerHTML = '☀️ Light Mode';
        document.body.style.backgroundColor = '#2c3e50';
        const homeSection = document.getElementById('home');
        const allSections = document.querySelectorAll('.section.animate, .section, .main-content, .experience-card, .certificate-card, .education-card, .contact-section, #certificates, #experience, #education, #contact');
        if (homeSection) {
            homeSection.style.backgroundColor = '#2c3e50';
        }
        // Update all sections and containers
        allSections.forEach(section => {
            section.style.backgroundColor = '#2c3e50';
        });
    }
    
    // Add click event listener to theme toggle button
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleDarkMode);
});

// Initialize EmailJS
(function() {
    emailjs.init("QuGmmUafNkxFMWCy4"); //  key
})();

// Function to send email
async function sendEmail(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Hide any existing messages
    successMessage.style.display = 'none';
    successMessage.classList.remove('show');
    errorMessage.style.display = 'none';
    errorMessage.classList.remove('show');

    try {
        await emailjs.send(
            "service_d6zv5gs", // Replace with your EmailJS service ID
            "template_uorrtk6", // Replace with your EmailJS template ID
            {
                to_email: "denisdimov03@gmail.com",
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            }
        );

        // Show success message
        successMessage.style.display = 'block';
        setTimeout(() => successMessage.classList.add('show'), 10);
        
        // Reset form
        document.getElementById('contactForm').reset();

    } catch (error) {
        // Show error message
        errorMessage.style.display = 'block';
        setTimeout(() => errorMessage.classList.add('show'), 10);
        console.error('Failed to send email:', error);
    }

    // Remove loading state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;

    return false;
} 
// Theme toggle functionality
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = document.querySelector('#theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle event listener
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Initialize all functions
    initNavigation();
    initProjectFilters();
    initContactForm();
    initScrollAnimation();
    initSkillsAnimation();
});

// Navigation functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const header = document.querySelector('header');

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Transform hamburger to X
            const hamburger = menuToggle.querySelector('.hamburger');
            if (hamburger.classList.contains('active')) {
                hamburger.style.transform = 'rotate(0deg)';
                hamburger.style.background = 'transparent';
                hamburger.classList.remove('active');
            } else {
                hamburger.style.transform = 'rotate(45deg)';
                hamburger.style.background = 'transparent';
                hamburger.classList.add('active');
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                const hamburger = menuToggle.querySelector('.hamburger');
                hamburger.style.transform = 'rotate(0deg)';
                hamburger.style.background = 'var(--dark-color)';
                hamburger.classList.remove('active');
            }
        });
    });

    // Change header style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Project filtering functionality
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                // Show all items if filter is 'all'
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } 
                // Show only items that match the filter
                else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } 
                // Hide items that don't match the filter
                else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission)
            showFormMessage('Your message has been sent successfully!', 'success');
            contactForm.reset();
            
            // In a real application, you would send the form data to a server here
            // For example using fetch API or FormData
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show form messages
    function showFormMessage(message, type) {
        // Check if message element already exists
        let messageElement = document.querySelector('.form-message');
        
        // If not, create a new one
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.appendChild(messageElement);
        }
        
        // Set message content and style
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        
        // Add styles based on message type
        if (type === 'success') {
            messageElement.style.color = 'var(--success-color)';
            messageElement.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
        } else if (type === 'error') {
            messageElement.style.color = 'var(--danger-color)';
            messageElement.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
        }
        
        messageElement.style.padding = '10px';
        messageElement.style.borderRadius = 'var(--border-radius)';
        messageElement.style.marginTop = '15px';
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Scroll animation functionality
function initScrollAnimation() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.section-header, .about-content, .skill-item, .project-item, .contact-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
        // Add initial styles for animation
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add CSS class for animated elements
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
}

// Skills animation functionality
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if (skillsSection && progressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    // Reset width to 0 before animation
                    bar.style.width = '0';
                    
                    // Animate width to original value
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
                
                // Unobserve after animation is triggered
                observer.unobserve(skillsSection);
            }
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.querySelector('.hero-content h2');
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }
}

// Initialize typing animation after a short delay
setTimeout(initTypingAnimation, 1000);
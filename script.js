document.addEventListener('DOMContentLoaded', function() {
    // Set fixed viewport height
    function setViewportHeight() {
        // Get the viewport height and multiply by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the height initially
    setViewportHeight();
    
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navUl = document.querySelector('nav ul');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                setTimeout(() => {
                    navUl.style.display = 'none';
                }, 300); // Match this with the CSS transition time
            } else {
                navUl.style.display = 'flex';
                setTimeout(() => {
                    navUl.classList.add('active');
                }, 10); // Small delay to ensure display:flex is applied first
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navHeight = document.querySelector('nav').offsetHeight;
            
            // Close mobile nav if open
            if (navUl.classList.contains('active')) {
                mobileNavToggle.classList.remove('active');
                navUl.classList.remove('active');
                setTimeout(() => {
                    navUl.style.display = 'none';
                }, 300);
            }
            
            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    });

    // Handle order form submission
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                orderType: document.getElementById('order-type').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            
            // Clear the form
            orderForm.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message fade-in';
            successMessage.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Thank You!</h3>
                <p>Your order has been received. We'll get back to you shortly.</p>
            `;
            
            // Add success message to the page
            orderForm.style.display = 'none';
            orderForm.parentNode.insertBefore(successMessage, orderForm.nextSibling);
        });
    }

    // Add active class to navigation items on scroll
    function updateActiveNavItem() {
        const scrollPosition = window.scrollY;
        const navHeight = document.querySelector('nav').offsetHeight;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 20;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }

    // Initial call to set active nav item
    updateActiveNavItem();
    
    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);

    // Ensure all elements are visible on page load
    function showAllElements() {
        document.querySelectorAll('.section-card, .about-image, .about-text, .menu-images img').forEach(element => {
            element.classList.add('revealed');
        });
    }
    
    // Show all elements immediately to prevent disappearing on refresh
    showAllElements();
    
    // Add scroll animation to elements that come into view later
    function revealOnScroll() {
        const elements = document.querySelectorAll('.section-card:not(.revealed), .about-image:not(.revealed), .about-text:not(.revealed), .menu-images img:not(.revealed)');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add revealed class to CSS first
    const style = document.createElement('style');
    style.textContent = `
        .section-card, .about-image, .about-text, .menu-images img {
            opacity: 1;
            transform: translateY(0);
        }
        .mobile-nav-toggle.active span:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        .mobile-nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        .mobile-nav-toggle.active span:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
    
    // Reveal elements on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            if (scrollPosition < viewportHeight) {
                hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }
        }
    });
}); 
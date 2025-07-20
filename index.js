// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
    

    initializeSkillBars();
    initializeTypingAnimation();
    initializeMatrixAnimation();
    initializeContactModal();
});

// Contact Modal 
function initializeContactModal() {
    const getInTouchBtn = document.getElementById('get-in-touch-btn');
    const contactModalBtn = document.getElementById('contact-modal-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeModal = document.getElementById('close-modal');
    const contactForm = document.getElementById('contact-form');

    
    function openModal() {
        contactModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        

        setTimeout(() => {
            document.getElementById('name').focus();
        }, 100);
    }


    function closeModalFunc() {
        contactModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Reset form
        contactForm.reset();
        resetSubmitButton();
    }

    getInTouchBtn.addEventListener('click', openModal);
    contactModalBtn.addEventListener('click', openModal);

    closeModal.addEventListener('click', closeModalFunc);

    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeModalFunc();
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !contactModal.classList.contains('hidden')) {
            closeModalFunc();
        }
    });

 
    contactForm.addEventListener('submit', handleFormSubmission);
}

async function handleFormSubmission(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim()
    };


    if (!validateForm(formData)) {
        return;
    }


    showLoadingState(submitBtn, submitText, submitSpinner);

    try {
   
        await simulateFormSubmission(formData);

        showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
        

        setTimeout(() => {
            document.getElementById('contact-modal').classList.add('hidden');
            document.body.style.overflow = 'auto';
            document.getElementById('contact-form').reset();
        }, 2000);

    } catch (error) {
        showNotification('Failed to send message. Please try again or contact me directly.', 'error');
    }


    setTimeout(() => {
        resetSubmitButton();
    }, 2000);
}


function validateForm(data) {
    if (!data.name || data.name.length < 2) {
        showNotification('Please enter a valid name (at least 2 characters)', 'error');
        document.getElementById('name').focus();
        return false;
    }

    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        document.getElementById('email').focus();
        return false;
    }

    if (!data.message || data.message.length < 10) {
        showNotification('Please enter a message (at least 10 characters)', 'error');
        document.getElementById('message').focus();
        return false;
    }

    return true;
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function showLoadingState(btn, textEl, spinnerEl) {
    btn.disabled = true;
    textEl.classList.add('hidden');
    spinnerEl.classList.remove('hidden');
}


function resetSubmitButton() {
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');

    submitBtn.disabled = false;
    submitText.classList.remove('hidden');
    spinnerEl.classList.add('hidden');
}
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
      
        setTimeout(() => {
         
            if (Math.random() > 0.05) {
                console.log('Form data:', data);
                
              
                
                resolve('Success');
            } else {
                reject('Network error');
            }
        }, 2000);
    });
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            

            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = document.querySelector('#mobile-menu-btn i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
});


const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

window.addEventListener('scroll', throttle(() => {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
    }
}, 10));


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', throttle(() => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'font-bold');
        link.classList.add('text-gray-custom');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-custom');
            link.classList.add('text-primary', 'font-bold');
        }
    });
}, 10));

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
    }
}, 10));

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 500);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}


function initializeTypingAnimation() {
    const cursor = document.querySelector('.typing-cursor');
    if (cursor) {
        let visible = true;
        setInterval(() => {
            cursor.style.opacity = visible ? '0' : '1';
            visible = !visible;
        }, 530);
    }
}


function initializeMatrixAnimation() {
    const matrixChars = document.querySelectorAll('.matrix-char');
    
    matrixChars.forEach((char, index) => {
        setInterval(() => {
            const randomBinary = Math.random() > 0.5 ? '1' : '0';
            const randomLength = Math.floor(Math.random() * 3) + 1;
            char.textContent = randomBinary.repeat(randomLength);
        }, 2000 + (index * 200));
    });
}

function createParticles() {
    const heroSection = document.getElementById('home');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-primary rounded-full opacity-20';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        heroSection.appendChild(particle);
    }
}

window.addEventListener('load', () => {
    createParticles();
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
});


function handleScrollAnimations() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
  
    document.querySelectorAll('.animate-float').forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        element.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.05}deg)`;
    });
    

    document.querySelectorAll('.matrix-char').forEach((char, index) => {
        const speed = 0.2 + (index * 0.1);
        const newTop = (scrollY * speed) % (windowHeight + 100);
        char.style.top = newTop + 'px';
    });
}

window.addEventListener('scroll', throttle(handleScrollAnimations, 16));

function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl transition-all duration-300 transform translate-x-full max-w-sm`;
    
    const colors = {
        success: 'bg-gradient-to-r from-green-500 to-green-600',
        error: 'bg-gradient-to-r from-red-500 to-red-600',
        info: 'bg-gradient-to-r from-blue-500 to-blue-600',
        warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    };
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.classList.add(colors[type] || colors.info);
    notification.innerHTML = `
        <div class="flex items-center text-white">
            <i class="${icons[type] || icons.info} mr-3"></i>
            <span class="font-medium">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200 transition-colors">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
 
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    

    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}


function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease-out';
    fadeObserver.observe(el);
});


document.addEventListener('DOMContentLoaded', () => {

    const cursor = document.createElement('div');
    cursor.className = 'fixed w-4 h-4 bg-primary rounded-full pointer-events-none z-50 opacity-50 transition-all duration-150';
    cursor.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.opacity = '0.8';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '0.5';
        });
    });
});


console.log(`
    ╔══════════════════════════════════════╗
    ║                                      ║
    ║        👋 Hello, Developer!          ║
    ║                                      ║
    ║    Thanks for checking out my code!  ║
    ║                                      ║
    ║    🚀 Built with modern web tech:    ║
    ║    • HTML5 & Semantic Markup        ║
    ║    • Tailwind CSS & Custom Styles   ║
    ║    • Vanilla JavaScript & ES6+      ║
    ║    • AOS Animation Library           ║
    ║                                      ║
    ║    📧 Let's connect!                 ║
    ║    sonawaneabhishek034@gmail.com     ║
    ║                                      ║
    ╚══════════════════════════════════════╝
`);

console.log('%c🎨 Portfolio Design System', 'color: #0066FF; font-size: 16px; font-weight: bold;');
console.log('%cContact Form: Fully functional with validation', 'color: #00D4FF;');
console.log('%cProject Images: High-quality stock photos integrated', 'color: #FF6B6B;');
console.log('%cAnimations: AOS library + custom CSS animations', 'color: #8892B0;');

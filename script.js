// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.onclick = () => {
  navMenu.classList.toggle("active");
};

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll("#navMenu a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside (only on mobile)
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768 && navMenu.classList.contains("active")) {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  }
});

// Dark mode
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// Enhanced Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Observer for sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      // Once shown, stop observing to improve performance
      sectionObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer for individual elements (cards, items, etc.)
const elementObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      // Keep observing in case element goes out of view and comes back
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -30px 0px'
});

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
});

// Observe all animated elements
document.querySelectorAll('.slide-left, .slide-right, .slide-up, .fade-in').forEach(el => {
  elementObserver.observe(el);
});

// Observe all cards and items with staggered animation
document.querySelectorAll('.service-card, .project-card, .gallery-item, .feature-card, .stat-item').forEach(el => {
  elementObserver.observe(el);
});

// Show hero content immediately on load
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('show');
    }, 100);
  }
});

// Subtle parallax for background shapes
const bgShapes = document.querySelector('.bg-shapes');
if(bgShapes){
  let lastMove = 0;
  document.addEventListener('pointermove', e=>{
    const now = Date.now();
    if(now - lastMove < 16) return; // throttle ~60fps
    lastMove = now;
    const x = (e.clientX / window.innerWidth - 0.5) * 18; // small range
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    bgShapes.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
  // reset on leave
  document.addEventListener('mouseleave', ()=> bgShapes.style.transform = 'translate3d(0,0,0)');
}

// Contact Form - Redirect to WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    // WhatsApp number (from contact section)
    const whatsappNumber = '919655196558';
    
    // Format message for WhatsApp
    const whatsappMessage = `Hello! I'm interested in your services.

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}

*Message:*
${message}

---
Sent from Prism Land Surveyors website`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
  });
}

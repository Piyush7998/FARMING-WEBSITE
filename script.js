// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Tips Tab Switching
const tabButtons = document.querySelectorAll('.tab-button');
const tipPanels = document.querySelectorAll('.tip-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tipPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding panel
        const tabName = button.getAttribute('data-tab');
        const targetPanel = document.getElementById(`${tabName}-tips`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// Form Submission
const farmerForm = document.getElementById('farmerForm');

farmerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(farmerForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Show success message
    showNotification('Registration successful! We will contact you soon with personalized farming tips.', 'success');
    
    // Reset form
    farmerForm.reset();
    
    // In a real application, you would send this data to a server
    console.log('Form Data:', data);
});

// Notification Function
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-card, .tip-card, .schedule-card').forEach(el => {
    observer.observe(el);
});

// Form Input Animations
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add floating animation to service cards on hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'floatCard 2s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Add float animation style
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatCard {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(floatStyle);

// Dynamic Schedule Update (Example - can be connected to backend)
function updateSchedule() {
    const scheduleCards = document.querySelectorAll('.schedule-card');
    scheduleCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

updateSchedule();

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize tooltips for form fields (optional enhancement)
const formLabels = document.querySelectorAll('.form-group label');
formLabels.forEach(label => {
    label.addEventListener('mouseenter', function() {
        const input = this.nextElementSibling;
        if (input && input.value === '') {
            input.style.borderColor = '#3498db';
        }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Search Functionality
const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchToggle.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
});

searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
});

searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

// Search functionality
const searchableContent = [
    { title: 'Seed Selection', content: 'Choose high-quality, disease-resistant seeds', category: 'Crop Management' },
    { title: 'Water Scheduling', content: 'Water crops early morning or late evening', category: 'Water Management' },
    { title: 'Fertilizer Application', content: 'Apply fertilizers at the right growth stages', category: 'Fertilizer Management' },
    { title: 'Pest Control', content: 'Monitor crops regularly for pests and diseases', category: 'Crop Management' },
    { title: 'Drip Irrigation', content: 'Drip irrigation delivers water directly to plant roots', category: 'Water Management' },
    { title: 'Soil Testing', content: 'Test your soil regularly to determine nutrient deficiencies', category: 'Fertilizer Management' },
    { title: 'Aphids', content: 'Curled leaves, sticky residue, stunted growth', category: 'Pest & Disease' },
    { title: 'Rust Disease', content: 'Orange/brown pustules on leaves', category: 'Pest & Disease' },
];

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
    }
    
    const results = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.content.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
    
    displaySearchResults(results);
});

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        return;
    }
    
    searchResults.innerHTML = results.map(item => `
        <div class="search-result-item" onclick="closeSearch()">
            <h4>${item.title}</h4>
            <p>${item.content}</p>
            <span style="color: #999; font-size: 0.9rem;">${item.category}</span>
        </div>
    `).join('');
}

function closeSearch() {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
}

// Calendar Tabs
const calTabs = document.querySelectorAll('.cal-tab');
const seasonPanels = document.querySelectorAll('.season-panel');

calTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        calTabs.forEach(t => t.classList.remove('active'));
        seasonPanels.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        const season = tab.getAttribute('data-season');
        const targetPanel = document.getElementById(`${season}-cal`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// Fertilizer Calculator
function calculateFertilizer() {
    const farmSize = parseFloat(document.getElementById('fertFarmSize').value);
    const cropType = document.getElementById('fertCropType').value;
    const resultDiv = document.getElementById('fertResult');
    
    if (!farmSize || farmSize <= 0) {
        showNotification('Please enter a valid farm size', 'error');
        return;
    }
    
    // Fertilizer requirements per acre (in kg) - example values
    const fertilizerRates = {
        wheat: { N: 120, P: 60, K: 40 },
        rice: { N: 100, P: 50, K: 50 },
        corn: { N: 150, P: 70, K: 60 },
        cotton: { N: 100, P: 50, K: 50 },
        vegetables: { N: 80, P: 40, K: 40 }
    };
    
    const rates = fertilizerRates[cropType] || fertilizerRates.wheat;
    const totalN = (rates.N * farmSize).toFixed(2);
    const totalP = (rates.P * farmSize).toFixed(2);
    const totalK = (rates.K * farmSize).toFixed(2);
    
    resultDiv.innerHTML = `
        <h4>Fertilizer Requirements for ${farmSize} acres of ${cropType}</h4>
        <p><strong>Nitrogen (N):</strong> ${totalN} kg</p>
        <p><strong>Phosphorus (P):</strong> ${totalP} kg</p>
        <p><strong>Potassium (K):</strong> ${totalK} kg</p>
        <p style="margin-top: 10px; font-size: 0.9rem; color: #666;">* These are approximate values. Consult with local agricultural experts for precise recommendations.</p>
    `;
    resultDiv.classList.add('show');
}

// Water Requirement Calculator
function calculateWater() {
    const farmSize = parseFloat(document.getElementById('waterFarmSize').value);
    const cropType = document.getElementById('waterCropType').value;
    const growthStage = document.getElementById('waterGrowthStage').value;
    const resultDiv = document.getElementById('waterResult');
    
    if (!farmSize || farmSize <= 0) {
        showNotification('Please enter a valid farm size', 'error');
        return;
    }
    
    // Water requirements per acre per day (in liters) - example values
    const baseWaterRates = {
        wheat: 4000,
        rice: 12000,
        corn: 6000,
        cotton: 5000,
        vegetables: 3000
    };
    
    const stageMultipliers = {
        seedling: 0.5,
        vegetative: 1.0,
        flowering: 1.5,
        maturity: 0.8
    };
    
    const baseRate = baseWaterRates[cropType] || baseWaterRates.wheat;
    const multiplier = stageMultipliers[growthStage] || 1.0;
    const dailyWater = (baseRate * multiplier * farmSize).toFixed(2);
    const weeklyWater = (dailyWater * 7).toFixed(2);
    
    resultDiv.innerHTML = `
        <h4>Water Requirements for ${farmSize} acres of ${cropType}</h4>
        <p><strong>Growth Stage:</strong> ${growthStage}</p>
        <p><strong>Daily Water Requirement:</strong> ${dailyWater} liters</p>
        <p><strong>Weekly Water Requirement:</strong> ${weeklyWater} liters</p>
        <p style="margin-top: 10px; font-size: 0.9rem; color: #666;">* These are approximate values. Actual requirements may vary based on weather and soil conditions.</p>
    `;
    resultDiv.classList.add('show');
}

// Pest Search Functionality
function searchPest() {
    const searchTerm = document.getElementById('pestSearch').value.toLowerCase();
    const pestCards = document.querySelectorAll('.pest-card');
    
    pestCards.forEach(card => {
        const pestName = card.getAttribute('data-pest');
        const cardText = card.textContent.toLowerCase();
        
        if (cardText.includes(searchTerm) || pestName.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Real-time pest search
document.getElementById('pestSearch')?.addEventListener('input', searchPest);

// Testimonials Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Download Resource Function
function downloadResource(type) {
    const resources = {
        guide: 'Complete Farming Guide',
        pest: 'Pest & Disease Handbook',
        fertilizer: 'Fertilizer Application Guide',
        water: 'Water Management Manual'
    };
    
    showNotification(`Downloading ${resources[type]}... In a real application, this would download the PDF file.`, 'success');
    
    // In a real application, you would trigger an actual download:
    // window.location.href = `resources/${type}.pdf`;
}

// Update navbar for dark mode
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        if (body.classList.contains('dark-mode')) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        if (body.classList.contains('dark-mode')) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

console.log('FarmCare website loaded successfully! 🌾');

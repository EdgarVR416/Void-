document.addEventListener('DOMContentLoaded', function() {

    const animateHighlights = () => {
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach((highlight, index) => {
            setTimeout(() => {
                highlight.style.opacity = '0.7';
                setTimeout(() => {
                    highlight.style.opacity = '1';
                }, 300);
            }, index * 500);
        });
    };


    animateHighlights();
    setInterval(animateHighlights, 5000);


    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '30px', 
        duration: 800,    
        delay: 100,       
        reset: false
    });

    sr.reveal('.hero-content');
    sr.reveal('.service-card', { interval: 150 });
    sr.reveal('.portfolio-item', { interval: 150 });
    sr.reveal('.skill-category', { interval: 150 });
    sr.reveal('.testimonial-item', { interval: 150 });
    sr.reveal('.tech-stack-section', { delay: 100 });
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            if (this.classList.contains('primary-btn')) {
                this.style.boxShadow = '0 5px 15px rgba(192, 192, 192, 0.4)';
            } else if (this.classList.contains('secondary-btn')) {
                this.style.background = 'rgba(192, 192, 192, 0.1)';
                this.style.boxShadow = '0 5px 15px rgba(192, 192, 192, 0.2)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            if (this.classList.contains('primary-btn')) {
                this.style.boxShadow = '0 3px 10px rgba(192, 192, 192, 0.3)';
            } else if (this.classList.contains('secondary-btn')) {
                this.style.background = 'transparent';
                this.style.boxShadow = '0 3px 10px rgba(192, 192, 192, 0.1)';
            }
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress-bar');
        const percentage = progressBar.getAttribute('data-percentage');
        
        progressBar.style.width = '0%';
        
        item.addEventListener('mouseenter', function() {
            progressBar.style.width = percentage + '%';
        });
        
        item.addEventListener('mouseleave', function() {

            progressBar.style.width = percentage + '%';
        });
    });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillItems.forEach(item => {
                        const progressBar = item.querySelector('.skill-progress-bar');
                        const percentage = progressBar.getAttribute('data-percentage');
                        
                        setTimeout(() => {
                            progressBar.style.width = percentage + '%';
                        }, 200);
                    });
                    
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
    
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    const categoryTabs = document.querySelectorAll('.category-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                portfolioItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});
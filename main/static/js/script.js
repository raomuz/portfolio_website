document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                document.querySelector('.mobile-menu-overlay').classList.remove('show');
                document.body.style.overflow = 'auto';
            }
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add( 'shadow');
        } else {
            navbar.classList.remove( 'shadow');
        }
    });

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileMenuOverlay);

    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
        mobileMenuOverlay.classList.toggle('show');
        document.body.style.overflow = navbarCollapse.classList.contains('show') ? 'hidden' : 'auto';
    });

    mobileMenuOverlay.addEventListener('click', function() {
        navbarCollapse.classList.remove('show');
        this.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navbarCollapse.classList.remove('show');
                mobileMenuOverlay.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });

    function animateOnScroll() {
        const elements = document.querySelectorAll('.card, .skill-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    document.querySelectorAll('.card, .skill-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Download tracking can be added here
        });
    }
});

// Add this to your existing script.js
function initProjectGallery() {
    // Simple lightbox functionality
    const galleryImages = document.querySelectorAll('.project-gallery img');
    
    galleryImages.forEach(image => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '9999';
            
            const img = document.createElement('img');
            img.src = this.src;
            img.style.maxHeight = '90%';
            img.style.maxWidth = '90%';
            img.style.objectFit = 'contain';
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code
    initProjectGallery();
});




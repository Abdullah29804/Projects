document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksLi = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');

        // Animate Links
        navLinksLi.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close nav when a link is clicked (for smooth scrolling behavior)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinksLi.forEach(item => {
                    item.style.animation = ''; // Reset animation
                });
            }
        });
    });

    // Simple scroll reveal for sections (optional, for subtle effect)
    const sections = document.querySelectorAll('section');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // viewport
        threshold: 0.15 // 15% of the section must be visible to trigger
    });

    sections.forEach(section => {
        if (section.id !== 'hero') { // Don't animate hero section on load
            section.style.opacity = 0;
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            sectionObserver.observe(section);
        }
    });
});
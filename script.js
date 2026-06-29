// ==========================================================================
// FOOD HUB - UI/UX PARALLAX & SECURE TOUCH INTERACTION SYSTEM
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.querySelector(".header");
    const sections = document.querySelectorAll("section");

    // 1. MOBILE NAVBAR CONTROLS
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");

        if (window.scrollY < 200 && navMenu.classList.contains("active")) {
            navLinks.forEach(link => link.classList.remove("active"));
            document.querySelector('.nav-link[href="#home"]').classList.add("active");
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // 2. NAVBAR SCROLL RESIZING
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "10px 0";
            header.style.backgroundColor = "rgba(15, 15, 17, 0.98)";
        } else {
            header.style.padding = "20px 0";
            header.style.backgroundColor = "rgba(15, 15, 17, 0.95)";
        }
    });

    // 3. SCROLL TRACKER
    window.addEventListener("scroll", () => {
        if (navMenu.classList.contains("active")) return;

        let currentSection = "home";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3.5)) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    });

    // 4. DESKTOP MOUSE 3D BOARD TILT
    const board = document.getElementById("interactiveBoard");
    const perspectiveContainer = document.querySelector(".menu-board-perspective");

    if (window.innerWidth > 768 && board && perspectiveContainer) {
        perspectiveContainer.addEventListener("mousemove", (e) => {
            const rect = perspectiveContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            const maxTiltRotation = 12; 
            const tiltX = (y * maxTiltRotation).toFixed(2);
            const tiltY = (-x * maxTiltRotation).toFixed(2);

            board.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        perspectiveContainer.addEventListener("mouseleave", () => {
            board.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }

    // 5. UNIFIED MOBILE TOUCH INTERACTION CONTROLLER
    // This handler targets elements globally across both interactive sections
    const allInteractiveCards = document.querySelectorAll(".interactive-food-card, .cinematic-card");

    allInteractiveCards.forEach(card => {
        card.addEventListener("click", function(e) {
            if (window.innerWidth <= 768) {
                // If user taps an already active card, close it gracefully
                if (this.classList.contains("mobile-active")) {
                    this.classList.remove("mobile-active");
                } else {
                    // Instantly clean up active states across all cards on the page
                    allInteractiveCards.forEach(c => c.classList.remove("mobile-active"));
                    // Animate the selected card forward
                    this.classList.add("mobile-active");
                }
            }
        });
    });
});
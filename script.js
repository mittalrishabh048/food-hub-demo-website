// ==========================================================================
// FOOD HUB - UI/UX FRONTEND CONTROLLER
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MOBILE RESPONSIVE MENU INTERACTION
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close mobile menu on link interaction
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("remove");
            navMenu.classList.remove("active");
        });
    });

    // 2. ACTIVE NAVIGATION STATE ON SCROLLING
    const sections = document.querySelectorAll("section");
    
    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Detect if section is in view threshold
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
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

    // 3. STICKY INTERACTION PERFORMANCE BUFFER
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "10px 0";
            header.style.backgroundColor = "rgba(10, 10, 12, 0.98)";
        } else {
            header.style.padding = "0px 0";
            header.style.backgroundColor = "rgba(15, 15, 17, 0.95)";
        }
    });
});
// ==========================================
// Main Script for E-Portfolio Interactions
// Written by: 3rd Year CS Student
// ==========================================

console.log("==> E-Portfolio App Initialized.");
console.log("==> DEBUG: Checking DOM Elements...");

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 2. Lenis Smooth Scroll ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutQuart
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);


    // --- 3. GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Preloader Animation
    const tlLoader = gsap.timeline();
    
    tlLoader.to(".progress-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    })
    .to(".preloader-text", {
        y: "0%",
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .to(".preloader", {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
        delay: 0.5
    })
    .fromTo(".title-line", {
        y: "100%",
        opacity: 0
    }, {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=0.5")
    .fromTo(".reveal-up", {
        y: 20,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.8")
    .fromTo(".profile-card", {
        y: 100,
        opacity: 0,
        rotationZ: -5
    }, {
        y: 0,
        opacity: 1,
        rotationZ: 0,
        duration: 1.2,
        ease: "back.out(1.5)"
    }, "-=1")
    .to(".scroll-indicator", {
        opacity: 1,
        duration: 0.5
    });

    // Parallax Effects via ScrollTrigger
    gsap.utils.toArray('[data-speed]').forEach(elem => {
        const speed = parseFloat(elem.getAttribute('data-speed'));
        gsap.to(elem, {
            y: () => (ScrollTrigger.maxScroll(window) - ScrollTrigger.maxScroll(window)) * speed, // Simplified parallax math
            ease: "none",
            scrollTrigger: {
                trigger: elem,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true // make it responsive
            }
        });
    });
    
    // Parallax Image specific
    gsap.to(".hero-bg img", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Content Reveals on Scroll
    const bgWhiteSections = document.querySelectorAll('.bg-white, .bg-cream');
    
    bgWhiteSections.forEach(sec => {
        // Change nav color when over light sections
        ScrollTrigger.create({
            trigger: sec,
            start: "top 80px",
            end: "bottom 80px",
            toggleClass: {targets: ".fixed-nav", className: "mix-blend-difference"}
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            once: true,
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: "power1.out",
                    onUpdate: () => {
                        counter.innerHTML = Math.floor(obj.val) + "+";
                    }
                });
            }
        });
    });

    // --- 4. Vanilla Tilt ---
    VanillaTilt.init(document.querySelectorAll(".js-tilt"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02
    });

});


// TODO: Fix console warnings later
// console.log('End of script');

// ==========================================
// //for all start here
// ==========================================
const words = [
    "Web Developer",
    "IT Technician",
    "UI/UX Designer",
    "Freelancer"
];

let i = 0;
let timer;

// Scroll Spy & Active Navigation Highlighting Setup
const sections = document.querySelectorAll('.section-container');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    threshold: 0.5 // Triggers when 50% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});
// ==========================================
// //for all end here
// ==========================================


// ==========================================
// //exclusively for section 1 start here (Preloader & Audio System)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const percentageText = document.getElementById('loader-percentage');
    const centerFillGroup = document.getElementById('centerFillGroup');
    const preloader = document.getElementById('preloader');
    
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const bgAudio = document.getElementById('bgAudio');
    const soundOnIcon = document.getElementById('soundOnIcon');
    const soundOffIcon = document.getElementById('soundOffIcon');
    
    let currentPercentage = 0;
    let isPlaying = false;

    // Helper function to update toggle icon state
    const updateIcons = (playing) => {
        if (playing) {
            soundOffIcon.classList.add('hidden');
            soundOnIcon.classList.remove('hidden');
        } else {
            soundOnIcon.classList.add('hidden');
            soundOffIcon.classList.remove('hidden');
        }
    };

    // Helper function to play audio
    const startAudio = () => {
        if (!bgAudio) return;
        bgAudio.volume = 0.3;
        bgAudio.play().then(() => {
            isPlaying = true;
            updateIcons(true);
        }).catch(error => {
            console.log("Autoplay blocked by browser. Music will start on user interaction.");
            isPlaying = false;
            updateIcons(false);

            // Fallback: start audio on first user click anywhere if autoplay is blocked
            const startOnInteraction = () => {
                bgAudio.play().then(() => {
                    isPlaying = true;
                    updateIcons(true);
                    window.removeEventListener('click', startOnInteraction);
                }).catch(err => console.log("Interaction play failed:", err));
            };
            window.addEventListener('click', startOnInteraction, { once: true });
        });
    };

    // 1. Preloader Animation Loop
    const loadInterval = setInterval(() => {
        currentPercentage += Math.floor(Math.random() * 5) + 2;
        
        if (currentPercentage >= 100) {
            currentPercentage = 100;
            clearInterval(loadInterval);
            
            // 2. Trigger fade-out & start audio RIGHT AFTER splash screen finishes
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.classList.add('loaded'); // Triggers main content fade-in
                
                // Audio starts here, right when preloader transitions out
                startAudio();
            }, 500);
        }
        
        percentageText.textContent = currentPercentage + '%';
        let scaleValue = currentPercentage / 100;
        centerFillGroup.setAttribute('transform', `scale(${scaleValue})`);
        
    }, 60);

    // 3. Manual Navigation Audio Toggle Button Click Handler
    if (musicToggleBtn && bgAudio) {
        musicToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent trigger conflict
            if (isPlaying) {
                bgAudio.pause();
                isPlaying = false;
                updateIcons(false);
            } else {
                bgAudio.play().then(() => {
                    isPlaying = true;
                    updateIcons(true);
                }).catch(err => console.log("Toggle play failed:", err));
            }
        });
    }
});
// ==========================================
// //section 1 end here
// ==========================================


// ==========================================
// //exclusively for section 2 start here (Hero & Typewriter Effect)
// ==========================================
function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.querySelector('.typewriter-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000); 
            return;
        }
        timer = setTimeout(loopTyping, 100); 
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.querySelector('.typewriter-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0; 
            }
            setTimeout(typingEffect, 500); 
            return;
        }
        timer = setTimeout(loopDeleting, 50); 
    };
    loopDeleting();
}

document.addEventListener("DOMContentLoaded", () => {
    typingEffect();

    // Hero Entry / Exit Observer Animation Handler
    const heroElement = document.querySelector('.hero');
    const homeSection = document.getElementById('home');

    if (heroElement && homeSection) {
        // Trigger initial slow entry animation on page reload
        setTimeout(() => {
            heroElement.classList.add('hero-animated');
        }, 50);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Enter: slow blur-to-visible + rise (yellow), burst (green), pop-scale (red)
                    heroElement.classList.add('hero-animated');
                } else {
                    // Exit: fast blur-out (yellow/green) and scale down to 0 (red)
                    heroElement.classList.remove('hero-animated');
                }
            });
        }, { threshold: 0.2 });

        observer.observe(homeSection);
    }
});

document.getElementById('scrollArrow').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// Updated full-screen wheel snapping system supporting sections
let currentIndex = 0;
let isScrolling = false;

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    if (e.deltaY > 0) {
        if (currentIndex < sections.length - 1) {
            currentIndex++;
            isScrolling = true;
            sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 800);
        }
    } else {
        if (currentIndex > 0) {
            currentIndex--;
            isScrolling = true;
            sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 800);
        }
    }
}, { passive: true });
// ==========================================
// //section 2 end here
// ==========================================


// ==========================================
// //exclusively for section 3 start here (About & CV Download)
// ==========================================
document.getElementById('downloadCvBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'NazirulAziman_CV.pdf';
    link.download = 'NazirulAziman_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Pop-up card animation & Number Counter Observer (re-triggers every time)
document.addEventListener('DOMContentLoaded', () => {
    const aboutCard = document.querySelector('.about-card');
    const aboutSection = document.getElementById('about');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Trigger the card, text, stats grid, and button pop-up animations
                aboutCard.classList.add('visible');

                // 2. Trigger the number counter animation
                if (!hasAnimated) {
                    statNumbers.forEach(stat => {
                        const target = +stat.getAttribute('data-target');
                        let current = 0;
                        const duration = 1200; // Animation duration in milliseconds (1.2s)
                        const stepTime = 30; // Update interval in ms
                        const steps = duration / stepTime;
                        const increment = target / steps;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = '+' + target;
                                clearInterval(timer);
                            } else {
                                stat.textContent = '+' + Math.floor(current);
                            }
                        }, stepTime);
                    });
                    hasAnimated = true; 
                }
            } else {
                // 3. Reset everything when scrolling away so it animates again next time
                aboutCard.classList.remove('visible');
                hasAnimated = false; 

                // Reset numbers back to 0 so the counter can run again
                statNumbers.forEach(stat => {
                    stat.textContent = '+0';
                });
            }
        });
    }, { threshold: 0.2 });

    if (aboutSection) {
        observer.observe(aboutSection);
    }
});
// ==========================================
// //section 3 end here
// ==========================================


// ==========================================
// //exclusively for section 4 start here (Skills & Tools)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills-section');

    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsSection.classList.add('visible');
            } else {
                skillsSection.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(skillsSection);
});

// ==========================================
// //section 4 end here
// ==========================================


// ==========================================
// //exclusively for section 5 start here (Experience Section Drag, Infinite Ticker & Animation Observer)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('expContainer');
    const expTrack = document.getElementById('expTrack');
    const expSection = document.querySelector('.experience-section');

    // 1. Scroll Intersection Observer for Pop-up & Blur Animation
    if (expSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    expSection.classList.add('visible');
                } else {
                    expSection.classList.remove('visible');
                }
            });
        }, { threshold: 0.15 });

        observer.observe(expSection);
    }

    // 2. Seamless Infinite Loop Setup: Clone all experience cards and append them to track
    if (expTrack) {
        const cards = Array.from(expTrack.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            expTrack.appendChild(clone);
        });
    }

    if (!slider || !expTrack) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let momentumID;

    // Mouse Drag Interaction
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        cancelAnimationFrame(momentumID);
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        lastX = e.pageX;
        lastTime = performance.now();
    });

    slider.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        slider.classList.remove('active');
        startMomentum();
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        startMomentum();
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        
        // Calculate velocity for smooth glide release
        const now = performance.now();
        const dt = now - lastTime;
        if (dt > 0) {
            velocity = (e.pageX - lastX) / dt * 15; // smoothness factor
        }
        lastX = e.pageX;
        lastTime = now;

        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch Support for Mobile / Tablets
    slider.addEventListener('touchstart', (e) => {
        cancelAnimationFrame(momentumID);
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        lastX = e.touches[0].pageX;
        lastTime = performance.now();
    });

    slider.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        
        const now = performance.now();
        const dt = now - lastTime;
        if (dt > 0) {
            velocity = (e.touches[0].pageX - lastX) / dt * 15;
        }
        lastX = e.touches[0].pageX;
        lastTime = now;

        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchend', () => {
        startMomentum();
    });

    // Smooth Momentum Glide Function with Infinite Boundary Correction
    function startMomentum() {
        if (Math.abs(velocity) < 0.1) return;
        slider.scrollLeft -= velocity;
        velocity *= 0.92; // Friction decay rate

        // Infinite loop check for momentum
        checkInfiniteScroll();

        momentumID = requestAnimationFrame(startMomentum);
    }

    // Check and loop scroll position seamlessly
    function checkInfiniteScroll() {
        const maxScroll = expTrack.scrollWidth / 2;
        if (slider.scrollLeft >= maxScroll) {
            slider.scrollLeft -= maxScroll;
        } else if (slider.scrollLeft <= 0) {
            slider.scrollLeft += maxScroll;
        }
    }

    // Very Slow Continuous Ticker Auto-Scroll Animation
    let tickerSpeed = 0.35; // Adjust speed (lower = slower)
    let tickerInterval = setInterval(() => {
        if (!isDown) {
            slider.scrollLeft += tickerSpeed;
            checkInfiniteScroll();
        }
    }, 30);

    // Pause auto-scroll when user hovers or interacts
    slider.addEventListener('mouseenter', () => {
        clearInterval(tickerInterval);
    });

    slider.addEventListener('mouseleave', () => {
        clearInterval(tickerInterval);
        tickerInterval = setInterval(() => {
            if (!isDown) {
                slider.scrollLeft += tickerSpeed;
                checkInfiniteScroll();
            }
        }, 30);
    });
});
// ==========================================
// //section 5 end here
// ==========================================


// ==========================================
// //exclusively for section 6 start here (Awards Scroll Observer & Lightbox Modal)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const awardsSection = document.querySelector('.awards-section');

    // Scroll Observer for Blur & Pop-up Animation
    if (awardsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    awardsSection.classList.add('visible');
                } else {
                    awardsSection.classList.remove('visible');
                }
            });
        }, { threshold: 0.15 });

        observer.observe(awardsSection);
    }

    // Modal Lightbox Functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImg');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const triggers = document.querySelectorAll('.modal-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const imgElement = trigger.querySelector('img');
            if (imgElement) {
                modal.style.display = 'block';
                modalImg.src = imgElement.src; 
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
// ==========================================
// //section 6 end here
// ==========================================


// ==========================================
// Section 7 Scroll Animation & Interactivity Logic
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Scroll-Triggered Re-animating Blur-to-Clear & Pop-Up
    // ----------------------------------------------------
    const projectsSection = document.querySelector('.projects-section');

    if (projectsSection) {
        const observerOptions = {
            root: null,
            threshold: 0.15 // Triggers when 15% of the section is in view
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add class to animate into clear view
                    entry.target.classList.add('is-visible');
                } else {
                    // Remove class when scrolling away so it resets for the next scroll
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        sectionObserver.observe(projectsSection);
    }

    // ----------------------------------------------------
    // 2. Personal Projects Filters Logic
    // ----------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.transitionDelay = '0s'; // reset delay for filtering

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInCard 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Interactive Card Selection Highlighting
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            projectCards.forEach(c => c.classList.remove('active-project'));
            card.classList.add('active-project');
        });
    });

    // ----------------------------------------------------
    // 3. Modal & Dynamic Data Handling
    // ----------------------------------------------------
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDesc = document.getElementById('modalDesc');
    const modalDetails = document.getElementById('modalDetails');
    const modalImg = document.getElementById('modalImg');
    const modalNext = document.getElementById('modalNext');
    const modalPrev = document.getElementById('modalPrev');

    let currentProjIndex = 0;
    let currentImageIndex = 0;

    const projectsData = Array.from(projectCards).map(card => {
        const rawImages = card.getAttribute('data-images') || card.querySelector('.project-img').getAttribute('src');
        return {
            title: card.querySelector('h3').textContent,
            tagline: card.querySelector('.project-tagline').textContent,
            context: card.getAttribute('data-context') || '',
            status: card.getAttribute('data-status') || 'NDA Protected',
            details: card.getAttribute('data-details') || '',
            category: card.getAttribute('data-category').toUpperCase() === 'APP' 
                ? 'MOBILE APPLICATION (COLLEGE MILESTONE)' 
                : 'ENTERPRISE WEB APPLICATION (MINDTREX)',
            images: rawImages.split(',').map(img => img.trim())
        };
    });

    function updateModalContent(projIndex, imgIndex = 0) {
        const project = projectsData[projIndex];
        if (!modalTitle) return;
        
        modalTitle.textContent = project.title;
        if (modalCategory) {
            modalCategory.textContent = `${project.category} ${project.context} [${project.status}]`;
        }
        if (modalDesc) modalDesc.textContent = project.tagline;
        if (modalDetails) modalDetails.textContent = project.details;
        if (modalImg) modalImg.src = project.images[imgIndex];
    }

    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentProjIndex = index;
            currentImageIndex = 0; 
            updateModalContent(currentProjIndex, currentImageIndex);
            if (projectModal) projectModal.classList.add('active');
        });
    });

    if (modalClose && projectModal) {
        modalClose.addEventListener('click', () => projectModal.classList.remove('active'));
        projectModal.addEventListener('click', (e) => { 
            if (e.target === projectModal) projectModal.classList.remove('active'); 
        });
    }

    if (modalNext && modalPrev) {
        modalNext.addEventListener('click', () => {
            const project = projectsData[currentProjIndex];
            if (currentImageIndex < project.images.length - 1) {
                currentImageIndex++;
                updateModalContent(currentProjIndex, currentImageIndex);
            } else {
                currentProjIndex = (currentProjIndex + 1) % projectsData.length;
                currentImageIndex = 0;
                updateModalContent(currentProjIndex, currentImageIndex);
            }
        });

        modalPrev.addEventListener('click', () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateModalContent(currentProjIndex, currentImageIndex);
            } else {
                currentProjIndex = (currentProjIndex - 1 + projectsData.length) % projectsData.length;
                currentImageIndex = projectsData[currentProjIndex].images.length - 1;
                updateModalContent(currentProjIndex, currentImageIndex);
            }
        });
    }

    // ----------------------------------------------------
    // 4. Carousel Drag-to-Scroll Handler
    // ----------------------------------------------------
    const projectsSlider = document.getElementById('projectsContainer');
    if (projectsSlider) {
        let isProjDown = false;
        let projStartX;
        let projScrollLeft;

        projectsSlider.addEventListener('mousedown', (e) => {
            isProjDown = true;
            projectsSlider.style.cursor = 'grabbing';
            projStartX = e.pageX - projectsSlider.offsetLeft;
            projScrollLeft = projectsSlider.scrollLeft;
        });

        projectsSlider.addEventListener('mouseleave', () => {
            isProjDown = false;
            projectsSlider.style.cursor = 'grab';
        });

        projectsSlider.addEventListener('mouseup', () => {
            isProjDown = false;
            projectsSlider.style.cursor = 'grab';
        });

        projectsSlider.addEventListener('mousemove', (e) => {
            if (!isProjDown) return;
            e.preventDefault();
            const x = e.pageX - projectsSlider.offsetLeft;
            const walk = (x - projStartX) * 2; 
            projectsSlider.scrollLeft = projScrollLeft - walk;
        });
    }
});
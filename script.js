// Preloader animation setup
document.addEventListener('DOMContentLoaded', () => {
    const percentageText = document.getElementById('loader-percentage');
    const centerFillGroup = document.getElementById('centerFillGroup');
    const preloader = document.getElementById('preloader');
    
    let currentPercentage = 0;
    
    const loadInterval = setInterval(() => {
        currentPercentage += Math.floor(Math.random() * 5) + 2;
        
        if (currentPercentage >= 100) {
            currentPercentage = 100;
            clearInterval(loadInterval);
            
            // Fade out splash screen after reaching 100%
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 500);
        }
        
        // Update percentage text display
        percentageText.textContent = currentPercentage + '%';
        
        // Scale the solid star smoothly from the center (0 to 1)
        let scaleValue = currentPercentage / 100;
        centerFillGroup.setAttribute('transform', `scale(${scaleValue})`);
        
    }, 60);
});

//audio toggle button
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

const words = [
        "Web Developer",
        "IT Technician",
        "UI/UX Designer",
        "Freelancer"
    ];
    
    let i = 0;
    let timer;

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
    });

    document.getElementById('scrollArrow').addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });

    // Updated full-screen wheel snapping system supporting 3 sections
    const sections = document.querySelectorAll('.section-container');
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

    document.getElementById('downloadCvBtn').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'NazirulAziman_CV.pdf';
        link.download = 'NazirulAziman_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Scroll Spy & Active Navigation Highlighting
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

    // Smooth Drag & Momentum Glide + Slow Ticker for Experience Section
    const slider = document.getElementById('expContainer');
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

    // Smooth Momentum Glide Function
    function startMomentum() {
        if (Math.abs(velocity) < 0.1) return;
        slider.scrollLeft -= velocity;
        velocity *= 0.92; // Friction decay rate
        momentumID = requestAnimationFrame(startMomentum);
    }

    // Very Slow Ticker Auto-Scroll Animation
    let tickerSpeed = 0.35; // Adjust speed (lower = slower)
    let tickerInterval = setInterval(() => {
        if (!isDown) {
            slider.scrollLeft += tickerSpeed;
            if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 1)) {
                slider.scrollLeft = 0; // Loop back smoothly
            }
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
                if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 1)) {
                    slider.scrollLeft = 0;
                }
            }
        }, 30);
    });

    // Image Modal Lightbox Logic (Direct Source Extraction)
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImg');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const triggers = document.querySelectorAll('.modal-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const imgElement = trigger.querySelector('img');
            if (imgElement) {
                modal.style.display = 'block';
                modalImg.src = imgElement.src; // Automatically uses the exact image source
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Project Filter & Interactive Card Highlighting
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Make project cards toggle active-project on click
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            projectCards.forEach(c => c.classList.remove('active-project'));
            card.classList.add('active-project');
        });
    });

    // project modal pop up
    document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDesc = document.getElementById('modalDesc');
    const modalDetails = document.getElementById('modalDetails');
    const modalImg = document.getElementById('modalImg');
    const modalNext = document.getElementById('modalNext');
    const modalPrev = document.getElementById('modalPrev');

    let currentIndex = 0;
    let currentImageIndex = 0;

    // Map projects and split comma-separated images into an array
    const projectsData = Array.from(projectCards).map(card => {
        const rawImages = card.getAttribute('data-images') || card.querySelector('.project-img').getAttribute('src');
        return {
            title: card.querySelector('h3').textContent,
            description: card.querySelector('p').textContent,
            details: card.getAttribute('data-details') || '',
            category: card.getAttribute('data-category').toUpperCase() + ' UI',
            images: rawImages.split(',').map(img => img.trim()) // Creates the image array
        };
    });

    function updateModalContent(projIndex, imgIndex = 0) {
        const project = projectsData[projIndex];
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalDesc.textContent = project.description;
        modalDetails.textContent = project.details;
        modalImg.src = project.images[imgIndex]; // Updates to the current image in the array
    }

    // Open modal on card click
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            currentImageIndex = 0; // Reset to first image
            updateModalContent(currentIndex, currentImageIndex);
            modal.classList.add('active');
        });
    });

    // Close actions
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    // Next button: cycles through sub-images first, then switches projects
    modalNext.addEventListener('click', () => {
        const project = projectsData[currentIndex];
        if (currentImageIndex < project.images.length - 1) {
            currentImageIndex++;
            updateModalContent(currentIndex, currentImageIndex);
        } else {
            currentIndex = (currentIndex + 1) % projectsData.length;
            currentImageIndex = 0;
            updateModalContent(currentIndex, currentImageIndex);
        }
    });

    // Previous button: cycles backward through sub-images or previous project
    modalPrev.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalContent(currentIndex, currentImageIndex);
        } else {
            currentIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
            currentImageIndex = projectsData[currentIndex].images.length - 1;
            updateModalContent(currentIndex, currentImageIndex);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('projectsContainer');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed multiplier if needed
        slider.scrollLeft = scrollLeft - walk;
    });
});
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

    const updateIcons = (playing) => {
        if (playing) {
            soundOffIcon.classList.add('hidden');
            soundOnIcon.classList.remove('hidden');
        } else {
            soundOnIcon.classList.add('hidden');
            soundOffIcon.classList.remove('hidden');
        }
    };

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

    const loadInterval = setInterval(() => {
        currentPercentage += Math.floor(Math.random() * 5) + 2;
        
        if (currentPercentage >= 100) {
            currentPercentage = 100;
            clearInterval(loadInterval);
            
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.classList.add('loaded');
                startAudio();
            }, 500);
        }
        
        percentageText.textContent = currentPercentage + '%';
        let scaleValue = currentPercentage / 100;
        centerFillGroup.setAttribute('transform', `scale(${scaleValue})`);
        
    }, 60);

    if (musicToggleBtn && bgAudio) {
        musicToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
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

    const heroElement = document.querySelector('.hero');
    const homeSection = document.getElementById('home');

    if (heroElement && homeSection) {
        setTimeout(() => {
            heroElement.classList.add('hero-animated');
        }, 50);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroElement.classList.add('hero-animated');
                } else {
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

let currentIndex = 0;
let isScrolling = false;

window.addEventListener('wheel', (e) => {
    // If the modal is open, do not trigger page snap scrolling
    const projectModal = document.getElementById('projectModal');
    if (projectModal && projectModal.classList.contains('active')) {
        return; 
    }

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

document.addEventListener('DOMContentLoaded', () => {
    const aboutCard = document.querySelector('.about-card');
    const aboutSection = document.getElementById('about');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutCard.classList.add('visible');

                if (!hasAnimated) {
                    statNumbers.forEach(stat => {
                        const target = +stat.getAttribute('data-target');
                        let current = 0;
                        const duration = 1200;
                        const stepTime = 30;
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
                aboutCard.classList.remove('visible');
                hasAnimated = false; 

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

    const tickerTrack = document.getElementById('tickerTrack');
    if (tickerTrack) {
        tickerTrack.innerHTML += tickerTrack.innerHTML;

        let scrollPos = 0;
        const speed = 0.8;

        function step() {
            scrollPos += speed;
            const singleSetWidth = tickerTrack.scrollWidth / 2;

            if (scrollPos >= singleSetWidth) {
                scrollPos = 0;
            }

            tickerTrack.style.transform = `translateX(-${scrollPos}px)`;
            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    observer.observe(skillsSection);
});
// ==========================================
// //section 4 end here
// ==========================================


// ==========================================
// //exclusively for section 5 start here (Experience Section)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('expContainer');
    const expTrack = document.getElementById('expTrack');
    const expSection = document.querySelector('.experience-section');

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
        
        const now = performance.now();
        const dt = now - lastTime;
        if (dt > 0) {
            velocity = (e.pageX - lastX) / dt * 15;
        }
        lastX = e.pageX;
        lastTime = now;

        slider.scrollLeft = scrollLeft - walk;
    });

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

    function startMomentum() {
        if (Math.abs(velocity) < 0.1) return;
        slider.scrollLeft -= velocity;
        velocity *= 0.92;
        checkInfiniteScroll();
        momentumID = requestAnimationFrame(startMomentum);
    }

    function checkInfiniteScroll() {
        const maxScroll = expTrack.scrollWidth / 2;
        if (slider.scrollLeft >= maxScroll) {
            slider.scrollLeft -= maxScroll;
        } else if (slider.scrollLeft <= 0) {
            slider.scrollLeft += maxScroll;
        }
    }

    let tickerSpeed = 0.35;
    let tickerInterval = setInterval(() => {
        if (!isDown) {
            slider.scrollLeft += tickerSpeed;
            checkInfiniteScroll();
        }
    }, 30);

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
// //exclusively for section 6 start here (Awards & Modal)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const awardsSection = document.querySelector('.awards-section');

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
// Section 7 Scroll Animation & Storytelling Modal Logic
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    const projectsSection = document.querySelector('.projects-section');

    if (projectsSection) {
        const observerOptions = {
            root: null,
            threshold: 0.15
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        sectionObserver.observe(projectsSection);
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.transitionDelay = '0s';

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInCard 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            projectCards.forEach(c => c.classList.remove('active-project'));
            card.classList.add('active-project');
        });
    });

    // Modal Storytelling & Dynamic Data Handling
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDesc = document.getElementById('modalDesc');
    const modalChallenge = document.getElementById('modalChallenge');
    const modalApproach = document.getElementById('modalApproach');
    const modalOutcome = document.getElementById('modalOutcome');
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
            challenge: card.getAttribute('data-challenge') || '',
            approach: card.getAttribute('data-approach') || '',
            outcome: card.getAttribute('data-outcome') || '',
            category: card.getAttribute('data-category').toUpperCase() === 'APP' 
                ? 'MOBILE APPLICATION (Academic Showcase)' 
                : 'ENTERPRISE WEB APPLICATION (MINDTREX)',
            images: rawImages.split(',').map(img => img.trim())
        };
    });

    function updateModalContent(projIndex, imgIndex = 0) {
        const project = projectsData[projIndex];
        if (!modalTitle) return;
        
        modalTitle.textContent = project.title;
        if (modalCategory) {
            modalCategory.textContent = `${project.category} — ${project.context} [${project.status}]`;
        }
        if (modalDesc) modalDesc.textContent = project.tagline;
        
        if (modalChallenge) modalChallenge.textContent = project.challenge;
        if (modalApproach) modalApproach.textContent = project.approach;
        if (modalOutcome) modalOutcome.textContent = project.outcome;

        if (modalImg) modalImg.src = project.images[imgIndex];
    }

    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentProjIndex = index;
            currentImageIndex = 0; 
            updateModalContent(currentProjIndex, currentImageIndex);
            if (projectModal) {
                projectModal.classList.add('active');
                document.body.classList.add('modal-open'); // Locks background scroll
            }
        });
    });

    if (modalClose && projectModal) {
        const closeModal = () => {
            projectModal.classList.remove('active');
            document.body.classList.remove('modal-open'); // Restores background scroll
        };

        modalClose.addEventListener('click', closeModal);
        projectModal.addEventListener('click', (e) => { 
            if (e.target === projectModal) closeModal(); 
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
    // Vertical Drag-to-Scroll & Stop Propagation for Modal Text Area
    // ----------------------------------------------------
    const textScrollArea = document.querySelector('.modal-text-scroll-area');
    if (textScrollArea) {
        let isTextDown = false;
        let startY;
        let scrollTop;

        // CRUCIAL: Stop wheel events from bubbling up to window snap scroll
        textScrollArea.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: true });

        textScrollArea.addEventListener('mousedown', (e) => {
            isTextDown = true;
            startY = e.pageY - textScrollArea.offsetTop;
            scrollTop = textScrollArea.scrollTop;
        });

        textScrollArea.addEventListener('mouseleave', () => {
            isTextDown = false;
        });

        textScrollArea.addEventListener('mouseup', () => {
            isTextDown = false;
        });

        textScrollArea.addEventListener('mousemove', (e) => {
            if (!isTextDown) return;
            e.preventDefault();
            const y = e.pageY - textScrollArea.offsetTop;
            const walk = (y - startY) * 1.5; 
            textScrollArea.scrollTop = scrollTop - walk;
        });

        textScrollArea.addEventListener('touchstart', (e) => {
            startY = e.touches[0].pageY - textScrollArea.offsetTop;
            scrollTop = textScrollArea.scrollTop;
        }, { passive: true });

        textScrollArea.addEventListener('touchmove', (e) => {
            const y = e.touches[0].pageY - textScrollArea.offsetTop;
            const walk = (y - startY) * 1.5;
            textScrollArea.scrollTop = scrollTop - walk;
        }, { passive: true });
    }

    // Carousel Drag-to-Scroll Handler
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

    // Magnifier Zoom-on-Hover Effect for Modal Image
    const container = document.getElementById('modalImgContainer');
    const lens = document.getElementById('imgLens');
    const lensImg = document.getElementById('lensImg');

    if (container && modalImg && lens && lensImg) {
        const zoomFactor = 2.5;

        modalImg.addEventListener('load', () => {
            lensImg.src = modalImg.src;
        });

        container.addEventListener('mousemove', (e) => {
            if (!modalImg.src || !modalImg.complete) return;

            const rect = container.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            const lensWidth = lens.offsetWidth;
            const lensHeight = lens.offsetHeight;

            if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
                lens.style.display = 'none';
                return;
            }

            lens.style.display = 'block';

            lens.style.left = `${x - lensWidth / 2}px`;
            lens.style.top = `${y - lensHeight / 2}px`;

            const natWidth = modalImg.naturalWidth || 800;
            const natHeight = modalImg.naturalHeight || 600;
            const imgRatio = natWidth / natHeight;
            const containerRatio = rect.width / rect.height;
            
            let renderedWidth, renderedHeight, offsetX = 0, offsetY = 0;

            if (containerRatio > imgRatio) {
                renderedHeight = rect.height;
                renderedWidth = rect.height * imgRatio;
                offsetX = (rect.width - renderedWidth) / 2;
            } else {
                renderedWidth = rect.width;
                renderedHeight = rect.width / imgRatio;
                offsetY = (rect.height - renderedHeight) / 2;
            }

            const scaledWidth = renderedWidth * zoomFactor;
            const scaledHeight = renderedHeight * zoomFactor;
            
            if (lensImg.src !== modalImg.src) {
                lensImg.src = modalImg.src;
            }
            lensImg.style.width = `${scaledWidth}px`;
            lensImg.style.height = `${scaledHeight}px`;

            const relX = x - offsetX;
            const relY = y - offsetY;

            const moveX = -(relX * zoomFactor - lensWidth / 2);
            const moveY = -(relY * zoomFactor - lensHeight / 2);

            lensImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        container.addEventListener('mouseleave', () => {
            lens.style.display = 'none';
        });

        container.addEventListener('mouseenter', () => {
            if (modalImg.src) {
                lens.style.display = 'block';
                lensImg.src = modalImg.src;
            }
        });
    }
});
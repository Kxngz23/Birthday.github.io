document.addEventListener('DOMContentLoaded', function() {
    const dareButton = document.getElementById('dareButton');
    const birthdaySurprise = document.getElementById('birthdaySurprise');
    const birthdayCard = document.getElementById('birthdayCard');
    const playButton = document.getElementById('playButton');
    const birthdayAudio = document.getElementById('birthdayAudio');
    const floatingPicturesContainer = document.getElementById('floating-pictures');
    
    // Hide birthday elements initially
    birthdaySurprise.classList.add('hidden');
    birthdayCard.classList.add('hidden');
    floatingPicturesContainer.classList.add('hidden');
    
    // Your image URLs
    const floatingImages = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        'image4.jpg',
        'image5.jpg',
        'image6.jpg',
        'image7.jpg',
        'image8.jpg',
        'image9.jpg',
        'image10.jpg',
        'image11.jpg',
        'image12.jpg',
        'image13.jpg'
    ];
    
    // Scary popups
    const scaryImages = [
        'pennywise it 2017 GIF.gif',
        'Horror Disturbing GIF.gif',
        'exorcism GIF.gif',
        'download.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2p1Z2dlYzNra3prZnQwaTB6eW5nZmRkeHE4YnFmNXdoZjg4N3h5eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1qj43zb19qDsjLxMao/giphy.gif'
    ];
    
    let popupInterval;
    let floatingElements = [];
    let isImageEnlarged = false;

    function showRandomScaryPopup() {
        if (isImageEnlarged) return; // Don't show popups when image is enlarged
        
        const popup = document.createElement('div');
        popup.className = 'scary-popup';
        
        const img = document.createElement('img');
        img.className = 'scary-image';
        img.src = scaryImages[Math.floor(Math.random() * scaryImages.length)];
        img.alt = 'Boo!';
        
        popup.appendChild(img);
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.style.animation = 'fadeIn 0.5s reverse';
            setTimeout(() => {
                popup.remove();
            }, 500);
        }, 1500);
    }
    
    function startScaryPopups() {
        popupInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                showRandomScaryPopup();
            }
        }, 10000);
    }
    
    function createFloatingPictures() {
        floatingPicturesContainer.innerHTML = '';
        floatingPicturesContainer.classList.remove('hidden');
        
        floatingImages.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'floating-pic';
            img.alt = `Memory ${index + 1}`;
            img.dataset.index = index;
            
            // Set initial random position
            const posX = Math.random() * (window.innerWidth - 100);
            const posY = Math.random() * (window.innerHeight - 100);
            
            img.style.left = `${posX}px`;
            img.style.top = `${posY}px`;
            
            // Add click event for enlargement
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                enlargeImage(this);
            });
            
            floatingPicturesContainer.appendChild(img);
            
            floatingElements.push({
                element: img,
                x: posX,
                y: posY,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2
            });
        });
        
        animateFloatingPictures();
    }

    function enlargeImage(imgElement) {
        isImageEnlarged = true;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';
        
        // Create enlarged image container
        const enlargedContainer = document.createElement('div');
        enlargedContainer.className = 'enlarged-container';
        
        // Create enlarged image
        const enlargedImg = document.createElement('img');
        enlargedImg.src = imgElement.src;
        enlargedImg.className = 'enlarged-image';
        enlargedImg.alt = imgElement.alt;
        
        // Add navigation buttons if multiple images
        if (floatingImages.length > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'nav-btn prev-btn';
            prevBtn.innerHTML = '&larr;';
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateImages(-1, parseInt(imgElement.dataset.index));
            });
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'nav-btn next-btn';
            nextBtn.innerHTML = '&rarr;';
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateImages(1, parseInt(imgElement.dataset.index));
            });
            
            enlargedContainer.appendChild(prevBtn);
            enlargedContainer.appendChild(nextBtn);
        }
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-enlarged';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', closeEnlarged);
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
        
        // Click on overlay to close
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeEnlarged();
            }
        });
        
        // Build overlay
        enlargedContainer.appendChild(enlargedImg);
        enlargedContainer.appendChild(closeBtn);
        overlay.appendChild(enlargedContainer);
        document.body.appendChild(overlay);
        
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                closeEnlarged();
            } else if (e.key === 'ArrowLeft' && floatingImages.length > 1) {
                navigateImages(-1, parseInt(imgElement.dataset.index));
            } else if (e.key === 'ArrowRight' && floatingImages.length > 1) {
                navigateImages(1, parseInt(imgElement.dataset.index));
            }
        }
        
        function navigateImages(direction, currentIndex) {
            let newIndex = currentIndex + direction;
            if (newIndex < 0) newIndex = floatingImages.length - 1;
            if (newIndex >= floatingImages.length) newIndex = 0;
            
            enlargedImg.src = floatingImages[newIndex];
            imgElement.dataset.index = newIndex;
        }
        
        function closeEnlarged() {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.removeChild(overlay);
            isImageEnlarged = false;
        }
    }
    
    function animateFloatingPictures() {
        if (isImageEnlarged) {
            requestAnimationFrame(animateFloatingPictures);
            return;
        }
        
        floatingElements.forEach(item => {
            item.x += item.speedX;
            item.y += item.speedY;
            
            // Bounce off walls
            if (item.x <= 0 || item.x >= window.innerWidth - 100) {
                item.speedX *= -1;
            }
            if (item.y <= 0 || item.y >= window.innerHeight - 100) {
                item.speedY *= -1;
            }
            
            item.element.style.left = `${item.x}px`;
            item.element.style.top = `${item.y}px`;
        });
        
        requestAnimationFrame(animateFloatingPictures);
    }
    
    startScaryPopups();
    
    // Handle dare button click
    dareButton.addEventListener('click', function() {
        clearInterval(popupInterval);
        dareButton.classList.add('hidden');
        birthdaySurprise.classList.remove('hidden');
        document.body.classList.add('birthday-active');
        
        // Show card immediately
        birthdayCard.classList.remove('hidden');
        birthdayCard.classList.add('closed');
        
        // Create effects
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        createFireworks();
        createFloatingPictures();
    });
    
    // Handle card click
    birthdayCard.addEventListener('click', function() {
        this.classList.toggle('closed');
        this.classList.toggle('open');
    });
    
    // Handle play button
    playButton.addEventListener('click', function(e) {
        e.stopPropagation();
        if (birthdayAudio.paused) {
            birthdayAudio.play()
                .then(() => {
                    playButton.textContent = '❚❚';
                })
                .catch(error => {
                    console.error('Audio playback failed:', error);
                });
        } else {
            birthdayAudio.pause();
            playButton.textContent = '▶';
        }
    });
    
    function createFireworks() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const container = document.getElementById('fireworks-container');
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = `${Math.random() * 100}%`;
                firework.style.top = `${Math.random() * 100}%`;
                firework.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
                container.appendChild(firework);
                
                setTimeout(() => {
                    firework.remove();
                }, 2000);
            }, i * 300);
        }
    }
});
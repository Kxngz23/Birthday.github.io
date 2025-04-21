function createImageTree() {
    const treeContainer = document.querySelector('.tree-animation');
    
    // Create trunk
    const trunk = document.createElement('div');
    trunk.className = 'tree-trunk';
    treeContainer.appendChild(trunk);
    
    // Updated branch positions - 3 left, 3 right
    const branchPositions = [
        // Left branches (negative angles)
        { angle: -25, length: 140, yPos: 180, leaves: 8, side: 'left' },
        { angle: -35, length: 120, yPos: 120, leaves: 10, side: 'left' },
        { angle: -45, length: 100, yPos: 70, leaves: 8, side: 'left' },
        // Right branches (positive angles)
        { angle: 25, length: 140, yPos: 180, leaves: 8, side: 'right' },
        { angle: 35, length: 120, yPos: 120, leaves: 10, side: 'right' },
        { angle: 45, length: 100, yPos: 70, leaves: 8, side: 'right' }
    ];
    
    branchPositions.forEach((branch, index) => {
        // Create branch
        const branchEl = document.createElement('div');
        branchEl.className = 'tree-branch';
        branchEl.id = `branch${index+1}`;
        branchEl.style.width = `${branch.length}px`;
        branchEl.style.height = '15px';
        branchEl.style.top = `${branch.yPos}px`;
        branchEl.style.left = '50%';
        branchEl.style.transform = `rotate(${branch.angle}deg)`;
        branchEl.dataset.side = branch.side; // Store side information
        
        // Add random delay to sway animation
        branchEl.style.animationDelay = `${Math.random() * 2}s`;
        
        treeContainer.appendChild(branchEl);
        
        // Add leaves to branch
        for (let i = 0; i < branch.leaves; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'tree-leaf';
            
            // Random leaf properties
            const size = Math.random() * 20 + 10;
            // Position leaves differently based on branch side
            const posX = branch.side === 'left' ? 
                Math.random() * branch.length * 0.7 : 
                Math.random() * branch.length * 0.3 + branch.length * 0.7;
            const posY = Math.random() * 30 - 15;
            const rotation = Math.random() * 360;
            const delay = Math.random() * 3;
            
            leaf.style.width = `${size}px`;
            leaf.style.height = `${size}px`;
            leaf.style.left = `${posX}px`;
            leaf.style.top = `${posY}px`;
            leaf.style.transform = `rotate(${rotation}deg)`;
            leaf.style.animationDelay = `${delay}s`;
            
            // Make some leaves sparkle
            if (Math.random() > 0.7) {
                leaf.style.animation += ', sparkle 2s infinite';
                leaf.style.background = 'radial-gradient(circle, #7CFC00, #ADFF2F)';
            }
            
            branchEl.appendChild(leaf);
        }
    });
    
    // Now handle the images
    const imageUrls = [
        'images/birthday-image1.jpg',
        'images/birthday-image2.jpg',
        'images/birthday-image3.jpg',
        'images/birthday-image4.jpg',
        'images/birthday-image5.jpg',
        'images/birthday-image6.jpg'
    ];
    
    imageUrls.forEach((url, index) => {
        const branch = document.getElementById(`branch${index+1}`);
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Birthday memory ${index+1}`;
        img.classList.add('tree-image');
        
        // Create popup effect (smaller initial size)
        const popup = document.createElement('div');
        popup.classList.add('image-popup');
        const popupImg = document.createElement('img');
        popupImg.src = url;
        popupImg.style.transform = 'scale(0.7)'; // Smaller initial size
        popup.appendChild(popupImg);
        document.body.appendChild(popup);
        
        // Animation sequence
        setTimeout(() => {
            popup.classList.add('show');
            
            setTimeout(() => {
                popup.classList.remove('show');
                branch.appendChild(img);
                img.classList.add('on-branch');
                
                // Position image based on branch side
                const branchSide = branch.dataset.side;
                const xOffset = branchSide === 'left' ? -20 : 20;
                
                img.style.transform = `
                    translateX(${xOffset}px) 
                    rotate(${5 * (branchSide === 'left' ? -1 : 1)}deg)
                `;
                img.style.transformOrigin = 'center center';
            }, 2000);
        }, index * 800);
    });
}
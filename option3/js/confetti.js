function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.width = Math.random() * 10 + 5;
            this.height = Math.random() * 10 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 2 * Math.PI;
            this.rotationSpeed = (Math.random() - 0.5) * 0.2;
            this.speed = Math.random() * 3 + 2;
            this.wind = (Math.random() - 0.5) * 0.5;
        }
        
        update() {
            this.y += this.speed;
            this.x += this.wind;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = Math.random() * -20;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
            ctx.restore();
        }
    }
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
        confettiPieces.push(new Confetti());
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(confetti => {
            confetti.update();
            confetti.draw();
        });
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Get audio element
    const audio = document.getElementById('birthdayAudio');
    
    // Try to play audio automatically
    const playAudio = () => {
        audio.volume = 0.5; // Set volume to 50%
        const playPromise = audio.play();
        
        // Handle promise in case of autoplay restrictions
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Audio played successfully
                console.log('Audio playback started automatically');
            })
            .catch(error => {
                // Auto-play was prevented, show play button
                console.log('Auto-play prevented:', error);
                showAudioPlayButton();
            });
        }
    };
    
    // Function to show play button when autoplay is blocked
    function showAudioPlayButton() {
        const playButton = document.createElement('button');
        playButton.textContent = '▶ Play Music';
        playButton.className = 'music-play-btn';
        playButton.onclick = () => {
            audio.play();
            playButton.remove();
        };
        document.body.appendChild(playButton);
    }
    
    // Start playback (browser may block this without user interaction)
    playAudio();
    
    // Button event listeners
    document.getElementById('imageTreeBtn').addEventListener('click', showImageTree);
    document.getElementById('videoCollageBtn').addEventListener('click', showVideoCollage);
    
    // Start fireworks and confetti
    startFireworks();
    startConfetti();
});

function showImageTree() {
    document.getElementById('videoContainer').classList.add('hidden');
    document.getElementById('imageTreeContainer').classList.remove('hidden');
    createImageTree();
}

function showVideoCollage() {
    document.getElementById('imageTreeContainer').classList.add('hidden');
    document.getElementById('videoContainer').classList.remove('hidden');
    document.getElementById('birthdayVideo').play();
}
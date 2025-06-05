// Star creation function
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    star.style.animationDelay = Math.random() * 2 + 's';
    
    document.querySelector('.stars-container').appendChild(star);
    
    // Remove star after animation completes
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 5000);
}

// Create stars continuously
function startStarField() {
    createStar();
    setTimeout(startStarField, Math.random() * 800 + 500);
}

// Audio and Volume Control
let audio;
let volumeSlider;
let volumeValue;
let audioStarted = false;
let enterOverlay;

function initializeAudio() {
    audio = document.getElementById('background-music');
    volumeSlider = document.getElementById('volume-slider');
    volumeValue = document.querySelector('.volume-value');
    enterOverlay = document.getElementById('enter-overlay');
    
    // Set initial volume 
    audio.volume = 0.35;
    
    // Set up overlay click handler
    enterOverlay.addEventListener('click', handleEnterSite);
    
    // Set audio start time when loaded
    audio.addEventListener('loadeddata', () => {
        audio.currentTime = 0;
    }, { once: true });
    
    // Handle audio loop at end
    audio.addEventListener('ended', () => {
        if (audioStarted) {
            audio.currentTime = 0;
            audio.play();
        }
    });
      audio.addEventListener('error', function(e) {
        console.error('Audio error:', e);
    });
    
    // Volume slider event
    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        audio.volume = volume;
        audio.muted = false; // Ensure audio is unmuted when user adjusts volume
        volumeValue.textContent = this.value + '%';
        
        // Update volume icon based on volume level
        const volumeIcon = document.querySelector('.volume-icon');
        if (volume === 0) {
            volumeIcon.textContent = '🔇';
        } else if (volume < 0.5) {
            volumeIcon.textContent = '🔉';
        } else {
            volumeIcon.textContent = '🔊';
        }
    });
}

function handleEnterSite() {
    if (audioStarted) return;
    
    // Hide overlay with animation
    enterOverlay.style.animation = 'fadeOut 0.5s ease-out forwards';
      setTimeout(() => {
        enterOverlay.classList.add('hidden');
        
        // Show center box with animation
        const centerBox = document.querySelector('.center-box');
        centerBox.classList.add('show');
        
        // Show volume control
        const volumeControl = document.querySelector('.volume-control');
        volumeControl.classList.add('show');
        
        // Start audio after user interaction
        audio.currentTime = 11;
        audio.muted = false;
        audio.volume = 0.35;
        audio.play().then(() => {
            audioStarted = true;
            console.log('🎵 Audio started successfully after user interaction');
        }).catch(e => {
            console.error('Failed to start audio:', e);
        });
    }, 500);
}

// Start everything when page loads
window.addEventListener('load', () => {
    startStarField();
    initializeAudio();
});
// Array of jumpscare images (using data URLs and emoji for fun)
const scareImages = [
    '😱', // Use emoji if no image available
    '👹',
    '💀',
    '👻'
];

// Sound effects (we'll use Web Audio API to create a beep)
const scareMessages = [
    'GOTCHA!',
    'BOO!',
    'SURPRISE!',
    'FOUND YOU!'
];

let gameStarted = false;
let scare = {
    image: scareImages[Math.floor(Math.random() * scareImages.length)],
    message: scareMessages[Math.floor(Math.random() * scareMessages.length)]
};

function startGame() {
    gameStarted = true;
    const welcomeScreen = document.getElementById('welcomeScreen');
    const gameScreen = document.getElementById('gameScreen');
    
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

function triggerScare() {
    const gameScreen = document.getElementById('gameScreen');
    const scareScreen = document.getElementById('scareScreen');
    const scareImage = document.getElementById('scareImage');
    const scareText = document.querySelector('.scare-text');
    
    gameScreen.classList.add('hidden');
    scareScreen.classList.remove('hidden');
    
    // Display random scare message
    scareText.textContent = scare.message;
    
    // Create a creepy background effect
    scareScreen.style.background = 'linear-gradient(45deg, #000, #ff0000, #000, #ff0000)';
    scareScreen.style.backgroundSize = '400% 400%';
    scareScreen.style.animation = 'flicker 0.1s infinite';
    
    // Play a creepy sound effect
    playSoundEffect();
    
    // Return to game or home after 3 seconds
    setTimeout(() => {
        scareScreen.classList.add('hidden');
        
        // Random chance to go back or continue game
        if (Math.random() > 0.5) {
            gameScreen.classList.remove('hidden');
            // Change the text for replayability
            document.getElementById('hint').textContent = 'It's still watching... Try again?';
            scare.message = scareMessages[Math.floor(Math.random() * scareMessages.length)];
        } else {
            const welcomeScreen = document.getElementById('welcomeScreen');
            welcomeScreen.classList.remove('hidden');
            gameStarted = false;
            document.getElementById('hint').textContent = 'Look carefully... something is watching...';
        }
    }, 3000);
}

function playSoundEffect() {
    // Create a creepy sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Creepy frequency sweep
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Add some creepy effects on load
window.addEventListener('load', () => {
    console.log('%cWelcome to the Jumpscare Website! 👻', 'color: red; font-size: 20px; font-weight: bold;');
    
    // Add random jumpscare on mouse movement (very rarely)
    document.addEventListener('mousemove', (e) => {
        if (gameStarted && Math.random() < 0.0001) {
            triggerScare();
        }
    });
});

// Close jumpscare screen on click
document.addEventListener('click', (e) => {
    const scareScreen = document.getElementById('scareScreen');
    if (!scareScreen.classList.contains('hidden') && !e.target.closest('.scare-screen')) {
        // Allow clicking to dismiss
    }
});
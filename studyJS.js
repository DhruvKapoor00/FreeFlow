let currentAudio = null; // Variable to hold the currently playing audio

document.addEventListener('DOMContentLoaded', () => {
    // Function to update the add/remove button state
    const updateAddRemoveButton = (button, isAdded) => {
        button.dataset.action = isAdded ? 'remove' : 'add';
        button.innerHTML = isAdded
            ? '<i class="fas fa-minus"></i> Remove'
            : '<i class="fas fa-plus"></i> Add';
    };

    // Initialize added items from localStorage
    let addedItems = JSON.parse(localStorage.getItem('addedMusicItems')) || [];

    // Get all music cards
    const musicCards = document.querySelectorAll('.music-card');

    musicCards.forEach(card => {
        const cardId = card.dataset.id;
        const addRemoveBtn = card.querySelector('.add-remove-btn');
        
        updateAddRemoveButton(addRemoveBtn, addedItems.includes(cardId));

        // Add click event listener for the Add/Remove button
        if (addRemoveBtn) {
            addRemoveBtn.addEventListener('click', (event) => {
                const action = addRemoveBtn.dataset.action;
                const genre = card.dataset.genre;

                if (action === 'add') {
                    if (!addedItems.includes(cardId)) {
                        updateAddRemoveButton(addRemoveBtn, true);
                        alert(`Added "${genre}" to your collection!`);
                        console.log(`Added: ${genre}`);
                    }
                } else { // action === 'remove'
                    updateAddRemoveButton(addRemoveBtn, false);
                    alert(`Removed "${genre}" from your collection.`);
                    console.log(`Removed: ${genre}`);
                }
            });
        }
    });
});

// Global function to play music, accessible from onclick attributes
function playMusic(buttonElement) {
    const audioSrc = buttonElement.dataset.src;
    const card = buttonElement.closest('.music-card'); // Find the parent music-card
    const genre = card ? card.dataset.genre : 'Unknown Genre';

    if (audioSrc) {
        // Stop any currently playing audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset to beginning
        }

        // Create a new Audio object
        currentAudio = new Audio(audioSrc);

        // Play the audio
        currentAudio.play()
            .then(() => {
                console.log(`Now playing: ${genre} from ${audioSrc}`);
                alert(`Now playing: ${genre}`);
            })
            .catch(error => {
                console.error(`Error playing audio for ${genre}:`, error);
                alert(`Could not play "${genre}". Please check the audio source.`);
            });
    } else {
        console.warn(`No audio source defined for "${genre}".`);
        alert(`No music available for "${genre}".`);
    }
}

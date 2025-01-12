document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.video-container');
    const items = document.querySelectorAll('.video-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 20; // Including gap
    const itemsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 576 ? 2 : 1;
    const maxIndex = items.length - itemsPerView;

    // Navigation functions
    function slideNext() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
    }

    function slidePrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    }

    function updateSliderPosition() {
        container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        updateButtonStates();
    }

    function updateButtonStates() {
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    }

    // Event listeners
    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);

    // Handle video play/pause
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('play', function() {
            // Pause all other videos when one starts playing
            videos.forEach(v => {
                if (v !== video) v.pause();
            });
        });
    });

    // Initial button states
    updateButtonStates();

    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset position and update itemsPerView
        currentIndex = 0;
        container.style.transform = 'translateX(0)';
        updateButtonStates();
    });
}); 
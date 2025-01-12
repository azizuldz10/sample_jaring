document.addEventListener('DOMContentLoaded', function() {
    // Futsal Panorama
    pannellum.viewer('panorama-futsal', {
        type: 'equirectangular',
        panorama: 'https://raw.githubusercontent.com/mpetroff/pannellum/master/examples/examplepano.jpg', // Placeholder 1
        autoLoad: true,
        autoRotate: -2,
        compass: true,
        hotSpots: [
            {
                pitch: -10,
                yaw: 180,
                type: "info",
                text: "Sistem pengait premium"
            }
        ]
    });

    // Badminton Panorama
    pannellum.viewer('panorama-badminton', {
        type: 'equirectangular',
        panorama: 'https://pannellum.org/images/cerro-toco-0.jpg', // Placeholder 2
        autoLoad: true,
        autoRotate: -2,
        compass: true,
        hotSpots: [
            {
                pitch: 0,
                yaw: 90,
                type: "info",
                text: "Sistem bracket adjustable"
            }
        ]
    });
}); 
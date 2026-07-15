document.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector("#ar-scene");
    const petrominTarget = document.querySelector("#petromin-target");
    const scanningOverlay = document.querySelector("#scanning-overlay");
    const infoCard = document.querySelector("#info-card");
    const closeBtn = document.querySelector("#close-btn");
    const debugLogger = document.querySelector("#debug-logger");

    // Clear debug banner once the AR system starts rendering video frames successfully
    sceneEl.addEventListener("arReady", () => {
        debugLogger.style.display = "none";
    });

    // Capture explicit permission block errors or HTTPS handshake blocks
    sceneEl.addEventListener("arError", (event) => {
        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            debugLogger.innerHTML = "❌ Error: Camera blocked! WebAR must run over HTTPS (Secure Server).";
            debugLogger.style.background = "#d32f2f";
        } else {
            debugLogger.innerHTML = "❌ Camera Error: Check browser site permissions.";
            debugLogger.style.background = "#d32f2f";
        }
    });

    // AR Object tracking hooks
    petrominTarget.addEventListener("targetFound", () => {
        scanningOverlay.classList.add("hidden");
        infoCard.classList.remove("hidden");
    });

    petrominTarget.addEventListener("targetLost", () => {
        // Keeps card up so user can read the text even if they tilt away from the logo
    });

    closeBtn.addEventListener("click", () => {
        infoCard.classList.add("hidden");
        scanningOverlay.classList.remove("hidden");
    });
});
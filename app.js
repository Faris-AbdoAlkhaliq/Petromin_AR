document.addEventListener("DOMContentLoaded", () => {
    const petrominTarget = document.querySelector("#petromin-target");
    const scanningOverlay = document.querySelector("#scanning-overlay");
    const infoCard = document.querySelector("#info-card");
    const closeBtn = document.querySelector("#close-btn");

    // Detect when the Petromin Logo enters the camera frame
    petrominTarget.addEventListener("targetFound", () => {
        // Hide the scanning helper overlay
        scanningOverlay.style.opacity = "0";
        setTimeout(() => scanningOverlay.classList.add("hidden"), 500);

        // Show the company information card
        infoCard.classList.remove("hidden");
    });

    // Detect when the camera loses track of the logo
    petrominTarget.addEventListener("targetLost", () => {
        // (Optional) Bring back scanning helper if logo leaves frame
        scanningOverlay.classList.remove("hidden");
        scanningOverlay.style.opacity = "1";
    });

    // Handle manual close of the card
    closeBtn.addEventListener("click", () => {
        infoCard.classList.add("hidden");
    });
});
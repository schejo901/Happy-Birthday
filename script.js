const fireworks = document.getElementById("fireworks");

function createFirework(x, y) {
    const particleCount = 24;
    const radius = 120;

    for (let i = 0; i < particleCount; i++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel";

        const angle = (Math.PI * 2 / particleCount) * i;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;

        pixel.style.left = x + "px";
        pixel.style.top = y + "px";

        pixel.style.setProperty("--dx", dx + "px");
        pixel.style.setProperty("--dy", dy + "px");

        pixel.style.background = `hsl(${Math.random() * 360}, 70%, 75%)`;

        fireworks.appendChild(pixel);

        setTimeout(() => pixel.remove(), 1400);
    }
}

setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.6;
    createFirework(x, y);
}, 700);

function blowOut() {
    const flame = document.querySelector(".flame");
    if (flame) {
        flame.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cakeAnimation");
    const trigger = document.getElementById("animationTrigger");
    const hint = document.getElementById("click-hint");

    let clickCount = 0;
    const LOOP_START_FRAME = 152;

    const animation = lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "https://lottie.host/66b84d69-691a-4130-b16d-ecd041b9ad3a/8jiPe0GU1B.json"
    });

    trigger.addEventListener("click", () => {
        clickCount++;

        if (clickCount === 1) {
            hint.style.display = "none";
            const secondHint = document.getElementById("second-hint");
            setTimeout(() => {secondHint.classList.add("show");}, 1200);
            animation.play();
        } else if (clickCount === 2) {
            // Rückwärts von 121 bis 103, doppelte Geschwindigkeit, einmalig
            animation.loop = false;             // nur einmal
            animation.setSpeed(2);              // doppelte Geschwindigkeit
            animation.playSegments([121, 103], true);
        }
    });

    animation.addEventListener("complete", () => {
        if (clickCount === 1) {
            // Nach erstem Klick Intro → Loop ab Frame 152
            animation.setDirection(1);
            animation.loop = true;
            animation.setSpeed(1);              // normale Geschwindigkeit
            animation.playSegments([LOOP_START_FRAME, animation.totalFrames - 1], true);
        }
    });
});

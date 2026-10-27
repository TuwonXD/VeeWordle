import confetti from "canvas-confetti";

export function fireHeartConfetti() {
  // Delicate bursts from both sides
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ["#FDA4AF", "#F43F5E", "#FFD1DC", "#FDE047", "#FB7185", "#FFF0F3"],
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireFullCelebration() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ["#FDA4AF", "#F43F5E", "#FFB3C6", "#FDE047", "#FFE4E6", "#10B981"];

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
    });
  }, 250);
}


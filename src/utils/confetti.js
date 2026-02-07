import confetti from 'canvas-confetti';

export function fireHeartConfetti() {
  const duration = 4000;
  const end = Date.now() + duration;

  const heart = confetti.shapeFromPath({
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  });

  const colors = ['#B76E79', '#880E4F', '#FFC1CC', '#FF69B4', '#FF1493'];

  function frame() {
    if (Date.now() > end) return;

    confetti({
      particleCount: 3,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors,
      shapes: [heart],
      scalar: 1.5,
      drift: 0.5,
      gravity: 0.8,
      ticks: 200,
    });

    confetti({
      particleCount: 3,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors,
      shapes: [heart],
      scalar: 1.5,
      drift: -0.5,
      gravity: 0.8,
      ticks: 200,
    });

    requestAnimationFrame(frame);
  }

  frame();
}

export function fireCenterBurst() {
  const heart = confetti.shapeFromPath({
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  });

  confetti({
    particleCount: 80,
    spread: 100,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#B76E79', '#880E4F', '#FFC1CC', '#FF69B4', '#FF1493'],
    shapes: [heart],
    scalar: 2,
    gravity: 0.6,
    ticks: 300,
  });
}

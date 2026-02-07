import { useMemo } from 'react';

const hearts = ['💕', '💖', '💗', '💝', '💘', '♥️', '🌹'];

export default function FloatingHearts() {
  const heartElements = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: hearts[i % hearts.length],
      left: `${Math.random() * 100}%`,
      size: `${14 + Math.random() * 18}px`,
      duration: `${8 + Math.random() * 12}s`,
      delay: `${Math.random() * 10}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {heartElements.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            '--left': h.left,
            '--size': h.size,
            '--duration': h.duration,
            '--delay': h.delay,
            left: h.left,
            fontSize: h.size,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  theme?: 'light' | 'dark';
}

type Bubble = {
  baseX: number;
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobbleDistance: number;
  wobbleSpeed: number;
  wobblePhase: number;
  color: string;
  opacity: number;
};

export function ParticleBackground({ theme = 'dark' }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const palettes = {
      light: [
        'rgba(173, 216, 230, 0.35)',
        'rgba(135, 206, 250, 0.3)',
        'rgba(176, 224, 230, 0.28)',
      ],
      dark: [
        'rgba(90, 128, 218, 0.32)',
        'rgba(72, 61, 139, 0.3)',
        'rgba(100, 149, 237, 0.28)',
      ],
    };

    const effectiveTheme: 'light' | 'dark' = theme === 'light' || theme === 'dark' ? theme : 'dark';
    const activePalette = palettes[effectiveTheme];

    const bubbleCount = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 50);

    const createBubble = (spawnAtBottom = false): Bubble => {
      const radius = Math.random() * 40 + 30; // Large, soft bubbles
      const baseX = Math.random() * canvas.width;
      const initialY = spawnAtBottom
        ? canvas.height + radius + Math.random() * canvas.height * 0.2
        : Math.random() * canvas.height;

      return {
        baseX,
        x: baseX,
        y: initialY,
        radius,
        speed: Math.random() * 20 + 25, // px per second
        wobbleDistance: Math.random() * 18 + 8,
        wobbleSpeed: Math.random() * 0.8 + 0.5,
        wobblePhase: Math.random() * Math.PI * 2,
        color: activePalette[Math.floor(Math.random() * activePalette.length)],
        opacity: Math.random() * 0.2 + 0.15,
      };
    };

    const resetBubble = (bubble: Bubble) => {
      const radius = Math.random() * 40 + 30;
      const baseX = Math.random() * canvas.width;

      bubble.baseX = baseX;
      bubble.radius = radius;
      bubble.y = canvas.height + radius + Math.random() * canvas.height * 0.2;
      bubble.speed = Math.random() * 20 + 25;
      bubble.wobbleDistance = Math.random() * 18 + 8;
      bubble.wobbleSpeed = Math.random() * 0.8 + 0.5;
      bubble.wobblePhase = Math.random() * Math.PI * 2;
      bubble.color = activePalette[Math.floor(Math.random() * activePalette.length)];
      bubble.opacity = Math.random() * 0.2 + 0.15;
    };

    bubblesRef.current = Array.from({ length: bubbleCount }, () => createBubble());

    let lastTimestamp: number | null = null;

    const drawBubble = (bubble: Bubble) => {
      const gradient = ctx.createRadialGradient(
        bubble.x - bubble.radius * 0.35,
        bubble.y - bubble.radius * 0.4,
        bubble.radius * 0.2,
        bubble.x,
        bubble.y,
        bubble.radius
      );

      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.55, bubble.color);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.globalAlpha = bubble.opacity;
      ctx.fillStyle = gradient;
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = bubble.opacity * 0.6;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.globalAlpha = 1;
    };

    const animate = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const deltaSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        bubble.y -= bubble.speed * deltaSeconds;
        bubble.wobblePhase += bubble.wobbleSpeed * deltaSeconds;
        bubble.x = bubble.baseX + Math.sin(bubble.wobblePhase) * bubble.wobbleDistance;

        if (bubble.y + bubble.radius < 0) {
          resetBubble(bubble);
        }

        drawBubble(bubble);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

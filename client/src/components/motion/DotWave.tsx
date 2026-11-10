import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DotWaveProps {
  className?: string;
  /** Element whose pointer movement steers the camera (defaults to window). */
  trackRef?: React.RefObject<HTMLElement>;
}

const COLS = 72;
const ROWS = 46;
const X_RANGE = 8; // world units either side of centre
const Z_NEAR = 1.4;
const Z_FAR = 17;

// High-contrast palette against navy: violet troughs → electric cyan → white crests
const C_LOW = [129, 140, 248]; // indigo-400
const C_MID = [34, 211, 238]; // cyan-400
const C_HIGH = [240, 253, 255]; // near white

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * Live 3D "ocean of dots" rendered on a 2D canvas: a perspective grid of points
 * displaced by layered sine waves, gently steered by the cursor.
 * Pauses when off-screen or the tab is hidden; renders one still frame for reduced-motion users.
 */
export default function DotWave({ className, trackRef }: DotWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let start = performance.now();
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const t = time / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter'; // overlapping dots glow

      const fov = Math.max(w, 700) * 0.42;
      const horizon = h * 0.46;
      const camX = (mouse.x - 0.5) * 2.4;
      const camY = 1.7 + (mouse.y - 0.5) * 0.7;

      for (let r = 0; r < ROWS; r++) {
        const zr = r / (ROWS - 1);
        const z = lerp(Z_NEAR, Z_FAR, zr * zr * 0.35 + zr * 0.65); // denser rows near the camera
        const depthFade = 1 - zr;
        const scale = fov / z;

        for (let c = 0; c < COLS; c++) {
          const x = lerp(-X_RANGE, X_RANGE, c / (COLS - 1));

          const y =
            Math.sin(x * 0.55 + t * 0.9) * 0.32 +
            Math.sin(z * 0.45 - t * 0.7) * 0.38 +
            Math.sin((x + z) * 0.28 + t * 0.45) * 0.28;

          const sx = w / 2 + (x - camX) * scale;
          if (sx < -10 || sx > w + 10) continue;
          const sy = horizon + (camY - y) * scale;
          if (sy < -10 || sy > h + 10) continue;

          const crest = clamp01((y + 0.9) / 1.8); // 0 trough → 1 crest
          const col =
            crest < 0.6
              ? C_LOW.map((v, i) => lerp(v, C_MID[i], crest / 0.6))
              : C_MID.map((v, i) => lerp(v, C_HIGH[i], (crest - 0.6) / 0.4));

          const alpha = clamp01(depthFade * 1.3) * (0.45 + crest * 0.55) * clamp01(zr * 6 + 0.4);
          const radius = Math.max(0.5, Math.min(3, 3.8 / z)) * (0.85 + crest * 0.6);

          ctx.fillStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      draw(now - start);
      raf = requestAnimationFrame(loop);
    };

    const play = () => {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    if (reduce) {
      draw(4000);
    } else {
      start = performance.now();
      play();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(4000);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener('visibilitychange', onVisibility);

    const target: HTMLElement | Window = trackRef?.current ?? window;
    const onMove = (e: Event) => {
      const pe = e as PointerEvent;
      if (pe.pointerType && pe.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = clamp01((pe.clientX - rect.left) / rect.width);
      mouse.ty = clamp01((pe.clientY - rect.top) / rect.height);
    };
    target.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      target.removeEventListener('pointermove', onMove);
    };
  }, [reduce, trackRef]);

  return <canvas ref={canvasRef} aria-hidden className={cn('pointer-events-none block h-full w-full', className)} />;
}

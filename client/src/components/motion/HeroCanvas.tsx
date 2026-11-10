import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────
 * Animated hero backgrounds, one scene per page.
 * Shared runtime: DPR-aware resize, rAF loop paused off-screen
 * or in hidden tabs, cursor tracking, single still frame for
 * reduced-motion users.
 * ───────────────────────────────────────────────────────── */

export type HeroVariant =
  | 'network'
  | 'aurora'
  | 'grid'
  | 'sparks'
  | 'globe'
  | 'streams'
  | 'hex'
  | 'ripples'
  | 'orbits'
  | 'code'
  | 'stars';

type RGB = [number, number, number];
interface Pointer {
  x: number;
  y: number;
  active: boolean;
}
interface Scene {
  resize(w: number, h: number): void;
  draw(ctx: CanvasRenderingContext2D, t: number, dt: number, m: Pointer, w: number, h: number): void;
}

const CYAN: RGB = [34, 211, 238];
const VIOLET: RGB = [129, 140, 248];
const BLUE: RGB = [59, 130, 246];
const WHITE: RGB = [240, 253, 255];

const rgba = (c: RGB, a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/* ── Network: drifting nodes joined by lines, drawn to the cursor ── */
function networkScene(): Scene {
  let pts: { x: number; y: number; vx: number; vy: number; r: number; c: RGB }[] = [];
  return {
    resize(w, h) {
      const n = Math.min(140, Math.max(40, Math.floor((w * h) / 10000)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 22,
        vy: (Math.random() - 0.5) * 22,
        r: Math.random() * 1.6 + 0.8,
        c: Math.random() < 0.3 ? VIOLET : CYAN,
      }));
    },
    draw(ctx, _t, dt, m, w, h) {
      const LINK = 140;
      const MOUSE = 200;
      for (const p of pts) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        if (m.active) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE && d > 1) {
            p.x += (dx / d) * 18 * dt;
            p.y += (dy / d) * 18 * dt;
          }
        }
      }
      ctx.lineWidth = 0.7;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = rgba(mix(a.c, b.c, 0.5), (1 - d / LINK) * 0.35);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (m.active) {
          const d = Math.hypot(a.x - m.x, a.y - m.y);
          if (d < MOUSE) {
            ctx.strokeStyle = rgba(WHITE, (1 - d / MOUSE) * 0.5);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = rgba(p.c, 0.9);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(p.c, 0.12);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}

/* ── Aurora: glowing ribbons of light in the accent colour ── */
function auroraScene(accent: RGB): Scene {
  const ribbons = [
    { y: 0.32, amp: 70, f1: 0.0026, f2: 0.0061, s: 0.45, c: accent },
    { y: 0.45, amp: 90, f1: 0.002, f2: 0.0049, s: -0.35, c: CYAN },
    { y: 0.58, amp: 60, f1: 0.0031, f2: 0.0072, s: 0.3, c: VIOLET },
    { y: 0.7, amp: 80, f1: 0.0018, f2: 0.0055, s: -0.5, c: accent },
  ];
  return {
    resize() {},
    draw(ctx, t, _dt, m, w, h) {
      const tilt = m.active ? (m.y / h - 0.5) * 60 : 0;
      ribbons.forEach((r, i) => {
        const path = () => {
          ctx.beginPath();
          for (let x = -20; x <= w + 20; x += 14) {
            const y =
              h * r.y +
              Math.sin(x * r.f1 + t * r.s + i) * r.amp +
              Math.sin(x * r.f2 - t * r.s * 0.7) * r.amp * 0.4 +
              tilt * (x / w - 0.5);
            if (x === -20) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
        };
        const passes: [number, number][] = [
          [110, 0.05],
          [55, 0.08],
          [18, 0.18],
          [2.5, 0.7],
        ];
        for (const [width, alpha] of passes) {
          const g = ctx.createLinearGradient(0, 0, w, 0);
          g.addColorStop(0, rgba(r.c, 0));
          g.addColorStop(0.3, rgba(r.c, alpha));
          g.addColorStop(0.7, rgba(mix(r.c, WHITE, 0.3), alpha));
          g.addColorStop(1, rgba(r.c, 0));
          ctx.strokeStyle = g;
          ctx.lineWidth = width;
          ctx.lineCap = 'round';
          path();
          ctx.stroke();
        }
      });
    },
  };
}

/* ── Grid: perspective floor rushing toward the viewer ── */
function gridScene(): Scene {
  return {
    resize() {},
    draw(ctx, t, _dt, m, w, h) {
      const horizon = h * 0.52;
      const vx = w / 2 + (m.active ? (m.x / w - 0.5) * w * 0.25 : 0);
      const depth = h - horizon;

      // Horizon glow
      const glow = ctx.createLinearGradient(0, horizon - 120, 0, horizon + 40);
      glow.addColorStop(0, rgba(VIOLET, 0));
      glow.addColorStop(0.7, rgba(VIOLET, 0.18));
      glow.addColorStop(1, rgba(CYAN, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, horizon - 120, w, 160);
      ctx.strokeStyle = rgba(CYAN, 0.8);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(w, horizon);
      ctx.stroke();

      // Horizontal lines moving forward
      const ROWS = 22;
      const phase = (t * 0.9) % 1;
      for (let i = 0; i < ROWS; i++) {
        const d = i + 1 - phase;
        const y = horizon + depth * (1.6 / d);
        if (y > h + 2) continue;
        const a = clamp01(1 - d / ROWS) * 0.55;
        ctx.strokeStyle = rgba(mix(CYAN, VIOLET, d / ROWS), a);
        ctx.lineWidth = Math.max(0.5, 2.2 / d);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Converging verticals
      const COLS = 28;
      const spread = w * 0.22;
      for (let j = -COLS; j <= COLS; j++) {
        const xb = vx + j * spread;
        const a = 0.35 * (1 - Math.abs(j) / COLS);
        if (a <= 0) continue;
        const g = ctx.createLinearGradient(0, horizon, 0, h);
        g.addColorStop(0, rgba(VIOLET, 0));
        g.addColorStop(1, rgba(CYAN, a));
        ctx.strokeStyle = g;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(vx, horizon);
        ctx.lineTo(xb, h);
        ctx.stroke();
      }
    },
  };
}

/* ── Sparks: embers rising and swaying, in the accent colour ── */
function sparksScene(accent: RGB): Scene {
  let ps: { x: number; y: number; v: number; r: number; ph: number; c: RGB; life: number }[] = [];
  let W = 0;
  let H = 0;
  const spawn = (fresh = false) => ({
    x: Math.random() * W,
    y: fresh ? Math.random() * H : H + 10,
    v: 25 + Math.random() * 60,
    r: Math.random() * 2.2 + 0.6,
    ph: Math.random() * Math.PI * 2,
    c: Math.random() < 0.55 ? accent : Math.random() < 0.5 ? CYAN : WHITE,
    life: 0,
  });
  return {
    resize(w, h) {
      W = w;
      H = h;
      const n = Math.min(160, Math.floor((w * h) / 9000));
      ps = Array.from({ length: n }, () => spawn(true));
    },
    draw(ctx, t, dt, m, w, h) {
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.y -= p.v * dt;
        p.life += dt;
        let x = p.x + Math.sin(t * 0.8 + p.ph) * 18;
        if (m.active) {
          const dx = x - m.x;
          const dy = p.y - m.y;
          const d = Math.hypot(dx, dy);
          if (d < 160) x += (dx / (d || 1)) * (160 - d) * 0.25;
        }
        if (p.y < -20) ps[i] = spawn();
        const fade = clamp01(p.y / h) * clamp01(p.life * 1.5);
        ctx.fillStyle = rgba(p.c, 0.15 * fade);
        ctx.beginPath();
        ctx.arc(x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(p.c, 0.9 * fade);
        ctx.beginPath();
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Warm base glow
      const g = ctx.createRadialGradient(w / 2, h * 1.05, 0, w / 2, h * 1.05, h * 0.8);
      g.addColorStop(0, rgba(accent, 0.25));
      g.addColorStop(1, rgba(accent, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    },
  };
}

/* ── Globe: rotating dotted sphere with arcs from Karachi ── */
function globeScene(): Scene {
  const N = 1100;
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }
  const ll = (lat: number, lon: number): [number, number, number] => {
    const la = (lat * Math.PI) / 180;
    const lo = (lon * Math.PI) / 180;
    return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)];
  };
  const home = ll(24.86, 67.0); // Karachi
  const cities = [ll(51.5, -0.12), ll(40.7, -74), ll(25.2, 55.3), ll(43.65, -79.38), ll(-33.87, 151.2), ll(52.52, 13.4), ll(1.35, 103.8)];
  const arcs = cities.map((c, i) => {
    const seg: [number, number, number][] = [];
    for (let k = 0; k <= 40; k++) {
      const s = k / 40;
      const v: [number, number, number] = [
        home[0] + (c[0] - home[0]) * s,
        home[1] + (c[1] - home[1]) * s,
        home[2] + (c[2] - home[2]) * s,
      ];
      const len = Math.hypot(v[0], v[1], v[2]) || 1;
      const lift = 1 + Math.sin(s * Math.PI) * 0.22;
      seg.push([(v[0] / len) * lift, (v[1] / len) * lift, (v[2] / len) * lift]);
    }
    return { seg, offset: i / cities.length };
  });

  let cx = 0;
  let cy = 0;
  let R = 0;
  return {
    resize(w, h) {
      const wide = w >= 1024;
      cx = wide ? w * 0.72 : w * 0.5;
      cy = wide ? h * 0.55 : h * 0.62;
      R = Math.min(w, h) * (wide ? 0.4 : 0.42);
    },
    draw(ctx, t, _dt, m, w, h) {
      const ry = t * 0.12 + (m.active ? (m.x / w - 0.5) * 0.8 : 0) - 1.2;
      const rx = -0.3 + (m.active ? (m.y / h - 0.5) * 0.4 : 0);
      const cyR = Math.cos(ry);
      const syR = Math.sin(ry);
      const cxR = Math.cos(rx);
      const sxR = Math.sin(rx);
      const rot = (p: [number, number, number]) => {
        const x = p[0] * cyR + p[2] * syR;
        const z1 = -p[0] * syR + p[2] * cyR;
        const y = p[1] * cxR - z1 * sxR;
        const z = p[1] * sxR + z1 * cxR;
        return [x, y, z] as const;
      };

      // Atmosphere
      const atm = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.35);
      atm.addColorStop(0, rgba(BLUE, 0.18));
      atm.addColorStop(1, rgba(BLUE, 0));
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
      ctx.fill();

      for (const p of pts) {
        const [x, y, z] = rot(p);
        const front = z > 0;
        const a = front ? 0.35 + z * 0.6 : 0.08;
        ctx.fillStyle = rgba(front ? mix(BLUE, CYAN, z) : VIOLET, a);
        ctx.beginPath();
        ctx.arc(cx + x * R, cy - y * R, front ? 1.3 : 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Arcs
      for (const arc of arcs) {
        const prog = (t * 0.22 + arc.offset) % 1;
        const upto = Math.floor(prog * 1.4 * arc.seg.length);
        const start = Math.max(0, upto - 18);
        ctx.lineWidth = 1.6;
        let prev: readonly [number, number, number] | null = null;
        for (let k = start; k < Math.min(upto, arc.seg.length); k++) {
          const q = rot(arc.seg[k]);
          if (prev && q[2] > -0.1 && prev[2] > -0.1) {
            ctx.strokeStyle = rgba(mix(CYAN, WHITE, 0.3), ((k - start) / 18) * 0.9);
            ctx.beginPath();
            ctx.moveTo(cx + prev[0] * R, cy - prev[1] * R);
            ctx.lineTo(cx + q[0] * R, cy - q[1] * R);
            ctx.stroke();
          }
          prev = q;
        }
      }

      // Home marker (Karachi)
      const k = rot(home);
      if (k[2] > 0) {
        const px = cx + k[0] * R;
        const py = cy - k[1] * R;
        const pulse = (t * 0.8) % 1;
        ctx.strokeStyle = rgba(CYAN, 1 - pulse);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, 4 + pulse * 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = rgba(WHITE, 1);
        ctx.beginPath();
        ctx.arc(px, py, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}

/* ── Streams: comets of light flowing along wavy lanes ── */
function streamsScene(): Scene {
  const LANES = 8;
  let comets: { lane: number; speed: number; len: number; off: number; c: RGB }[] = [];
  return {
    resize(w) {
      comets = [];
      for (let l = 0; l < LANES; l++) {
        const n = 2 + (l % 2);
        for (let k = 0; k < n; k++) {
          comets.push({
            lane: l,
            speed: 140 + Math.random() * 220,
            len: 120 + Math.random() * 220,
            off: Math.random() * (w + 400),
            c: [CYAN, VIOLET, BLUE][(l + k) % 3],
          });
        }
      }
    },
    draw(ctx, t, _dt, m, w, h) {
      const laneY = (l: number, x: number) => {
        const base = h * (0.18 + (l / (LANES - 1)) * 0.68);
        let y = base + Math.sin(x * 0.004 + l * 0.9 + t * 0.6) * 16;
        if (m.active) {
          const d = Math.abs(m.x - x);
          if (d < 220) y += ((m.y - base) * (1 - d / 220)) * 0.15;
        }
        return y;
      };

      // Lanes
      ctx.lineWidth = 1;
      for (let l = 0; l < LANES; l++) {
        ctx.strokeStyle = rgba(BLUE, 0.1);
        ctx.beginPath();
        for (let x = 0; x <= w; x += 20) {
          const y = laneY(l, x);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Comets
      for (const c of comets) {
        const head = ((t * c.speed + c.off) % (w + c.len + 200)) - 100;
        const tail = head - c.len;
        const g = ctx.createLinearGradient(tail, 0, head, 0);
        g.addColorStop(0, rgba(c.c, 0));
        g.addColorStop(1, rgba(mix(c.c, WHITE, 0.4), 0.95));
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        for (let x = tail; x <= head; x += 8) {
          const y = laneY(c.lane, x);
          if (x === tail) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        const hy = laneY(c.lane, head);
        ctx.fillStyle = rgba(c.c, 0.25);
        ctx.beginPath();
        ctx.arc(head, hy, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(WHITE, 0.95);
        ctx.beginPath();
        ctx.arc(head, hy, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}

/* ── Hex: honeycomb whose cells flare up and fade ── */
function hexScene(): Scene {
  let cells: { x: number; y: number; e: number }[] = [];
  const S = 30;
  const hexPath = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      const px = x + r * Math.cos(a);
      const py = y + r * Math.sin(a);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  };
  return {
    resize(w, h) {
      cells = [];
      const dx = S * Math.sqrt(3);
      const dy = S * 1.5;
      for (let row = -1; row * dy < h + S; row++) {
        for (let col = -1; col * dx < w + S; col++) {
          cells.push({ x: col * dx + (row % 2 ? dx / 2 : 0), y: row * dy, e: 0 });
        }
      }
    },
    draw(ctx, t, dt, m, w, h) {
      // Random ignitions
      if (cells.length && Math.random() < 0.4) cells[(Math.random() * cells.length) | 0].e = 1;
      const sweep = ((t * 0.25) % 1.4) - 0.2;
      for (const c of cells) {
        if (m.active) {
          const d = Math.hypot(c.x - m.x, c.y - m.y);
          if (d < 140) c.e = Math.max(c.e, 1 - d / 140);
        }
        const diag = (c.x / w + c.y / h) / 2;
        const sw = Math.max(0, 1 - Math.abs(diag - sweep) * 12) * 0.5;
        const e = Math.max(c.e, sw);
        const col = mix(CYAN, VIOLET, clamp01(c.y / h));
        hexPath(ctx, c.x, c.y, S - 2);
        if (e > 0.02) {
          ctx.fillStyle = rgba(col, e * 0.22);
          ctx.fill();
        }
        ctx.strokeStyle = rgba(col, 0.07 + e * 0.6);
        ctx.lineWidth = 1;
        ctx.stroke();
        c.e = Math.max(0, c.e - dt * 0.9);
      }
    },
  };
}

/* ── Ripples: radar rings, sweep and pings from the centre ── */
function ripplesScene(): Scene {
  let pings: { x: number; y: number; age: number }[] = [];
  let acc = 0;
  return {
    resize() {
      pings = [];
    },
    draw(ctx, t, dt, m, w, h) {
      const cx = m.active ? w / 2 + (m.x - w / 2) * 0.08 : w / 2;
      const baseY = h * 0.78; // below the headline so the core isn't hidden by the text vignette
      const cy = m.active ? baseY + (m.y - baseY) * 0.08 : baseY;
      const maxR = Math.hypot(w, h) * 0.7;

      // Static range rings
      ctx.lineWidth = 1;
      for (let i = 1; i <= 6; i++) {
        ctx.strokeStyle = rgba(BLUE, 0.16);
        ctx.beginPath();
        ctx.arc(cx, cy, (maxR / 6) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Expanding ripples
      for (let i = 0; i < 5; i++) {
        const f = (((t * 0.22 + i / 5) % 1) + 1) % 1; // always 0..1
        ctx.strokeStyle = rgba(mix(CYAN, VIOLET, f), Math.pow(1 - f, 1.3) * 0.9);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, f * maxR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating sweep
      const ang = t * 0.9;
      const sweepLen = 0.9;
      for (let k = 0; k < 24; k++) {
        const a0 = ang - (k / 24) * sweepLen;
        ctx.fillStyle = rgba(CYAN, 0.1 * (1 - k / 24));
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, a0 - sweepLen / 24, a0);
        ctx.closePath();
        ctx.fill();
      }

      // Pings
      acc += dt;
      if (acc > 0.3) {
        acc = 0;
        const r = Math.random() * maxR * 0.8 + 60;
        const a = Math.random() * Math.PI * 2;
        pings.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, age: 0 });
      }
      pings = pings.filter((p) => (p.age += dt) < 2.2);
      for (const p of pings) {
        const f = p.age / 2.2;
        ctx.strokeStyle = rgba(CYAN, (1 - f) * 0.8);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 + f * 30, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = rgba(WHITE, 1 - f);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Core
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140);
      g.addColorStop(0, rgba(CYAN, 0.55));
      g.addColorStop(1, rgba(CYAN, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

/* ── Orbits: team members circling a glowing core ── */
function orbitsScene(): Scene {
  const rings = [
    { r: 0.32, tilt: -0.35, speed: 0.22, n: 3, c: CYAN },
    { r: 0.55, tilt: -0.28, speed: -0.15, n: 5, c: VIOLET },
    { r: 0.8, tilt: -0.22, speed: 0.1, n: 6, c: BLUE },
    { r: 1.05, tilt: -0.18, speed: -0.07, n: 7, c: CYAN },
  ];
  const offsets = rings.map((ring) => Array.from({ length: ring.n }, (_, i) => (i / ring.n) * Math.PI * 2 + Math.random() * 0.5));
  let cx = 0;
  let cy = 0;
  let base = 0;
  return {
    resize(w, h) {
      const wide = w >= 1024;
      cx = wide ? w * 0.72 : w * 0.5;
      cy = wide ? h * 0.52 : h * 0.6;
      base = Math.min(w, h) * (wide ? 0.42 : 0.4);
    },
    draw(ctx, t, _dt, m, w, h) {
      const squash = 0.38 + (m.active ? (m.y / h - 0.5) * 0.2 : 0);
      const spin = m.active ? (m.x / w - 0.5) * 0.4 : 0;
      const nodes: { x: number; y: number; front: boolean; c: RGB }[] = [];

      rings.forEach((ring, ri) => {
        const rx = base * ring.r;
        const ry = rx * squash;
        const rot = ring.tilt + spin;
        ctx.strokeStyle = rgba(ring.c, 0.18);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
        ctx.stroke();

        const cr = Math.cos(rot);
        const sr = Math.sin(rot);
        offsets[ri].forEach((o) => {
          const a = o + t * ring.speed;
          const ex = Math.cos(a) * rx;
          const ey = Math.sin(a) * ry;
          nodes.push({ x: cx + ex * cr - ey * sr, y: cy + ex * sr + ey * cr, front: Math.sin(a) > 0, c: ring.c });
        });
      });

      // Connections between nearby members
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 170) {
            ctx.strokeStyle = rgba(mix(nodes[i].c, nodes[j].c, 0.5), (1 - d / 170) * 0.35);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Core
      const pulse = 1 + Math.sin(t * 2) * 0.08;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.22 * pulse);
      g.addColorStop(0, rgba(WHITE, 0.9));
      g.addColorStop(0.25, rgba(CYAN, 0.6));
      g.addColorStop(1, rgba(BLUE, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, base * 0.22 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Members (avatars)
      for (const n of nodes) {
        const r = n.front ? 7 : 4.5;
        ctx.fillStyle = rgba(n.c, n.front ? 0.22 : 0.08);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(mix(n.c, WHITE, 0.35), n.front ? 0.95 : 0.4);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}

/* ── Code: soft rain of code characters ── */
function codeScene(): Scene {
  const GLYPHS = '{}[]()<>/=+;:01const let fn => async await return import export </> && || ?.'.split('');
  const STEP = 22;
  const TRAIL = 12;
  let cols: { y: number; speed: number; chars: string[]; c: RGB }[] = [];
  let H = 0;
  const pick = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
  return {
    resize(w, h) {
      H = h;
      const n = Math.ceil(w / STEP);
      cols = Array.from({ length: n }, () => ({
        y: Math.random() * h,
        speed: 40 + Math.random() * 90,
        chars: Array.from({ length: TRAIL }, pick),
        c: Math.random() < 0.3 ? VIOLET : Math.random() < 0.5 ? CYAN : BLUE,
      }));
    },
    draw(ctx, _t, dt, m) {
      ctx.font = '14px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      cols.forEach((col, i) => {
        col.y += col.speed * dt;
        if (col.y - TRAIL * 18 > H) {
          col.y = -Math.random() * 200;
          col.speed = 40 + Math.random() * 90;
        }
        if (Math.random() < 0.04) col.chars[(Math.random() * TRAIL) | 0] = pick();
        const x = i * STEP + STEP / 2;
        const near = m.active ? Math.max(0, 1 - Math.abs(m.x - x) / 160) : 0;
        for (let k = 0; k < TRAIL; k++) {
          const y = col.y - k * 18;
          if (y < -20 || y > H + 20) continue;
          const fade = 1 - k / TRAIL;
          const head = k === 0;
          ctx.fillStyle = head ? rgba(WHITE, 0.75 + near * 0.25) : rgba(col.c, fade * (0.32 + near * 0.5));
          ctx.fillText(col.chars[k], x, y);
        }
      });
    },
  };
}

/* ── Stars: calm warp through a starfield ── */
function starsScene(): Scene {
  let stars: { x: number; y: number; z: number; pz: number; c: RGB }[] = [];
  const DEPTH = 1000;
  const make = (fresh: boolean) => {
    const z = fresh ? Math.random() * DEPTH : DEPTH;
    return { x: (Math.random() - 0.5) * 2000, y: (Math.random() - 0.5) * 1400, z, pz: z, c: Math.random() < 0.2 ? CYAN : Math.random() < 0.3 ? VIOLET : WHITE };
  };
  return {
    resize(w, h) {
      const n = Math.min(500, Math.floor((w * h) / 3500));
      stars = Array.from({ length: n }, () => make(true));
    },
    draw(ctx, _t, dt, m, w, h) {
      const cx = w / 2 + (m.active ? (m.x - w / 2) * 0.15 : 0);
      const cy = h / 2 + (m.active ? (m.y - h / 2) * 0.15 : 0);
      const f = Math.min(w, h) * 0.9;
      const speed = 160;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= speed * dt;
        if (s.z < 1) {
          stars[i] = make(false);
          continue;
        }
        const sx = cx + (s.x / s.z) * f * 0.5;
        const sy = cy + (s.y / s.z) * f * 0.5;
        const px = cx + (s.x / s.pz) * f * 0.5;
        const py = cy + (s.y / s.pz) * f * 0.5;
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) {
          stars[i] = make(false);
          continue;
        }
        const near = 1 - s.z / DEPTH;
        ctx.strokeStyle = rgba(s.c, near * 0.9);
        ctx.lineWidth = Math.max(0.5, near * 2.4);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    },
  };
}

function makeScene(variant: HeroVariant, accent: RGB): Scene {
  switch (variant) {
    case 'aurora':
      return auroraScene(accent);
    case 'grid':
      return gridScene();
    case 'sparks':
      return sparksScene(accent);
    case 'globe':
      return globeScene();
    case 'streams':
      return streamsScene();
    case 'hex':
      return hexScene();
    case 'ripples':
      return ripplesScene();
    case 'orbits':
      return orbitsScene();
    case 'code':
      return codeScene();
    case 'stars':
      return starsScene();
    case 'network':
    default:
      return networkScene();
  }
}

interface HeroCanvasProps {
  variant: HeroVariant;
  /** Hex colour used by accent-aware scenes (aurora, sparks). */
  accent?: string;
  className?: string;
  trackRef?: React.RefObject<HTMLElement>;
}

export default function HeroCanvas({ variant, accent = '#3B82F6', className, trackRef }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const scene = makeScene(variant, hexToRgb(accent));
    const pointer: Pointer = { x: 0, y: 0, active: false };
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const t0 = last;

    const frame = (now: number, still = false) => {
      const dt = still ? 0.016 : Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      // rAF timestamps can be slightly earlier than t0 on the first frame — never pass negative time
      scene.draw(ctx, Math.max(0, (now - t0) / 1000), dt, pointer, w, h);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scene.resize(w, h);
    };

    const loop = (now: number) => {
      frame(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (reduce || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const still = () => frame(t0 + 6000, true);

    resize();
    if (reduce) still();
    else play();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) still();
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
      pointer.x = pe.clientX - rect.left;
      pointer.y = pe.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    target.addEventListener('pointermove', onMove, { passive: true });
    target.addEventListener('pointerleave', onLeave);

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      target.removeEventListener('pointermove', onMove);
      target.removeEventListener('pointerleave', onLeave);
    };
  }, [variant, accent, reduce, trackRef]);

  return <canvas ref={canvasRef} aria-hidden className={cn('pointer-events-none block h-full w-full', className)} />;
}

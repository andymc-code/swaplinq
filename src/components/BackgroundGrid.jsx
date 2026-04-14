import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/* ──────────────────────────────────────────────────
   BackgroundGrid — Vanishing-point perspective grid
   with ambient green glow and floating particles.
   Renders behind the hero / main content.
   ────────────────────────────────────────────────── */

const PARTICLE_COUNT = 14;

const BackgroundGrid = () => {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      opacity: 0.08 + Math.random() * 0.2,
      driftX: -20 + Math.random() * 40,
      driftY: -30 + Math.random() * 30,
    }));
  }, []);

  return (
    <div className="bg-grid-container" aria-hidden="true">
      {/* ── Perspective Grid (CSS-rendered) ── */}
      <div className="bg-perspective-grid" />

      {/* ── Ambient green glow beneath swap widget area ── */}
      <div className="bg-ambient-glow bg-ambient-glow--hero" />
      <div className="bg-ambient-glow bg-ambient-glow--mid" />

      {/* ── Floating particles ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="bg-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
            opacity: [p.opacity, p.opacity + 0.15, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundGrid;

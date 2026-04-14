import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/* ──────────────────────────────────────────────────
   HeroGlobe — Animated network sphere with crypto
   tokens orbiting around it. Pure CSS/SVG approach
   for performance (no Three.js dependency).
   ────────────────────────────────────────────────── */

const TOKEN_LOGOS = [
  { symbol: 'BTC', color: '#F7931A', logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/BTC.svg' },
  { symbol: 'ETH', color: '#627EEA', logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/ETH.svg' },
  { symbol: 'SOL', color: '#14F195', logo: 'https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/SOL.svg' },
];

/* Generate latitude/longitude points for the wireframe */
const generateSpherePoints = (count, radius) => {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * radiusAtY * radius,
      y: y * radius,
      z: Math.sin(theta) * radiusAtY * radius,
    });
  }
  return points;
};

/* Render wireframe circles (meridians & parallels) */
const WireframeSphere = ({ size }) => {
  const r = size / 2;
  const meridians = 6;
  const parallels = 5;

  return (
    <svg
      viewBox={`${-r - 10} ${-r - 10} ${size + 20} ${size + 20}`}
      className="globe-wireframe"
      style={{ width: size, height: size }}
    >
      <defs>
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0, 230, 118, 0.15)" />
          <stop offset="70%" stopColor="rgba(0, 230, 118, 0.03)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <circle cx="0" cy="0" r={r * 1.1} fill="url(#globe-glow)" />

      {/* Parallels (horizontal rings) */}
      {Array.from({ length: parallels }).map((_, i) => {
        const y = -r + ((i + 1) / (parallels + 1)) * 2 * r;
        const ringR = Math.sqrt(r * r - y * y);
        return (
          <ellipse
            key={`p-${i}`}
            cx="0"
            cy={y}
            rx={ringR}
            ry={ringR * 0.3}
            fill="none"
            stroke="rgba(0, 230, 118, 0.12)"
            strokeWidth="0.7"
          />
        );
      })}

      {/* Meridians (vertical arcs) */}
      {Array.from({ length: meridians }).map((_, i) => {
        const angle = (i / meridians) * 180;
        return (
          <ellipse
            key={`m-${i}`}
            cx="0"
            cy="0"
            rx={Math.cos((angle * Math.PI) / 180) * r}
            ry={r}
            fill="none"
            stroke="rgba(0, 230, 118, 0.1)"
            strokeWidth="0.7"
            transform={`rotate(0)`}
          />
        );
      })}

      {/* Outer ring */}
      <circle cx="0" cy="0" r={r} fill="none" stroke="rgba(0, 230, 118, 0.2)" strokeWidth="1" />
    </svg>
  );
};

/* Connection line component */
const ConnectionLine = ({ x1, y1, x2, y2, delay }) => (
  <motion.line
    x1={x1} y1={y1} x2={x2} y2={y2}
    stroke="rgba(0, 230, 118, 0.15)"
    strokeWidth="0.5"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: 2,
      ease: 'easeInOut',
    }}
  />
);

const HeroGlobe = () => {
  const sphereSize = 320;
  const nodes = useMemo(() => generateSpherePoints(24, sphereSize / 2 - 20), []);

  return (
    <div className="hero-globe-container">
      {/* Ambient glow behind globe */}
      <div className="globe-ambient-glow" />

      {/* Rotating sphere wrapper */}
      <motion.div
        className="globe-sphere-wrap"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <WireframeSphere size={sphereSize} />

        {/* Network nodes (dots on sphere surface) */}
        {nodes.map((point, i) => {
          const scale = (point.z + sphereSize / 2) / sphereSize; // depth-based sizing
          const opacity = 0.2 + scale * 0.6;
          return (
            <motion.div
              key={i}
              className="globe-node"
              style={{
                left: `calc(50% + ${point.x}px)`,
                top: `calc(50% + ${point.y}px)`,
                width: 3 + scale * 3,
                height: 3 + scale * 3,
                opacity,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [opacity, opacity + 0.2, opacity],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </motion.div>

      {/* Orbiting token icons */}
      {TOKEN_LOGOS.map((token, i) => {
        const orbitRadius = sphereSize / 2 + 30 + i * 22;
        const duration = 12 + i * 4;
        const startAngle = (i * 120) * (Math.PI / 180);
        
        return (
          <motion.div
            key={token.symbol}
            className="globe-orbit-token"
            style={{
              '--orbit-radius': `${orbitRadius}px`,
              '--orbit-duration': `${duration}s`,
              '--orbit-delay': `${-i * 4}s`,
              '--token-color': token.color,
            }}
          >
            <div className="globe-token-inner">
              <img src={token.logo} alt={token.symbol} className="globe-token-icon" />
              <span className="globe-token-label">{token.symbol}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Pulsing ring effects */}
      <motion.div
        className="globe-pulse-ring"
        animate={{
          scale: [1, 1.6],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
      <motion.div
        className="globe-pulse-ring"
        animate={{
          scale: [1, 1.8],
          opacity: [0.2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 1.5,
        }}
      />
    </div>
  );
};

export default HeroGlobe;

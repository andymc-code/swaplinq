import React from 'react';
import { motion } from 'framer-motion';

/* ──────────────────────────────────────────────────
   Step Illustrations — Bespoke SVG illustrations
   for the How It Works section. Each illustration 
   visually represents the action of that step.
   ────────────────────────────────────────────────── */

/* Step 1: Two coins swapping — token exchange visual */
export const SwapCoinsIllustration = () => (
  <svg viewBox="0 0 120 100" className="step-illustration" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left coin */}
    <motion.g
      animate={{ x: [0, 16, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <circle cx="38" cy="50" r="22" fill="rgba(247, 147, 26, 0.15)" stroke="#F7931A" strokeWidth="1.5" />
      <circle cx="38" cy="50" r="16" fill="rgba(247, 147, 26, 0.08)" stroke="rgba(247, 147, 26, 0.4)" strokeWidth="0.5" />
      <text x="38" y="54" textAnchor="middle" fill="#F7931A" fontSize="11" fontWeight="700" fontFamily="'JetBrains Mono', monospace">₿</text>
    </motion.g>

    {/* Right coin */}
    <motion.g
      animate={{ x: [0, -16, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <circle cx="82" cy="50" r="22" fill="rgba(98, 126, 234, 0.15)" stroke="#627EEA" strokeWidth="1.5" />
      <circle cx="82" cy="50" r="16" fill="rgba(98, 126, 234, 0.08)" stroke="rgba(98, 126, 234, 0.4)" strokeWidth="0.5" />
      <text x="82" y="54" textAnchor="middle" fill="#627EEA" fontSize="11" fontWeight="700" fontFamily="'JetBrains Mono', monospace">Ξ</text>
    </motion.g>

    {/* Swap arrows */}
    <motion.g
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M52 42 L68 42" stroke="#00e676" strokeWidth="1.2" strokeDasharray="2 2" />
      <path d="M66 39 L70 42 L66 45" stroke="#00e676" strokeWidth="1.2" fill="none" />
      <path d="M68 58 L52 58" stroke="#00e676" strokeWidth="1.2" strokeDasharray="2 2" />
      <path d="M54 55 L50 58 L54 61" stroke="#00e676" strokeWidth="1.2" fill="none" />
    </motion.g>
  </svg>
);

/* Step 2: Wallet address — a wallet with address hash */
export const WalletAddressIllustration = () => (
  <svg viewBox="0 0 120 100" className="step-illustration" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Wallet body */}
    <rect x="20" y="30" rx="8" ry="8" width="80" height="50" fill="rgba(0, 230, 118, 0.06)" stroke="rgba(0, 230, 118, 0.3)" strokeWidth="1.2" />
    
    {/* Wallet flap */}
    <path d="M20 38 Q20 30 28 30 L92 30 Q100 30 100 38" fill="none" stroke="rgba(0, 230, 118, 0.4)" strokeWidth="1.2" />
    <path d="M20 30 L20 25 Q20 20 28 20 L70 20 Q78 20 78 28 L78 30" fill="rgba(0, 230, 118, 0.04)" stroke="rgba(0, 230, 118, 0.25)" strokeWidth="1" />

    {/* Card slot */}
    <rect x="72" y="48" rx="4" ry="4" width="20" height="14" fill="rgba(0, 230, 118, 0.12)" stroke="rgba(0, 230, 118, 0.4)" strokeWidth="0.8" />
    <circle cx="82" cy="55" r="3" fill="rgba(0, 230, 118, 0.3)" stroke="#00e676" strokeWidth="0.6" />

    {/* Address hash text */}
    <motion.g
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <text x="30" y="50" fill="rgba(0, 230, 118, 0.6)" fontSize="6" fontFamily="'JetBrains Mono', monospace">0x7F2b...</text>
      <text x="30" y="60" fill="rgba(0, 230, 118, 0.4)" fontSize="6" fontFamily="'JetBrains Mono', monospace">a9cE4d</text>
    </motion.g>

    {/* Scan line animation */}
    <motion.line
      x1="27" y1="44" x2="65" y2="44"
      stroke="#00e676"
      strokeWidth="0.5"
      opacity="0.4"
      animate={{ y1: [44, 72, 44], y2: [44, 72, 44] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  </svg>
);

/* Step 3: Coin in flight — arc trajectory */
export const CoinFlightIllustration = () => (
  <svg viewBox="0 0 120 100" className="step-illustration" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Source dot */}
    <circle cx="20" cy="72" r="6" fill="rgba(0, 230, 118, 0.15)" stroke="rgba(0, 230, 118, 0.4)" strokeWidth="1" />
    <circle cx="20" cy="72" r="2" fill="#00e676" />

    {/* Destination dot */}
    <circle cx="100" cy="72" r="6" fill="rgba(41, 121, 255, 0.15)" stroke="rgba(41, 121, 255, 0.4)" strokeWidth="1" />
    <circle cx="100" cy="72" r="2" fill="#2979ff" />

    {/* Flight arc path */}
    <path d="M20 72 Q60 10 100 72" stroke="rgba(0, 230, 118, 0.2)" strokeWidth="1" strokeDasharray="3 3" fill="none" />

    {/* Animated coin along arc */}
    <motion.g
      animate={{
        offsetDistance: ['0%', '100%'],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94],
        repeatDelay: 1,
      }}
      style={{
        offsetPath: 'path("M20 72 Q60 10 100 72")',
        offsetRotate: '0deg',
      }}
    >
      <circle r="8" fill="rgba(0, 230, 118, 0.2)" stroke="#00e676" strokeWidth="1.2" />
      <text y="3" textAnchor="middle" fill="#00e676" fontSize="7" fontWeight="700">↗</text>
    </motion.g>

    {/* Trail particles */}
    {[0, 1, 2].map(i => (
      <motion.circle
        key={i}
        r="1.5"
        fill="#00e676"
        opacity="0"
        animate={{
          offsetDistance: ['0%', '100%'],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.3,
          repeatDelay: 1,
        }}
        style={{
          offsetPath: 'path("M20 72 Q60 10 100 72")',
          offsetRotate: '0deg',
        }}
      />
    ))}

    {/* Speed lines */}
    <motion.g
      animate={{ opacity: [0, 0.5, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
    >
      <line x1="40" y1="40" x2="50" y2="36" stroke="rgba(0, 230, 118, 0.3)" strokeWidth="0.5" />
      <line x1="55" y1="28" x2="65" y2="26" stroke="rgba(0, 230, 118, 0.3)" strokeWidth="0.5" />
      <line x1="70" y1="30" x2="78" y2="34" stroke="rgba(0, 230, 118, 0.3)" strokeWidth="0.5" />
    </motion.g>
  </svg>
);

/* Step 4: Checkmark with arriving assets */
export const ReceiveAssetsIllustration = () => (
  <svg viewBox="0 0 120 100" className="step-illustration" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shield / check circle */}
    <motion.circle
      cx="60" cy="50" r="30"
      fill="rgba(0, 230, 118, 0.06)"
      stroke="rgba(0, 230, 118, 0.3)"
      strokeWidth="1.5"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.circle
      cx="60" cy="50" r="22"
      fill="rgba(0, 230, 118, 0.08)"
      stroke="rgba(0, 230, 118, 0.2)"
      strokeWidth="0.8"
    />

    {/* Animated checkmark */}
    <motion.path
      d="M48 50 L56 58 L74 42"
      stroke="#00e676"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Radiating particles */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 60 + Math.cos(rad) * 38;
      const y = 50 + Math.sin(rad) * 38;
      return (
        <motion.circle
          key={i}
          cx={x} cy={y}
          r="2"
          fill="#00e676"
          animate={{
            r: [1, 2.5, 1],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      );
    })}

    {/* Arriving coins animation */}
    <motion.g
      animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <circle cx="25" cy="28" r="5" fill="rgba(247, 147, 26, 0.2)" stroke="#F7931A" strokeWidth="0.8" />
      <text x="25" y="30.5" textAnchor="middle" fill="#F7931A" fontSize="5" fontWeight="700">₿</text>
    </motion.g>
    <motion.g
      animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
    >
      <circle cx="95" cy="28" r="5" fill="rgba(98, 126, 234, 0.2)" stroke="#627EEA" strokeWidth="0.8" />
      <text x="95" y="30.5" textAnchor="middle" fill="#627EEA" fontSize="5" fontWeight="700">Ξ</text>
    </motion.g>
  </svg>
);

/* Map of step index to illustration component */
export const STEP_ILLUSTRATIONS = [
  SwapCoinsIllustration,
  WalletAddressIllustration,
  CoinFlightIllustration,
  ReceiveAssetsIllustration,
];

export default STEP_ILLUSTRATIONS;

import React from 'react';
import { motion } from 'framer-motion';

/* ──────────────────────────────────────────────────
   Custom Feature Icons — Hand-crafted SVG icons
   for the Trust & Guarantee section. Each icon is
   unique and bespoke vs generic Lucide icons.
   ────────────────────────────────────────────────── */

/* Non-Custodial: A key with decentralized nodes */
export const KeyIcon = ({ color = '#00e676' }) => (
  <svg viewBox="0 0 40 40" fill="none" className="custom-feature-icon">
    {/* Key head (circle) */}
    <circle cx="14" cy="14" r="8" stroke={color} strokeWidth="1.5" fill={`${color}10`} />
    <circle cx="14" cy="14" r="3" stroke={color} strokeWidth="1" fill="none" />
    
    {/* Key shaft */}
    <line x1="20" y1="18" x2="34" y2="32" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Key teeth */}
    <line x1="28" y1="26" x2="32" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="31" y1="29" x2="35" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Decentralized dots */}
    <motion.circle
      cx="8" cy="6" r="1.5" fill={color}
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.circle
      cx="20" cy="8" r="1.5" fill={color}
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    />
  </svg>
);

/* Anonymity: Ghost / mask face */
export const GhostMaskIcon = ({ color = '#00e5ff' }) => (
  <svg viewBox="0 0 40 40" fill="none" className="custom-feature-icon">
    {/* Ghost body */}
    <path 
      d="M10 22 L10 16 Q10 6 20 6 Q30 6 30 16 L30 22 Q30 34 26 30 Q22 26 20 30 Q18 34 14 30 Q10 26 10 22Z"
      fill={`${color}10`} 
      stroke={color} 
      strokeWidth="1.3"
    />
    
    {/* Eyes */}
    <motion.g
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <circle cx="16" cy="16" r="2" fill={color} />
      <circle cx="24" cy="16" r="2" fill={color} />
    </motion.g>
    
    {/* Invisibility effect lines */}
    <motion.g
      animate={{ opacity: [0, 0.5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <line x1="6" y1="12" x2="8" y2="12" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <line x1="32" y1="12" x2="34" y2="12" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <line x1="5" y1="18" x2="8" y2="18" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <line x1="32" y1="18" x2="35" y2="18" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
    </motion.g>
  </svg>
);

/* Fixed Rates: Padlock with price tag */
export const LockPriceIcon = ({ color = '#2979ff' }) => (
  <svg viewBox="0 0 40 40" fill="none" className="custom-feature-icon">
    {/* Lock body */}
    <rect x="10" y="18" rx="3" ry="3" width="20" height="16" fill={`${color}10`} stroke={color} strokeWidth="1.3" />
    
    {/* Lock shackle */}
    <path d="M14 18 L14 12 Q14 6 20 6 Q26 6 26 12 L26 18" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Keyhole */}
    <circle cx="20" cy="25" r="2" fill={color} />
    <line x1="20" y1="27" x2="20" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Price tag */}
    <motion.g
      animate={{ y: [0, -1.5, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="27" y="5" rx="2" ry="2" width="10" height="14" fill={`${color}15`} stroke={color} strokeWidth="0.8" />
      <text x="32" y="14" textAnchor="middle" fill={color} fontSize="6" fontWeight="700" fontFamily="'JetBrains Mono', monospace">$</text>
      <circle cx="32" cy="7" r="1" fill={color} />
    </motion.g>
  </svg>
);

/* 24/7 Support: Headset with signal waves */
export const HeadsetIcon = ({ color = '#7c4dff' }) => (
  <svg viewBox="0 0 40 40" fill="none" className="custom-feature-icon">
    {/* Arc headband */}
    <path d="M8 22 L8 18 Q8 6 20 6 Q32 6 32 18 L32 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Left earpiece */}
    <rect x="4" y="20" rx="3" ry="3" width="8" height="12" fill={`${color}15`} stroke={color} strokeWidth="1.2" />
    
    {/* Right earpiece */}
    <rect x="28" y="20" rx="3" ry="3" width="8" height="12" fill={`${color}15`} stroke={color} strokeWidth="1.2" />
    
    {/* Microphone */}
    <path d="M12 32 Q12 36 18 36 L22 36" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="22" cy="36" r="2" fill={`${color}20`} stroke={color} strokeWidth="0.8" />
    
    {/* Signal waves */}
    <motion.g
      animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M24 12 Q26 10 28 12" fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
    </motion.g>
    <motion.g
      animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    >
      <path d="M26 10 Q29 6 32 10" fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
    </motion.g>
  </svg>
);

/* Stat icons — bespoke for each metric */

/* Assets Supported: Stacked layers */
export const LayersStatIcon = ({ color = '#00e676' }) => (
  <svg viewBox="0 0 48 48" fill="none" className="stat-custom-icon">
    <motion.g
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ellipse cx="24" cy="30" rx="16" ry="5" fill={`${color}10`} stroke={color} strokeWidth="1" />
      <ellipse cx="24" cy="24" rx="16" ry="5" fill={`${color}15`} stroke={color} strokeWidth="1" />
      <ellipse cx="24" cy="18" rx="16" ry="5" fill={`${color}20`} stroke={color} strokeWidth="1.2" />
    </motion.g>
  </svg>
);

/* Completed Swaps: Circular exchange arrows */
export const SwapCircleIcon = ({ color = '#00e676' }) => (
  <svg viewBox="0 0 48 48" fill="none" className="stat-custom-icon">
    <circle cx="24" cy="24" r="16" fill={`${color}08`} stroke={`${color}30`} strokeWidth="1" />
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '24px 24px' }}
    >
      <path d="M16 20 Q24 12 32 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 18 L33 20 L30 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 28 Q24 36 16 28" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 30 L15 28 L18 26" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
  </svg>
);

/* Speed: Lightning / clock hybrid */
export const SpeedIcon = ({ color = '#00e676' }) => (
  <svg viewBox="0 0 48 48" fill="none" className="stat-custom-icon">
    <circle cx="24" cy="24" r="16" fill={`${color}08`} stroke={`${color}30`} strokeWidth="1" />
    <motion.path
      d="M22 12 L18 24 L24 24 L20 36 L32 20 L26 20 L30 12Z"
      fill={`${color}25`}
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
      animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1, 0.95] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '24px 24px' }}
    />
  </svg>
);

/* Rating: Star with sparkle */
export const StarRatingIcon = ({ color = '#00e676' }) => (
  <svg viewBox="0 0 48 48" fill="none" className="stat-custom-icon">
    <motion.g
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '24px 24px' }}
    >
      <path
        d="M24 10 L27.5 18 L36 19.5 L30 26 L31.5 35 L24 30.5 L16.5 35 L18 26 L12 19.5 L20.5 18Z"
        fill={`${color}20`}
        stroke={color}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </motion.g>
    {/* Sparkle dots */}
    <motion.circle cx="37" cy="13" r="1.5" fill={color}
      animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
    />
    <motion.circle cx="11" cy="13" r="1" fill={color}
      animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
    />
    <motion.circle cx="38" cy="30" r="1" fill={color}
      animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
    />
  </svg>
);

/* CTA Section illustrations */

/* Shield illustration for CTA left side */
export const CTAShieldIllustration = () => (
  <svg viewBox="0 0 140 160" fill="none" className="cta-illustration cta-illustration-left">
    <defs>
      <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(0, 230, 118, 0.3)" />
        <stop offset="100%" stopColor="rgba(0, 230, 118, 0.05)" />
      </linearGradient>
    </defs>
    
    {/* Outer glow */}
    <motion.ellipse
      cx="70" cy="80" rx="55" ry="60"
      fill="rgba(0, 230, 118, 0.04)"
      animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    
    {/* Shield shape */}
    <motion.path
      d="M70 20 L110 40 L110 80 Q110 120 70 145 Q30 120 30 80 L30 40Z"
      fill="url(#shield-grad)"
      stroke="rgba(0, 230, 118, 0.4)"
      strokeWidth="1.5"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '70px 82px' }}
    />
    
    {/* Inner shield */}
    <path
      d="M70 35 L100 50 L100 80 Q100 110 70 130 Q40 110 40 80 L40 50Z"
      fill="rgba(0, 230, 118, 0.06)"
      stroke="rgba(0, 230, 118, 0.2)"
      strokeWidth="0.8"
    />
    
    {/* Lock icon inside */}
    <rect x="58" y="68" rx="3" ry="3" width="24" height="20" fill="rgba(0, 230, 118, 0.15)" stroke="rgba(0, 230, 118, 0.5)" strokeWidth="1" />
    <path d="M63 68 L63 62 Q63 55 70 55 Q77 55 77 62 L77 68" fill="none" stroke="rgba(0, 230, 118, 0.5)" strokeWidth="1.2" />
    <motion.circle
      cx="70" cy="78" r="2.5" fill="#00e676"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    
    {/* Floating particles */}
    {[
      { cx: 25, cy: 50, r: 2 },
      { cx: 115, cy: 60, r: 1.5 },
      { cx: 20, cy: 100, r: 1.5 },
      { cx: 120, cy: 100, r: 2 },
    ].map((p, i) => (
      <motion.circle
        key={i}
        cx={p.cx} cy={p.cy} r={p.r}
        fill="#00e676"
        animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
      />
    ))}
  </svg>
);

/* Network nodes for CTA right side */
export const CTANetworkIllustration = () => (
  <svg viewBox="0 0 140 160" fill="none" className="cta-illustration cta-illustration-right">
    {/* Central node */}
    <motion.circle
      cx="70" cy="80" r="10"
      fill="rgba(0, 230, 118, 0.2)"
      stroke="#00e676"
      strokeWidth="1.2"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <circle cx="70" cy="80" r="4" fill="#00e676" />

    {/* Satellite nodes */}
    {[
      { cx: 30, cy: 40, r: 6, delay: 0 },
      { cx: 110, cy: 45, r: 5, delay: 0.3 },
      { cx: 110, cy: 115, r: 6, delay: 0.6 },
      { cx: 30, cy: 120, r: 5, delay: 0.9 },
      { cx: 70, cy: 25, r: 4, delay: 1.2 },
      { cx: 70, cy: 140, r: 4, delay: 1.5 },
    ].map((node, i) => (
      <g key={i}>
        {/* Connection line */}
        <motion.line
          x1="70" y1="80" x2={node.cx} y2={node.cy}
          stroke="rgba(0, 230, 118, 0.15)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }}
        />
        
        {/* Node */}
        <motion.circle
          cx={node.cx} cy={node.cy} r={node.r}
          fill="rgba(0, 230, 118, 0.1)"
          stroke="rgba(0, 230, 118, 0.4)"
          strokeWidth="0.8"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={node.cx} cy={node.cy} r={node.r * 0.4}
          fill="#00e676"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }}
        />
      </g>
    ))}

    {/* Data pulse animations along connections */}
    {[
      { x1: 70, y1: 80, x2: 30, y2: 40, delay: 0.5 },
      { x1: 70, y1: 80, x2: 110, y2: 45, delay: 1 },
      { x1: 70, y1: 80, x2: 110, y2: 115, delay: 1.5 },
    ].map((line, i) => (
      <motion.circle
        key={`pulse-${i}`}
        r="2"
        fill="#00e676"
        animate={{
          cx: [line.x1, line.x2],
          cy: [line.y1, line.y2],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: line.delay,
          ease: 'easeInOut',
          repeatDelay: 1,
        }}
      />
    ))}
  </svg>
);

export const GUARANTEE_ICONS = {
  'Non-Custodial': KeyIcon,
  'Total Anonymity': GhostMaskIcon,
  'Fixed Rates': LockPriceIcon,
  '24/7 Support': HeadsetIcon,
};

export const STAT_ICONS = {
  'Assets Supported': LayersStatIcon,
  'Completed Swaps': SwapCircleIcon,
  'Avg. Duration': SpeedIcon,
  'User Rating': StarRatingIcon,
};

/**
 * GeometricPattern — Animated SVG Islamic geometric pattern.
 *
 * Renders an interlocking octagonal star pattern typical of Islamic art,
 * animated with a gentle drift/shimmer effect using CSS transforms.
 * Uses only compositor-friendly properties (transform, opacity) for 60fps.
 *
 * prefers-reduced-motion: all animation is disabled via globals.css rules.
 */

export default function GeometricPattern() {
  // Generate a repeating Islamic star pattern using SVG paths
  // The pattern is tiled 2x to enable the infinite scrolling illusion
  return (
    <div className="geometric-overlay" aria-hidden="true">
      {/* Layer 1: Primary pattern drifting */}
      <svg
        className="absolute w-[200%] h-[200%] animate-geometric-drift opacity-[0.07]"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: "transform" }}
      >
        <defs>
          <pattern
            id="islamicStar"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-pointed star built from overlapping squares and lines */}
            <g fill="none" stroke="currentColor" strokeWidth="0.8">
              {/* Outer octagon */}
              <polygon points="50,5 80,20 95,50 80,80 50,95 20,80 5,50 20,20" />
              {/* Inner octagon */}
              <polygon points="50,20 70,30 80,50 70,70 50,80 30,70 20,50 30,30" />
              {/* Cross lines creating the 8-pointed star */}
              <line x1="50" y1="5" x2="50" y2="20" />
              <line x1="50" y1="80" x2="50" y2="95" />
              <line x1="5" y1="50" x2="20" y2="50" />
              <line x1="80" y1="50" x2="95" y2="50" />
              <line x1="80" y1="20" x2="70" y2="30" />
              <line x1="20" y1="20" x2="30" y2="30" />
              <line x1="80" y1="80" x2="70" y2="70" />
              <line x1="20" y1="80" x2="30" y2="70" />
              {/* Diamond overlay for interlocking effect */}
              <polygon points="50,30 60,50 50,70 40,50" />
            </g>
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#islamicStar)" className="text-gold" />
      </svg>

      {/* Layer 2: Offset pattern for depth, opposite drift */}
      <svg
        className="absolute w-[200%] h-[200%] animate-geometric-drift-reverse opacity-[0.04]"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: "transform", top: "-25%", left: "-25%" }}
      >
        <defs>
          <pattern
            id="islamicStarAlt"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="currentColor" strokeWidth="0.6">
              {/* Smaller interlocking pattern */}
              <polygon points="40,4 64,16 76,40 64,64 40,76 16,64 4,40 16,16" />
              <polygon points="40,16 56,24 64,40 56,56 40,64 24,56 16,40 24,24" />
              <line x1="40" y1="4" x2="40" y2="16" />
              <line x1="40" y1="64" x2="40" y2="76" />
              <line x1="4" y1="40" x2="16" y2="40" />
              <line x1="64" y1="40" x2="76" y2="40" />
            </g>
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#islamicStarAlt)" className="text-cream" />
      </svg>

      {/* Layer 3: Subtle shimmer overlay */}
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-br from-gold/5 via-transparent to-gold/3" />
    </div>
  );
}

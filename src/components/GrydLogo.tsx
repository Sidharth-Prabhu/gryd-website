import React from 'react';

interface GrydLogoProps {
  className?: string;
  size?: number;
  useImage?: boolean;
}

export const GrydLogo: React.FC<GrydLogoProps> = ({ 
  className = "w-7 h-7", 
  size,
  useImage = false 
}) => {
  if (useImage) {
    return (
      <img
        src="/logo.png"
        alt="Gryd Logo"
        className={`${className} object-contain`}
        style={size ? { width: size, height: size } : undefined}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Gryd Logo"
    >
      {/* 8 Grid Squares forming G */}
      {/* Row 0 */}
      <rect x="134" y="143" width="146" height="146" />
      <rect x="439" y="143" width="146" height="146" />
      <rect x="744" y="143" width="146" height="146" />

      {/* Row 1 */}
      <rect x="134" y="439" width="146" height="146" />
      <rect x="439" y="439" width="146" height="146" />
      <rect x="744" y="439" width="146" height="146" />

      {/* Row 2 */}
      <rect x="134" y="735" width="146" height="146" />
      <rect x="439" y="735" width="146" height="146" />
      <rect x="744" y="735" width="146" height="146" />

      {/* Horizontal Bus Lines */}
      {/* Top connector (0,0)-(1,0) and (1,0)-(2,0) */}
      <rect x="280" y="194" width="159" height="44" />
      <rect x="585" y="194" width="159" height="44" />

      {/* Mid horizontal connector (1,1)-(2,1) */}
      <rect x="585" y="490" width="159" height="44" />

      {/* Bottom horizontal connector (0,2)-(1,2) and (1,2)-(2,2) */}
      <rect x="280" y="786" width="159" height="44" />
      <rect x="585" y="786" width="159" height="44" />

      {/* Vertical Bus Lines */}
      {/* Left vertical connector (0,0)-(0,1) and (0,1)-(0,2) */}
      <rect x="185" y="289" width="44" height="150" />
      <rect x="185" y="585" width="44" height="150" />

      {/* Right vertical connector (2,1)-(2,2) */}
      <rect x="795" y="585" width="44" height="150" />
    </svg>
  );
};

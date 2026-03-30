interface ExclusiveLogoProps {
  className?: string;
}

const ExclusiveLogo = ({ className = "" }: ExclusiveLogoProps) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Purple gradient for left shapes */}
        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b1c7e" />
          <stop offset="100%" stopColor="#5d0f47" />
        </linearGradient>
        
        {/* Orange gradient for right shapes */}
        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="50%" stopColor="#e8503a" />
          <stop offset="100%" stopColor="#cc4628" />
        </linearGradient>
      </defs>
      
      {/* Top left crescent */}
      <path
        d="M 50 80 Q 60 50, 75 55 Q 65 65, 60 80 Z"
        fill="url(#purpleGrad)"
      />
      
      {/* Top right arrow */}
      <path
        d="M 110 30 L 150 80 L 130 80 L 130 85 L 110 85 Z"
        fill="url(#orangeGrad)"
      />
      
      {/* Bottom left triangle */}
      <path
        d="M 40 110 L 95 110 L 65 165 Z"
        fill="url(#purpleGrad)"
      />
      
      {/* Bottom right triangle */}
      <path
        d="M 105 110 L 160 110 L 135 165 Z"
        fill="url(#orangeGrad)"
      />
      
      {/* Center horizontal line */}
      <rect
        x="50"
        y="95"
        width="100"
        height="4"
        fill="url(#purpleGrad)"
      />
    </svg>
  );
};

export default ExclusiveLogo;

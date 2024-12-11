import React, { useState } from "react";
import { motion } from "framer-motion";

const MotionFace = ({ isPasswordFocus, getEyeTransform, setUsernameCursorX, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`motion-face ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.1 : 1, // hover 시 크기 증가
        rotate: isHovered ? 360 : 0, // hover 시 회전 효과
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg width="100" height="100" viewBox="0 0 24 24">
        {/* Rounder, larger bear ears */}
        {/* <circle cx="5" cy="5" r="4" fill="#FFD966" /> */}
        {/* <circle cx="19" cy="5" r="4" fill="#FFD966" /> */}
        {/* Rounder face */}
        <circle cx="12" cy="12" r="10" fill="#FFD966" />
        {/* Eyes */}
        {isPasswordFocus ? (
          <>
            {/* Closed eyes with softer U shape */}
            <path d="M7,10 Q8,11.5 9,10" stroke="#333" strokeWidth="0.5" fill="none" />
            <path d="M15,10 Q16,11.5 17,10" stroke="#333" strokeWidth="0.5" fill="none" />
          </>
        ) : (
          <>
            {/* Open eyes with slight highlight */}
            <circle cx="8" cy="10" r="1.2" fill="#333" transform={getEyeTransform()} />
            <circle cx="16" cy="10" r="1.2" fill="#333" transform={getEyeTransform()} />
            {/* <circle cx="8.2" cy="9.8" r="0.2" fill="white" transform={getEyeTransform()} /> */}
            {/* <circle cx="16.2" cy="9.8" r="0.2" fill="white" transform={getEyeTransform()} /> */}
          </>
        )}
        {/* Larger nose */}
        {/* <ellipse cx="12" cy="14" rx="2" ry="1.5" fill="#333" /> */}
        {/* Cuter smile with more upward curve */}
        <path
          d="M8,16 C10,19 14,19 16,16" // Smile curve path
          stroke="#333"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
};

export default MotionFace;

// RainbowCursor.jsx
import React, { useRef, useEffect } from "react";

const RainbowCursor = () => {
  // Define the ripple colors (with transparency)
  const colors = [
    "rgba(255,0,0,0.7)",
    "rgba(255,127,0,0.7)",
    "rgba(255,255,0,0.7)",
    "rgba(0,255,0,0.7)",
    "rgba(0,0,255,0.7)",
    // "rgba(75,0,130,0.7)",
    "rgba(139,0,255,0.7)",
  ];

  const trailRefs = useRef([]);
  const positions = useRef(
    colors.map(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }))
  );
  const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const requestRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const animate = () => {
    positions.current = positions.current.map((pos, i) => {
      const followTarget = i === 0 ? targetPos.current : positions.current[i - 1];
      return {
        x: pos.x + (followTarget.x - pos.x) * 0.2,
        y: pos.y + (followTarget.y - pos.y) * 0.2,
      };
    });

    trailRefs.current.forEach((el, i) => {
      if (el) {
        let angle = 0;
        if (i === 0) {
          const dx = targetPos.current.x - positions.current[i].x;
          const dy = targetPos.current.y - positions.current[i].y;
          angle = Math.atan2(dy, dx) * (180 / Math.PI);
        } else {
          const dx = positions.current[i - 1].x - positions.current[i].x;
          const dy = positions.current[i - 1].y - positions.current[i].y;
          angle = Math.atan2(dy, dx) * (180 / Math.PI);
        }
        el.style.transform = `translate(${positions.current[i].x}px, ${positions.current[i].y}px) rotate(${angle}deg)`;
      }
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[1000]">
      {colors.map((color, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          style={{
            position: "absolute",
            // Using an elongated shape to mimic a water ripple
            width: "40px",
            height: "30px",
            background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
            filter: "blur(1px)",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};

export default RainbowCursor;

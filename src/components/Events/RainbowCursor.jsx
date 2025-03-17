// RippleCursor.jsx
import React, { useEffect, useRef } from "react";

const RippleCursor = () => {
  const containerRef = useRef(null);
  const animationFrameRequested = useRef(false);
  const latestEvent = useRef(null);

  useEffect(() => {
    const createRipple = (x, y) => {
      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.background = "rgba(0, 255, 0, 5)";
      ripple.style.borderRadius = "50%";
      ripple.style.pointerEvents = "none";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.transition = "all 0.5s ease-out";
      
      containerRef.current.appendChild(ripple);
      
      ripple.getBoundingClientRect();
      
    
      ripple.style.width = "50px";
      ripple.style.height = "50px";
      ripple.style.opacity = "0";
      
      // Remove the ripple after the animation
      setTimeout(() => {
        ripple.remove();
      }, 500);
    };

    const handleMouseMove = (e) => {
      latestEvent.current = e;
      if (!animationFrameRequested.current) {
        animationFrameRequested.current = true;
        requestAnimationFrame(() => {
          if (latestEvent.current) {
            const { clientX, clientY } = latestEvent.current;
            createRipple(clientX, clientY);
          }
          animationFrameRequested.current = false;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1000,
      }}
    />
  );
};

export default RippleCursor;

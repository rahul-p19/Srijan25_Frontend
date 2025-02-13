// import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../Navbar";
// import Footer from "../Footer";

// const events = [
//   { id: 1, name: "Tech Innovations Summit", description: "Join industry leaders for insights and networking." },
//   { id: 2, name: "Creative Design Workshop", description: "Explore creativity with expert designers." },
//   { id: 3, name: "Startup Pitch Night", description: "Showcase ideas to investors and mentors." },
//   { id: 4, name: "Coding Bootcamp", description: "Hands-on coding sessions and projects." },
//   { id: 5, name: "Digital Marketing Conference", description: "Latest trends and strategies in marketing." },
//   { id: 6, name: "Health & Wellness Expo", description: "Explore wellness with technology." },
// ];

// const Events = () => {

//   const cardContainerRef = useRef(null);
//   const outerContainerRef = useRef(null);
//   const [cardOverlayStyle, setCardOverlayStyle] = useState({ top: 0, height: 0 });

//   useEffect(() => {
//     const updateOverlay = () => {
//       if (cardContainerRef.current && outerContainerRef.current) {
//         const cardRect = cardContainerRef.current.getBoundingClientRect();
//         const outerRect = outerContainerRef.current.getBoundingClientRect();
//         const top = cardRect.top - outerRect.top;
//         const height = cardRect.height;
//         setCardOverlayStyle({ top, height });
//       }
//     };

//     updateOverlay();
//     window.addEventListener("resize", updateOverlay);
//     window.addEventListener("scroll", updateOverlay);
//     return () => {
//       window.removeEventListener("resize", updateOverlay);
//       window.removeEventListener("scroll", updateOverlay);
//     };
//   }, []);


//   const whiteStickStyle = {
//     position: "absolute",
//     zIndex: 0,
//     width: "1px",
//     height: "100%",
//     backgroundColor: "white",
//   };

//   // Overlay style for the white stick blur effect outside the heading box
//   const overlayStyle = {
//     position: "absolute",
//     zIndex: 1,
//     width: "1px",
//     backgroundColor: "white",
//     filter: "blur(5px)",
//     pointerEvents: "none",
//     transition: "all 0.3s ease",
//     top: `${cardOverlayStyle.top}px`,
//     height: `${cardOverlayStyle.height}px`,
//   };

//   return (
//     <>
 
//       <Navbar />

//       <div
//         ref={outerContainerRef}
//         className="relative bg-black text-white px-1 py-20 min-h-screen overflow-y-auto no-scrollbar"
//       >
   
//         <div
//           style={{ ...whiteStickStyle, left: "50%", transform: "translateX(-50%)" }}
//         ></div>
//         <div style={{ ...whiteStickStyle, left: "20%" }}></div>
//         <div style={{ ...whiteStickStyle, right: "20%" }}></div>

  
//         <div
//           style={{ ...overlayStyle, left: "50%", transform: "translateX(-50%)" }}
//         ></div>
//         <div style={{ ...overlayStyle, left: "20%" }}></div>
//         <div style={{ ...overlayStyle, right: "20%" }}></div>


//         <div className="flex justify-center mb-8">
//           <div className="relative inline-block">

//             <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-lg border border-purple-700"></div>
//             <h2 className="relative z-10 text-3xl md:text-4xl font-bold px-8 py-4">
//               EVENTS
//             </h2>
//           </div>
//         </div>


//         <div className="relative p-[3px] my-16 rounded-xl bg-gradient-to-r from-blue-500 via-red-500 to-green-500 animate-borderMove w-full max-w-6xl mx-auto">

//           <div ref={cardContainerRef} className="p-6 md:p-10 lg:p-14 rounded-xl bg-black">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {events.map((event) => (
//                 <div
//                   key={event.id}
//                   className="relative group bg-gray-900 border border-purple-700 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl"
//                 >
//                   <img
//                     src="https://s3-alpha-sig.figma.com/img/7bbf/ec38/af79878de46f1d33136510a9e5745c74?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lBhLJjhmxhPRPtKfd-Q9VDGrqOr6OjP194jg2Ax4ESI6WauqoevPe1RGrekvXbxIs07y3nxnNBdtmIk9fULN0onXBjidt2ZlsGcd14ecXoyikcQRYn-Gv8iYQtC6iQLES0EKAZl9woiqBPTyIn4jJkrYARGWLdkr5xwyTOmhQdtFDd5RQn-gvPWncyw4RB8QQPfNrr1grvE16rhj0lsRvql5zbqltnkDDyopg22Zm0j1aizXkwvUhchNlCLF1qxsLyno2BqeEPzw500Xg~ur9ARDbO82AbHzZtXc0O4L9KGYViAjCzwxSpe83EecBmtl5bo6nBtNjnYWscpkwhXDyw__"
//                     alt={event.name}
//                     className="w-full h-56 sm:h-64 md:h-72 object-cover transition-all duration-400 ease-in-out group-hover:brightness-70 border-b border-purple-700"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 h-1/2 flex flex-col items-center justify-center text-center bg-[rgba(40,8,64,0.85)] transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out p-4 sm:p-6 border-t border-purple-400">
//                     <h3 className="text-lg sm:text-xl font-bold text-white">{event.name}</h3>
//                     <p className="text-sm sm:text-base text-gray-300">{event.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>


//         <style>{`
//           @keyframes borderMove {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }
//           .animate-borderMove {
//             background-size: 200% 200%;
//             animation: borderMove 4s infinite linear;
//           }

//           @keyframes cardPulse {
//             0% { box-shadow: 0 0 10px rgba(128, 0, 128, 0.5); }
//             50% { box-shadow: 0 0 20px rgba(128, 0, 128, 0.8); }
//             100% { box-shadow: 0 0 10px rgba(128, 0, 128, 0.5); }
//           }
//           .animate-cardPulse:hover {
//             animation: cardPulse 1.5s infinite ease-in-out;
//           }
//         `}</style>
//       </div>


//       <Footer />

   
//       <style jsx global>{`
//         html,
//         body {
//           background-color: #000;
//           margin: 0;
//           padding: 0;
//         }
//         /* Hide scrollbar while allowing scrolling */
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Events;

import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./styles.css";

// Constant image URL (same for all events)
const commonImageUrl =
  "https://s3-alpha-sig.figma.com/img/7bbf/ec38/af79878de46f1d33136510a9e5745c74?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lBhLJjhmxhPRPtKfd-Q9VDGrqOr6OjP194jg2Ax4ESI6WauqoevPe1RGrekvXbxIs07y3nxnNBdtmIk9fULN0onXBjidt2ZlsGcd14ecXoyikcQRYn-Gv8iYQtC6iQLES0EKAZl9woiqBPTyIn4jJkrYARGWLdkr5xwyTOmhQdtFDd5RQn-gvPWncyw4RB8QQPfNrr1grvE16rhj0lsRvql5zbqltnkDDyopg22Zm0j1aizXkwvUhchNlCLF1qxsLyno2BqeEPzw500Xg~ur9ARDbO82AbHzZtXc0O4L9KGYViAjCzwxSpe83EecBmtl5bo6nBtNjnYWscpkwhXDyw__";

// Updated events data with six categories.
const events = [
  {
    id: 1,
    name: "Tech Innovations Summit",
    description: "Join industry leaders for insights and networking.",
    category: "misc",
    imageUrl: commonImageUrl,
  },
  {
    id: 2,
    name: "Creative Design Workshop",
    description: "Explore creativity with expert designers.",
    category: "design",
    imageUrl: commonImageUrl,
  },
  {
    id: 3,
    name: "Startup Pitch Night",
    description: "Showcase ideas to investors and mentors.",
    category: "startup",
    imageUrl: commonImageUrl,
  },
  {
    id: 4,
    name: "Coding Bootcamp",
    description: "Hands-on coding sessions and projects.",
    category: "coding",
    imageUrl: commonImageUrl,
  },
  {
    id: 5,
    name: "Digital Marketing Conference",
    description: "Latest trends and strategies in marketing.",
    category: "marketing",
    imageUrl: commonImageUrl,
  },
  {
    id: 6,
    name: "Advanced Coding Workshop",
    description: "Deep dive into coding techniques.",
    category: "coding",
    imageUrl: commonImageUrl,
  },
];

/**
 * FancyButton Component
 *
 * A refined button with a ripple effect and gradient active state.
 */
const FancyButton = ({ active, onClick, children }) => {
  const [ripples, setRipples] = useState([]);

  // Create a new ripple effect on click.
  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, key: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    if (onClick) onClick(event);
  };

  // Remove the ripple after its animation ends.
  const handleRippleAnimationEnd = (key) => {
    setRipples((prev) => prev.filter((r) => r.key !== key));
  };

  return (
    <div className="relative inline-block overflow-hidden rounded-md">
      <button
        onClick={createRipple}
        className={`relative px-6 py-2 rounded-md font-semibold transition-all duration-300 focus:outline-none border border-transparent ${
          active
            ? "bg-gradient-to-r from-red-500 to-yellow-600 text-white shadow-lg transform scale-105"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
        }`}
      >
        {children}
      </button>
      {/* Render active ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          onAnimationEnd={() => handleRippleAnimationEnd(ripple.key)}
          className="absolute bg-white opacity-30 rounded-full pointer-events-none animate-ripple"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Events Component with Typewriter Effect and Bottom-Up Transparent Slider for Event Descriptions
 */
const Events = () => {
  // Default filter set to "all" to show every event.
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter events based on the active category.
  const filteredEvents =
    activeCategory === "all"
      ? events
      : events.filter((event) => event.category === activeCategory);

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen py-12 px-4">
        {/* Header with Typewriter Effect */}
        <header className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-pink-600">
            <ReactTyped
              strings={[
                "Upcoming Coding & Design Events",
                "Find The Best Workshops",
                "Join Our Tech Community",
              ]}
              typeSpeed={120}
              backSpeed={60}
              loop
            />
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Explore workshops, bootcamps, and conferences curated for developers,
            designers, startups, and more!
          </p>
        </header>

        {/* Filter Buttons */}
        <nav className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4 mb-12">
          {["all", "coding", "misc", "design", "startup", "marketing"].map((category) => (
            <FancyButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FancyButton>
          ))}
        </nav>

        {/* Rectangular Box Container with White Border for Cards */}
        <div className="max-w-7xl mx-auto p-20 border-2 border-white rounded-lg">
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="card group relative rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
              >
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="w-full h-60 object-cover"
                />
                {/* Description Slider: slides up from the bottom */}
                <div
                  className="
                    absolute 
                    left-0 
                    right-0 
                    bottom-0 
                    p-4 
                    bg-black/30 
                    backdrop-blur-sm 
                    text-white 
                    transform 
                    translate-y-full 
                    group-hover:translate-y-0 
                    transition-transform 
                    duration-300
                  "
                >
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <p className="text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

/**
 * Main App Component
 */
const App = () => {
  return <Events />;
};

export default App;


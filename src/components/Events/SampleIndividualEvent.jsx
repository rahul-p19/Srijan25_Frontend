import React, { useState, useEffect, useRef } from "react";
import {
  FaTrophy,
  FaCalendarAlt,
  FaGamepad,
  FaPhoneAlt,
  FaEnvelope,
  FaShareAlt,
  FaHeart,
} from "react-icons/fa";
import "./ValorantEvent.css";

const ValorantEvent = () => {

  const containerRef = useRef(null);
  const rulesRef = useRef(null);

  // State to hold the vertical position and height of the Event Rules section (relative to the container)
  const [overlayStyle, setOverlayStyle] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const updateOverlay = () => {
      if (rulesRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rulesRect = rulesRef.current.getBoundingClientRect();
        // Calculate the top offset and height of the Event Rules relative to the container
        const top = rulesRect.top - containerRect.top;
        const height = rulesRect.height;
        setOverlayStyle({ top, height });
      }
    };

    // Initial measurement
    updateOverlay();
    // Update measurements on scroll and resize
    window.addEventListener("scroll", updateOverlay);
    window.addEventListener("resize", updateOverlay);
    return () => {
      window.removeEventListener("scroll", updateOverlay);
      window.removeEventListener("resize", updateOverlay);
    };
  }, []);

  // Define classes for the white sticks (left and right remain static)
  const staticLineClasses = "absolute top-0 h-full w-px bg-white opacity-50 z-0 transition duration-300";

  return (
    <div
      ref={containerRef}
      className="relative bg-black text-white p-4 md:p-6 min-h-screen font-mono"
    >
      {/* Left White Stick */}
      <div className={`${staticLineClasses} left-[20%]`}></div>

      {/* Middle White Stick (without blur) */}
      <div className={`${staticLineClasses} left-1/2 transform -translate-x-1/2`}></div>

      {/* Right White Stick */}
      <div className={`${staticLineClasses} right-[20%]`}></div>

      {/* --- Blurred Overlay on the Middle Stick --- */}
      {/* This overlay covers only the vertical segment that overlaps with the Event Rules section */}
      {/* <div
        style={{
          top: overlayStyle.top,
          height: overlayStyle.height,
        }}
        className="absolute z-10 left-1/2 transform -translate-x-1/2 w-px bg-white pointer-events-none transition duration-300"
        // Tailwind doesn't include filter utilities for inline style in style prop, so we use inline CSS:
        // (You can also add a custom class in your CSS file)
        style={{
          top: overlayStyle.top,
          height: overlayStyle.height,
          left: "50%",
          transform: "translateX(-50%)",
          width: "0.1px",
          backgroundColor: "white",
          filter: "blur(100px)",
          pointerEvents: "none",
          transition: "all 0.3s ease",
          // zIndex:'0'
        }}
      ></div> */}

<div
  style={{
    top: overlayStyle.top,
    height: overlayStyle.height,
    left: "50%",
    transform: "translateX(-50%)",
    width: "0.1px",
    backgroundColor: "white",
    filter: "blur(100px)",
    pointerEvents: "none",
    transition: "all 0.3s ease",
    // zIndex: '0'
  }}
  className="absolute z-10 left-1/2 transform -translate-x-1/2 w-px bg-white pointer-events-none transition duration-300"
></div>

      {/* Content Wrapper */}
      <div className="relative z-20">
        {/* Header */}
        <div className="text-center text-4xl md:text-6xl mb-4 md:mb-6">Events</div>
        <div className="max-w-5xl mx-auto">
          {/* Registration Header */}
          <h2 className="font-bold text-center mb-4 text-red-700 text-xl md:text-2xl">
            LAST DATE FOR REGISTRATION __-__-2025
          </h2>

          {/* Main Event Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Event Poster */}
            <div className="border p-4 rounded-lg">
              <img
                src="https://s3-alpha-sig.figma.com/img/60a3/e08c/3acddee8fc4960fe6a0f5dd8808674ac?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YrpoMJjtR25NDd7lHF-z~Ri0p5HrzEIuoQ20zwqlraIMy4yHqdr210OHO~eHuXpZqlI-Rp0ViUncIkuYBw1Hp-Zij02IVIgsEyMooG0u6sTEVCzn8W8dl7C~d47lAJb0~rcA0-0DaH8Tn0EX5cdkusOAb637TsTmKjIXGy5xjMea0Bs~RSZGSsNYSsipKU4sTJi41n3cjxVoqQbOInd4Y3f6-2DuiJ0WTYzIGp6SH6VIwtOGhPU4lbhz14K2myuI36DSzWqYdHoWGbUTz4Wjyj9QcCmZnYWP~Dl0WGi3aI6ani5N41xIy-SNYpuk~vd-rkLQukrHjcf6glyoR7YeXg__"
                alt="Valorant Event"
                className="w-full rounded-lg"
              />
              <button className="bg-purple-100 text-pink-600 text-lg md:text-xl px-4 py-2 mt-4 w-full rounded-lg hover:bg-purple-200 transition">
                REGISTER <span className="text-pink-600">NOW</span>
              </button>

              {/* Share and Wishlist Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <button
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() =>
                    navigator.share({
                      title: "Valorant Event",
                      url: window.location.href,
                    })
                  }
                >
                  <FaShareAlt className="mr-2" />
                  Share
                </button>
                <button
                  className="flex items-center bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                  onClick={() => alert("Added to Wishlist!")}
                >
                  <FaHeart className="mr-2" />
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="border p-4 rounded-lg animate-border">
                <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 animate-text">
                  <FaCalendarAlt /> EVENT DETAILS
                </h3>
                <p>Event Date (Prelims): TBD</p>
                <p>Event Date (Finals): TBD</p>
                <p>Team Size: __ members</p>
              </div>
              <div className="border p-4 rounded-lg animate-border">
                <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 animate-text">
                  <FaTrophy /> PRIZE POOL
                </h3>
                <p>1ST PRIZE: _,000</p>
                <p>2ND PRIZE: _,000</p>
                <p>3RD PRIZE: _,000</p>
              </div>
              <div className="border p-4 rounded-lg animate-border">
                <h3 className="text-lg md:text-xl font-bold text-purple-400 flex items-center gap-2 animate-text">
                  <FaGamepad /> EVENT DESCRIPTION
                </h3>
                <p>
                  Join our Valorant Tournament for a chance to compete, showcase your skills, and win exciting prizes! Teams of five will battle in intense matches, judged on kills, teamwork, strategy, and sportsmanship.
                </p>
              </div>
            </div>
          </div>

          {/* Event Rules Section */}
          <div
            ref={rulesRef}
            className="border p-4 md:p-6 mt-6 md:mt-8 rounded-lg animate-border transition duration-300"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center animate-text">
              EVENT RULES
            </h3>
            <h4 className="text-lg md:text-xl font-bold mt-4 animate-text">
              CRITERIA
            </h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Teams must consist of 5 players, with substitutes allowed.</li>
              <li>Players must be 18+ and have an active Riot account.</li>
              <li>No professional players allowed.</li>
              <li>Stable internet connection required.</li>
              <li>Communication must be in English.</li>
            </ul>

            <h4 className="text-lg md:text-xl font-bold mt-4 animate-text">
              JUDGING SCHEME
            </h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Matches judged on win/loss outcomes.</li>
              <li>Team performance evaluated on kills, deaths, assists, and economy.</li>
              <li>Sportsmanship and behavior will be monitored.</li>
            </ul>
          </div>

          {/* Event Organizers Section */}
          <div className="border p-4 md:p-6 mt-6 md:mt-8 rounded-lg animate-border">
            <h3 className="text-lg md:text-2xl font-bold text-center text-purple-400">
              EVENT ORGANIZERS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
              <div className="border p-4 rounded-lg hover:bg-gray-800 transition animate-border">
                <h4 className="text-lg md:text-xl font-bold animate">
                  Swapnil Basu
                </h4>
                <p className="flex items-center gap-2">
                  <FaPhoneAlt /> +91 98765 43210
                </p>
                <p className="flex items-center gap-2 animate">
                  <FaEnvelope /> swapnil@email.com
                </p>
              </div>
              <div className="border p-4 rounded-lg hover:bg-gray-800 transition animate-border">
                <h4 className="text-lg md:text-xl font-bold animate">
                  Spandan Ghatak
                </h4>
                <p className="flex items-center gap-2 animate">
                  <FaPhoneAlt /> +91 87654 32109
                </p>
                <p className="flex items-center gap-2 animate">
                  <FaEnvelope /> spandan@email.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValorantEvent;

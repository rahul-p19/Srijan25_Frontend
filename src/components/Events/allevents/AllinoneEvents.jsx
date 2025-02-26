// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaTrophy,
//   FaCalendarAlt,
//   FaGamepad,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaShareAlt,
//   FaHeart,
// } from "react-icons/fa";
// import {ReactTyped} from "react-typed";
// import "./ValorantEvent.css";
// // Import your local JSON data
// import eventsData from "./data.json";

// const Passthebaton = () => {
//   const containerRef = useRef(null);
//   const rulesRef = useRef(null);

//   // State to hold overlay style and event data
//   const [overlayStyle, setOverlayStyle] = useState({ top: 0, height: 0 });
//   const [eventData, setEventData] = useState(null);

//   // Calculate the overlay position/height for the Event Rules section
//   useEffect(() => {
//     const updateOverlay = () => {
//       if (rulesRef.current && containerRef.current) {
//         const containerRect = containerRef.current.getBoundingClientRect();
//         const rulesRect = rulesRef.current.getBoundingClientRect();
//         const top = rulesRect.top - containerRect.top;
//         const height = rulesRect.height;
//         setOverlayStyle({ top, height });
//       }
//     };

//     updateOverlay();
//     window.addEventListener("scroll", updateOverlay);
//     window.addEventListener("resize", updateOverlay);
//     return () => {
//       window.removeEventListener("scroll", updateOverlay);
//       window.removeEventListener("resize", updateOverlay);
//     };
//   }, []);

//   // Retrieve event data from the imported JSON file
//   useEffect(() => {
//     // Assuming your JSON is structured as an object with keys corresponding to event IDs:
//     const event = eventsData[0].pass_the_baton;
//     setEventData(event);
//   }, []);

//   // Display a loading state if eventData hasn't been set yet
//   if (!eventData) {
//     return <div className="text-center text-white">Loading...</div>;
//   }

//   // CSS class for the vertical white sticks
//   const staticLineClasses =
//     "absolute top-0 h-full w-px bg-white opacity-50 z-0 transition duration-300";

//   return (
//     <div
//       ref={containerRef}
//       className="relative bg-black text-white p-4 md:p-6 min-h-screen font-mono"
//     >
//       {setEventData}
//       {/* Left White Stick */}
//       <div className={`${staticLineClasses} left-[10%]`}></div>

//       {/* Right White Stick */}
//       <div className={`${staticLineClasses} right-[10%]`}></div>

//       {/* Blurred Overlay on the Middle */}
//       <div
//         style={{
//           top: overlayStyle.top,
//           height: overlayStyle.height,
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: "0.1px",
//           backgroundColor: "white",
//           filter: "blur(100px)",
//           pointerEvents: "none",
//           transition: "all 0.3s ease",
//         }}
//         className="absolute z-10 left-1/2 transform -translate-x-1/2 w-px bg-white pointer-events-none transition duration-300"
//       ></div>

//       {/* Content Wrapper */}
//       <div className="relative z-10">
//         {/* Header with ReactTyped */}
//         <div className="text-center text-4xl md:text-6xl">
//           <ReactTyped
//             strings={[eventData.title]}
//             typeSpeed={40}
//             backSpeed={50}
//             loop
//           >
//             <input
//               type="text"
//               className="text-center bg-gray-900 border-none outline-none"
//             />
//           </ReactTyped>
//         </div>

//         <div className="max-w-7xl mx-auto">
//           {/* Registration Header */}
//           <h2 className="font-bold text-center mb-4 text-red-700 text-xl md:text-2xl">
//             LAST DATE FOR REGISTRATION {eventData.registrationDeadline}
//           </h2>

//           {/* Main Event Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             {/* Event Poster */}
//             <div className="border p-4 rounded-lg">
//               <img
//                 src={eventData.image}
//                 alt={eventData.title}
//                 className="w-full rounded-lg"
//               />
//               <button className="bg-purple-100 text-pink-600 text-lg md:text-xl px-4 py-2 mt-4 w-full rounded-lg hover:bg-purple-200 transition">
//                 REGISTER <span className="text-pink-600">NOW</span>
//               </button>

//               {/* Share and Wishlist Buttons */}
//               <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//                 <button
//                   className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                   onClick={() =>
//                     navigator.share({
//                       title: eventData.title,
//                       url: window.location.href,
//                     })
//                   }
//                 >
//                   <FaShareAlt className="mr-2" />
//                   Share
//                 </button>
//                 <button
//                   className="flex items-center bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
//                   onClick={() => alert("Added to Wishlist!")}
//                 >
//                   <FaHeart className="mr-2" />
//                   Add to Wishlist
//                 </button>
//               </div>
//             </div>

//             {/* Event Details */}
//             <div className="space-y-4">
//               <div className="border p-4 rounded-lg animate-border">
//                 <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 animate-text">
//                   <FaCalendarAlt /> EVENT DETAILS
//                 </h3>
//                 <p>Event Date (Prelims): {eventData.eventDetails.prelims}</p>
//                 <p>Event Date (Finals): {eventData.eventDetails.finals}</p>
//                 <p>Team Size: {eventData.eventDetails.teamSize}</p>
//               </div>
//               <div className="border p-4 rounded-lg animate-border">
//                 <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 animate-text">
//                   <FaTrophy /> PRIZE POOL
//                 </h3>
//                 <p>1ST PRIZE: {eventData.prizePool.first}</p>
//                 <p>2ND PRIZE: {eventData.prizePool.second}</p>
//                 <p>3RD PRIZE: {eventData.prizePool.third}</p>
//               </div>
//               <div className="border p-4 rounded-lg animate-border">
//                 <h3 className="text-lg md:text-xl font-bold text-purple-400 flex items-center gap-2 animate-text">
//                   <FaGamepad /> EVENT DESCRIPTION
//                 </h3>
//                 <p>{eventData.eventDescription}</p>
//               </div>
//             </div>
//           </div>

//           {/* Event Rules Section */}
//           <div
//             ref={rulesRef}
//             className="border p-4 md:p-6 mt-6 md:mt-8 rounded-lg animate-border transition duration-300"
//           >
//             <h3 className="text-2xl md:text-3xl font-bold text-center animate-text">
//               {eventData.eventRules.title || "EVENT RULES"}
//             </h3>
//             <h4 className="text-lg md:text-xl font-bold mt-4 animate-text">
//               {eventData.eventRules.criteriaTitle || "CRITERIA"}
//             </h4>
//             <ul className="list-disc pl-6 space-y-2">
//               {eventData.eventRules.criteria.map((rule, index) => (
//                 <li key={index}>{rule}</li>
//               ))}
//             </ul>

//             <h4 className="text-lg md:text-xl font-bold mt-4 animate-text">
//               {eventData.eventRules.judgingSchemeTitle || "JUDGING SCHEME"}
//             </h4>
//             <ul className="list-disc pl-6 space-y-2">
//               {eventData.eventRules.judgingScheme.map((rule, index) => (
//                 <li key={index}>{rule}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Event Organizers Section */}
//           <div className="border p-4 md:p-6 mt-6 md:mt-8 rounded-lg animate-border">
//             <h3 className="text-lg md:text-2xl font-bold text-center text-purple-400">
//               {eventData.organizersTitle || "EVENT ORGANIZERS"}
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
//               {eventData.eventOrganizers.map((organizer, index) => (
//                 <div
//                   key={index}
//                   className="border p-4 rounded-lg hover:bg-gray-800 transition animate-border"
//                 >
//                   <h4 className="text-lg md:text-xl font-bold animate">
//                     {organizer.name}
//                   </h4>
//                   <p className="flex items-center gap-2">
//                     <FaPhoneAlt /> {organizer.phone}
//                   </p>
//                   <p className="flex items-center gap-2 animate">
//                     <FaEnvelope /> {organizer.email}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Passthebaton;

// import React, { useState, useEffect, useRef } from "react";

// import React, { useEffect, useRef, useState } from "react";
// import {
//   FaTrophy,
//   FaCalendarAlt,
//   FaGamepad,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaHeart,
//   FaFacebookF,
//   FaWhatsapp,
// } from "react-icons/fa";
// import { MdShare } from "react-icons/md";
// import { ReactTyped } from "react-typed";
// import { useParams, useNavigate } from "react-router-dom";
// import eventsData from "./data.json";
// import "./Event.css";
// import { useWindowSize } from "react-use";
// import { Button } from "@mui/material";
// import toast, { Toaster } from "react-hot-toast";

// const Passthebaton = () => {
//   const { width, height } = useWindowSize();
//   const { category, eventID } = useParams();
//   const navigate = useNavigate();

//   const containerRef = useRef(null);
//   const rulesRef = useRef(null);

//   const [overlayStyle, setOverlayStyle] = useState({ top: 0, height: 0 });
//   const [eventData, setEventData] = useState(null);
//   const [showShareOptions, setShowShareOptions] = useState(false);

//   // Update overlay position based on the rules section
//   useEffect(() => {
//     const updateOverlay = () => {
//       if (rulesRef.current && containerRef.current) {
//         const containerRect = containerRef.current.getBoundingClientRect();
//         const rulesRect = rulesRef.current.getBoundingClientRect();
//         const top = rulesRect.top - containerRect.top;
//         const height = rulesRect.height;
//         setOverlayStyle({ top, height });
//       }
//     };

//     updateOverlay();
//     window.addEventListener("scroll", updateOverlay);
//     window.addEventListener("resize", updateOverlay);
//     return () => {
//       window.removeEventListener("scroll", updateOverlay);
//       window.removeEventListener("resize", updateOverlay);
//     };
//   }, []);

//   // Fetch event data based on URL parameters
//   useEffect(() => {
//     if (!eventID || !category) {
//       console.error("Missing eventID or category from URL parameters");
//       return;
//     }
//     const eventItem = eventsData.find(
//       (item) => item.eventID === eventID && item.category === category
//     );
//     if (eventItem && eventItem[eventID]) {
//       setEventData(eventItem[eventID]);
//     } else {
//       console.error(
//         `Event with eventID '${eventID}' and category '${category}' not found`
//       );
//     }
//   }, [eventID, category]);

//   if (!eventData) {
//     return <div className="text-center text-white">Loading...</div>;
//   }

//   // Classes for static vertical lines
//   const staticLineClasses =
//     "absolute top-0 h-full w-px bg-white opacity-50 z-0 transition duration-300";

//   // Function to show toast notification when link is copied
//   const notify = () => toast.success("Link copied to clipboard!");
//   const notice=()=>toast.success("Added to WishList successfully")
//   return (
//     <div
//       ref={containerRef}
//       className="relative bg-black text-white p-4 md:p-6 min-h-screen font-mono overflow-x-hidden"
//     >
//       {/* Static Vertical Lines */}
//       <div className={`${staticLineClasses} left-[5%] sm:left-[10%]`}></div>
//       <div className={`${staticLineClasses} right-[5%] sm:right-[10%]`}></div>

//       {/* Overlay Element */}
//       <div
//         style={{
//           top: overlayStyle.top,
//           height: overlayStyle.height,
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: "0.1px",
//           backgroundColor: "white",
//           filter: "blur(100px)",
//           pointerEvents: "none",
//           transition: "all 0.3s ease",
//         }}
//         className="absolute z-10"
//       ></div>

//       {/* Main Content Container */}
//       <div className="relative z-10 max-w-screen-xl mx-auto">
//         {/* Event Title */}
//         <div className="text-center text-4xl md:text-6xl mb-4">
//           <ReactTyped
//             strings={[eventData.title]}
//             typeSpeed={40}
//             backSpeed={50}
//             loop
//             className="text-center"
//           />
//         </div>

//         {/* Registration Deadline */}
//         <h2 className="font-bold text-center mb-4 text-red-700 text-xl md:text-2xl">
//           LAST DATE FOR REGISTRATION {eventData.registrationDeadline}
//         </h2>

//         {/* Grid for Left & Right Sections */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left: Registration Card */}
//           <div className="border p-8 rounded-lg text-center">
//             <img
//               src={eventData.image}
//               alt={eventData.title}
//               className="w-full rounded-lg"
//             />
//             {/* Centered Registration Button */}
//             <Button
//               variant="outlined"
//               onClick={() =>
//                 navigate(`/events/${category}/${eventID}/registration`)
//               }
//               sx={{
//                 mt: 2.5,
//                 py: { xs: 2, md: 1 },
//                 color: "white",
//                 borderColor: "white",
//                 fontWeight: "bold",
//                 fontSize: { xs: "1.2rem", md: "1.1rem" },
//                 bgcolor: "black",
//                 position: "relative",
//                 transition: "all 0.3s ease-in-out",
//                 boxShadow: "inset 0 0 0px rgba(255, 255, 255, 0)",
//                 mx: "auto",
//                 display: "block",
//                 "&:hover": {
//                   boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.8)",
//                   bgcolor: "black",
//                   transform: "scale(1.02)",
//                 },
//               }}
//             >
//               REGISTER
//             </Button>
//             <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//               {/* Share Button opens the share modal */}
//               <button
//                 className="flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
//                 onClick={() => setShowShareOptions(true)}
//               >
//                 <MdShare className="mr-2" size={28} />
//                 Share
//               </button>
//               <button
//                 className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
//                 onClick={notice}
//               >
//                 <FaHeart className="mr-2" size={24} />
//                 Add to Wishlist
//               </button>
//             </div>
//           </div>

//           {/* Right: Event Details, Prize Pool & Description */}
//           <div className="space-y-6">
//             <div className="border p-8 rounded-lg">
//               <h3 className="text-lg md:text-2xl font-bold flex items-center gap-2 text-red-500">
//                 <FaCalendarAlt /> EVENT DETAILS
//               </h3>
//               <p>
//                 <span className="text-yellow-400">Event Date (Prelims): </span>
//                 {eventData.eventDetails.prelims}
//               </p>
//               <p>
//                 <span className="text-yellow-400">Event Date (Finals): </span>
//                 {eventData.eventDetails.finals}
//               </p>
//               <p>
//                 <span className="text-yellow-400">Team Size: </span>
//                 {eventData.eventDetails.teamSize}
//               </p>
//             </div>
//             <div className="border p-8 rounded-lg">
//               <h3 className="text-lg md:text-2xl font-bold flex items-center gap-2 text-red-500">
//                 <FaTrophy /> PRIZE POOL
//               </h3>
//               <p>
//                 1ST PRIZE:{" "}
//                 <span className="animate-greenPulse font-bold text-2xl">
//                   {eventData.prizePool.first}
//                 </span>
//               </p>
//               <p>
//                 2ND PRIZE:{" "}
//                 <span className="animate-greenPulse font-bold text-2xl">
//                   {eventData.prizePool.second}
//                 </span>
//               </p>
//               <p>
//                 3RD PRIZE:{" "}
//                 <span className="animate-greenPulse font-bold text-2xl">
//                   {eventData.prizePool.third}
//                 </span>
//               </p>
//             </div>
//             <div className="border p-8 rounded-lg">
//               <h3 className="text-lg md:text-xl font-bold text-purple-400 flex items-center gap-2">
//                 <FaGamepad /> EVENT DESCRIPTION
//               </h3>
//               <p>{eventData.eventDescription}</p>
//             </div>
//           </div>
//         </div>

//         {/* Event Rules */}
//         <div
//           ref={rulesRef}
//           className="border p-8 mt-6 md:mt-8 rounded-lg transition duration-300"
//         >
//           <h3 className="text-2xl md:text-3xl font-bold text-center animate-rainbow">
//             {eventData.eventRules.title || "EVENT RULES"}
//           </h3>
//           <h4 className="text-lg md:text-xl font-bold mt-4 animate-rainbow">
//             {eventData.eventRules.criteriaTitle || "CRITERIA"}
//           </h4>
//           <ul className="list-disc pl-6 space-y-2">
//             {eventData.eventRules.criteria.map((rule, index) => (
//               <li key={index}>{rule}</li>
//             ))}
//           </ul>
//           <h4 className="text-lg md:text-xl font-bold mt-4 animate-rainbow">
//             {eventData.eventRules.judgingSchemeTitle || "JUDGING SCHEME"}
//           </h4>
//           <ul className="list-disc pl-6 space-y-2">
//             {eventData.eventRules.judgingScheme.map((rule, index) => (
//               <li key={index}>{rule}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Event Organizers */}
//         <div className="border p-8 mt-6 md:mt-8 rounded-lg">
//           <h3 className="text-lg md:text-2xl font-bold text-center text-purple-400">
//             {eventData.organizersTitle || "EVENT ORGANIZERS"}
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//             {eventData.eventOrganizers.map((organizer, index) => (
//               <div
//                 key={index}
//                 className="border p-4 rounded-lg hover:bg-gray-800 transition"
//               >
//                 <h4 className="text-lg md:text-xl font-bold">
//                   {organizer.name}
//                 </h4>
//                 <p className="flex items-center gap-2">
//                   <FaPhoneAlt /> {organizer.phone}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <FaEnvelope /> {organizer.email}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Share Options Modal with blurred dark background */}
//       {showShareOptions && (
//         <div
//           className="fixed inset-0 flex items-center justify-center z-50"
//           style={{
//             background: "rgba(0, 0, 0, 0.8)",
//             backdropFilter: "blur(10px)",
//           }}
//         >
//           <div className="bg-white text-black rounded p-4 w-80">
//             <h3 className="text-xl font-bold mb-4">Share this event</h3>
//             <div className="flex flex-col gap-4">
//               <a
//                 href={`mailto:?subject=${encodeURIComponent(
//                   eventData.title
//                 )}&body=${encodeURIComponent(window.location.href)}`}
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 <FaEnvelope size={20} /> Email
//               </a>
//               <a
//                 href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
//                   eventData.title + " " + window.location.href
//                 )}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 <FaWhatsapp size={20} /> WhatsApp
//               </a>
//               <a
//                 href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//                   window.location.href
//                 )}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
//               >
//                 <FaFacebookF size={20} /> Facebook
//               </a>
//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(window.location.href);
//                   notify();
//                 }}
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//               >
//                 <MdShare size={20} /> Copy Link
//               </button>
//             </div>
//             <button
//               onClick={() => setShowShareOptions(false)}
//               className="mt-4 text-red-500 hover:underline"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* React Hot Toast Toaster */}
//       <Toaster />
//     </div>
//   );
// };

// export default Passthebaton;

// import {
//   FaTrophy,
//   FaCalendarAlt,
//   FaGamepad,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaShareAlt,
//   FaHeart,
// } from "react-icons/fa";
// import { ReactTyped } from "react-typed";
// import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
// import "./Event.css";
// import { useEffect, useRef, useState } from "react";
// import eventsData from "./data.json";

// const Passthebaton = () => {
//   const { category, eventID } = useParams();
//   const navigate = useNavigate(); // Initialize navigate

//   console.log(category);
//   console.log(eventID);
//   const containerRef = useRef(null);
//   const rulesRef = useRef(null);

//   const [overlayStyle, setOverlayStyle] = useState({ top: 0, height: 0 });
//   const [eventData, setEventData] = useState(null);

//   useEffect(() => {
//     const updateOverlay = () => {
//       if (rulesRef.current && containerRef.current) {
//         const containerRect = containerRef.current.getBoundingClientRect();
//         const rulesRect = rulesRef.current.getBoundingClientRect();
//         const top = rulesRect.top - containerRect.top;
//         const height = rulesRect.height;
//         setOverlayStyle({ top, height });
//       }
//     };

//     updateOverlay();
//     window.addEventListener("scroll", updateOverlay);
//     window.addEventListener("resize", updateOverlay);
//     return () => {
//       window.removeEventListener("scroll", updateOverlay);
//       window.removeEventListener("resize", updateOverlay);
//     };
//   }, []);

//   useEffect(() => {
//     if (!eventID || !category) {
//       console.error("Missing eventID or category from URL parameters");
//       return;
//     }
//     const eventItem = eventsData.find(
//       (item) => item.eventID === eventID && item.category === category
//     );
//     if (eventItem && eventItem[eventID]) {
//       setEventData(eventItem[eventID]);
//     } else {
//       console.error(
//         `Event with eventID '${eventID}' and category '${category}' not found`
//       );
//     }
//   }, [eventID, category]);

//   if (!eventData) {
//     return <div className="text-center text-white">Loading...</div>;
//   }

//   const staticLineClasses =
//     "absolute top-0 h-full w-px bg-white opacity-50 z-0 transition duration-300";

//   return (
//     <div
//       ref={containerRef}
//       className="relative bg-black text-white p-4 md:p-6 min-h-screen font-mono"
//     >
//       <div className={`${staticLineClasses} left-[10%]`}></div>
//       <div className={`${staticLineClasses} right-[10%]`}></div>
//       <div
//         style={{
//           top: overlayStyle.top,
//           height: overlayStyle.height,
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: "0.1px",
//           backgroundColor: "white",
//           filter: "blur(100px)",
//           pointerEvents: "none",
//           transition: "all 0.3s ease",
//         }}
//         className="absolute z-10 left-1/2 transform -translate-x-1/2 w-px bg-white pointer-events-none transition duration-300"
//       ></div>
//       <div className="relative z-10">
//         <div className="text-center text-4xl md:text-6xl">
//           <ReactTyped
//             strings={[eventData.title]}
//             typeSpeed={40}
//             backSpeed={50}
//             loop
//           >
//             <input
//               type="text"
//               className="text-center bg-gray-900 border-none outline-none"
//             />
//           </ReactTyped>
//         </div>

//         <div className="max-w-7xl mx-auto">
//           <h2 className="font-bold text-center mb-4 text-red-700 text-xl md:text-2xl">
//             LAST DATE FOR REGISTRATION {eventData.registrationDeadline}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             <div className="border p-4 rounded-lg">
//               <img
//                 src={eventData.image}
//                 alt={eventData.title}
//                 className="w-full rounded-lg"
//               />
//               {/* Registration button now navigates to the registration page */}
//               <button
//                 className="bg-purple-100 text-pink-600 text-lg md:text-xl px-4 py-2 mt-4 w-full rounded-lg hover:bg-purple-200 transition"
//                 onClick={() =>
//                   navigate(`/events/${category}/${eventID}/registration`)
//                 }
//               >
//                 REGISTER <span className="text-pink-600">NOW</span>
//               </button>

//               <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//                 <button
//                   className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                   onClick={() =>
//                     navigator.share({
//                       title: eventData.title,
//                       url: window.location.href,
//                     })
//                   }
//                 >
//                   <FaShareAlt className="mr-2" />
//                   Share
//                 </button>
//                 <button
//                   className="flex items-center bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
//                   onClick={() => alert("Added to Wishlist!")}
//                 >
//                   <FaHeart className="mr-2" />
//                   Add to Wishlist
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="border p-4 rounded-lg animate-border">
//                 <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 animate-text">
//                   <FaCalendarAlt /> EVENT DETAILS
//                 </h3>
//                 <p>Event Date (Prelims): {eventData.eventDetails.prelims}</p>
//                 <p>Event Date (Finals): {eventData.eventDetails.finals}</p>
//                 <p>Team Size: {eventData.eventDetails.teamSize}</p>
//               </div>
//               <div className="border p-4 rounded-lg animate-border">
//                 <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 animate-text">
//                   <FaTrophy /> PRIZE POOL
//                 </h3>
//                 <p>1ST PRIZE: {eventData.prizePool.first}</p>
//                 <p>2ND PRIZE: {eventData.prizePool.second}</p>
//                 <p>3RD PRIZE: {eventData.prizePool.third}</p>
//               </div>
//               <div className="border p-4 rounded-lg animate-border">
//                 <h3 className="text-lg md:text-xl font-bold text-purple-400 flex items-center gap-2 animate-text">
//                   <FaGamepad /> EVENT DESCRIPTION
//                 </h3>
//                 <p>{eventData.eventDescription}</p>
//               </div>
//             </div>
//           </div>

//           <div
//             ref={rulesRef}
//             className="border p-4 md:p-6 mt-6 md:mt-8 rounded-lg animate-border transition duration-300"
//           >
//             <h3 className="text-2xl md:text-3xl font-bold text-center animate-text">
//               {eventData.eventRules.title || "EVENT RULES"}
//             </h3>
//             <h4 className="text-lg md:text-xl font-bold mt-4 animate-text">
//               {eventData.eventRules.criteriaTitle || "CRITERIA"}
//             </h4>
//             <ul className="list-disc pl-6 space-y-2">
//               {eventData.eventRules.criteria.map((rule, index) => (
//                 <li key={index}>{rule}</li>
//               ))}
//             </ul>

//             <h4 className="text-lg md:text-xl font-bold mt-4 animate-text">
//               {eventData.eventRules.judgingSchemeTitle || "JUDGING SCHEME"}
//             </h4>
//             <ul className="list-disc pl-6 space-y-2">
//               {eventData.eventRules.judgingScheme.map((rule, index) => (
//                 <li key={index}>{rule}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="border p-4 md:p-6 mt-6 md:mt-8 rounded-lg animate-border">
//             <h3 className="text-lg md:text-2xl font-bold text-center text-purple-400">
//               {eventData.organizersTitle || "EVENT ORGANIZERS"}
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
//               {eventData.eventOrganizers.map((organizer, index) => (
//                 <div
//                   key={index}
//                   className="border p-4 rounded-lg hover:bg-gray-800 transition animate-border"
//                 >
//                   <h4 className="text-lg md:text-xl font-bold animate">
//                     {organizer.name}
//                   </h4>
//                   <p className="flex items-center gap-2">
//                     <FaPhoneAlt /> {organizer.phone}
//                   </p>
//                   <p className="flex items-center gap-2 animate">
//                     <FaEnvelope /> {organizer.email}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Passthebaton;

import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  FaTrophy,
  FaCalendarAlt,
  FaGamepad,
  FaPhoneAlt,
  FaEnvelope,
  FaHeart,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { ReactTyped } from "react-typed";
import { useParams, useNavigate } from "react-router-dom";
import eventsData from "./data.json";
import "./Event.css";
import { useWindowSize } from "react-use";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../Navbar";
import PageReveal from "../../PageReveal";
function Loading() {
  return (
    <div className="h-screen w-screen bg-background fixed z-[300]">
      <img
        src="/fetsu-presents-srijan25.svg"
        alt="Srijan 25 Logo"
        height="auto"
        width="auto"
        className="absolute top-[30%] left-[51%] -translate-[50%] h-36 w-auto"
      />
      <div className="absolute top-[75%] left-[50%] -translate-[50%] p-3 animate-spin bg-gradient-to-bl from-red via-purple to-lavender h-24 w-24 aspect-square rounded-full">
        <img
          src="/techno-management-fest.webp"
          alt="The Annual Techno-Management Fest of Jadavpur University"
          height="auto"
          width="auto"
          className="text-center absolute top-[52.5%] left-[50%] -translate-[50%] border border-white p-2 w-2/3 sm:w-1/3"
        />
        <div className="rounded-full h-full w-full bg-background"></div>
      </div>
    </div>
  );
}
const AllEvents = () => {
  const { width, height } = useWindowSize();
  const { category, eventID } = useParams();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const rulesRef = useRef(null);

  const [overlayStyle, setOverlayStyle] = useState({ top: 0, height: 0 });
  const [eventData, setEventData] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Update overlay position based on the rules section
  useEffect(() => {
    const updateOverlay = () => {
      if (rulesRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rulesRect = rulesRef.current.getBoundingClientRect();
        const top = rulesRect.top - containerRect.top;
        const height = rulesRect.height;
        setOverlayStyle({ top, height });
      }
    };

    updateOverlay();
    window.addEventListener("scroll", updateOverlay);
    window.addEventListener("resize", updateOverlay);
    return () => {
      window.removeEventListener("scroll", updateOverlay);
      window.removeEventListener("resize", updateOverlay);
    };
  }, []);

  // Fetch event data based on URL parameters using the new structure
  useEffect(() => {
    if (!eventID || !category) {
      console.error("Missing eventID or category from URL parameters");
      return;
    }
    const eventItem = eventsData.find(
      (item) =>
        item.eventID === eventID &&
        item.eventType.toLowerCase() === category.toLowerCase(),
    );
    if (eventItem) {
      setEventData(eventItem);
    } else {
      console.error(
        `Event with eventId '${eventID}' and category '${category}' not found`
      );
    }
  }, [eventID, category]);

  if (!eventData) {
    return <div className="text-center text-white">Loading...</div>;
  }

  // Derived values

  // Event details: join prelims and build team size string
  const eventDetails = {
    prelims: Array.isArray(eventData.eventDate.prelims)
      ? eventData.eventDate.prelims.join(" ")
      : eventData.eventDate.prelims,
    finals: eventData.eventDate.finals || "__-__-2025",
    teamSize: `${eventData.minMembers}-${eventData.maxMembers} members`,
  };

  // Parse prize pool from prize array
  const parsedPrizePool = { first: "", second: "", third: "" };
  if (Array.isArray(eventData.prize)) {
    eventData.prize.forEach((prizeStr) => {
      const parts = prizeStr.split(":");
      if (parts.length === 2) {
        const key = parts[0].trim().toLowerCase();
        const value = parts[1].trim();
        if (key.startsWith("1st")) parsedPrizePool.first = value;
        else if (key.startsWith("2nd")) parsedPrizePool.second = value;
        else if (key.startsWith("3rd")) parsedPrizePool.third = value;
      } else {
        if (!parsedPrizePool.first) parsedPrizePool.first = prizeStr.trim();
      }
    });
  }

  // Event description as a joined string
  const description = Array.isArray(eventData.eventDescription)
    ? eventData.eventDescription.join(" ")
    : eventData.eventDescription;

  // Merge event rules (flatten the arrays from each round)
  const mergedRules = eventData.eventRules
    ? Object.values(eventData.eventRules).flat()
    : [];

  // Parse event coordinators into organizer objects
  const eventOrganizers = eventData.eventCoordinators
    ? eventData.eventCoordinators.map((coordinator) => {
        const match = coordinator.match(/(.*)\[\s*([^\]]+)\s*\]/);
        if (match) {
          return { name: match[1].trim(), phone: match[2].trim(), email: "" };
        }
        return { name: coordinator, phone: "", email: "" };
      })
    : [];

  // Default organizers title if not provided in the data
  const organizersTitle = "EVENT ORGANIZERS";

  // Classes for static vertical lines
  const staticLineClasses =
    "absolute top-0 h-full w-px bg-white opacity-50 z-0 transition duration-300";

  // Function to show toast notification when link is copied
  const notify = () => toast.success("Link copied to clipboard!");
  const notice = () => toast.success("Added to Wishlist successfully");

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="font-sometypeMono">
          <Navbar />{" "}
        </div>
        <PageReveal />
        <div
          ref={containerRef}
          className="relative bg-black text-white p-4 md:p-6 min-h-screen font-mono overflow-x-hidden"
        >
          {/* Static Vertical Lines */}
          <div className={`${staticLineClasses} left-[5%] sm:left-[10%]`}></div>
          <div
            className={`${staticLineClasses} right-[5%] sm:right-[10%]`}
          ></div>

          {/* Overlay Element */}
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
            }}
            className="absolute z-10"
          ></div>

          {/* Main Content Container */}
          <div className="relative z-10 max-w-screen-xl mx-auto">
            {/* Event Title */}
            <div className="text-center text-4xl md:text-6xl mb-4">
              <ReactTyped
                strings={[eventData.eventName]}
                typeSpeed={40}
                backSpeed={50}
                loop
                className="text-center"
              />
            </div>

            {/* Registration Deadline */}
            <h2 className="font-bold text-center mb-4 text-red-700 text-xl md:text-2xl">
              LAST DATE FOR REGISTRATION {eventDetails.finals}
            </h2>

            {/* Grid for Left & Right Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Registration Card */}
              <div className="border p-8 rounded-lg text-center">
                <img
                  src={eventData.eventPoster}
                  alt={eventData.eventName}
                  className="w-full rounded-lg"
                />
                {/* Centered Registration Button */}
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate(`/events/${category}/${eventID}/registration`)
                  }
                  sx={{
                    "mt": 2.5,
                    "py": { xs: 2, md: 1 },
                    "color": "white",
                    "borderColor": "white",
                    "fontWeight": "bold",
                    "fontSize": { xs: "1.2rem", md: "1.1rem" },
                    "bgcolor": "black",
                    "position": "relative",
                    "transition": "all 0.3s ease-in-out",
                    "boxShadow": "inset 0 0 0px rgba(255, 255, 255, 0)",
                    "mx": "auto",
                    "display": "block",
                    "&:hover": {
                      boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.8)",
                      bgcolor: "black",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  REGISTER
                </Button>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  {/* Share Button opens the share modal */}
                  <button
                    className="flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
                    onClick={() => setShowShareOptions(true)}
                  >
                    <MdShare className="mr-2" size={28} />
                    Share
                  </button>
                  <button
                    className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
                    onClick={notice}
                  >
                    <FaHeart className="mr-2" size={24} />
                    Add to Wishlist
                  </button>
                </div>
              </div>

              {/* Right: Event Details, Prize Pool & Description */}
              <div className="space-y-6">
                <div className="border p-8 rounded-lg">
                  <h3 className="text-lg md:text-2xl font-bold flex items-center gap-2 text-red-500">
                    <FaCalendarAlt /> EVENT DETAILS
                  </h3>
                  <p>
                    <span className="text-yellow-400">
                      Event Date (Prelims):{" "}
                    </span>
                    {eventDetails.prelims}
                  </p>
                  <p>
                    <span className="text-yellow-400">
                      Event Date (Finals):{" "}
                    </span>
                    {eventDetails.finals}
                  </p>
                  <p>
                    <span className="text-yellow-400">Team Size: </span>
                    {eventDetails.teamSize}
                  </p>
                </div>
                <div className="border p-8 rounded-lg">
                  <h3 className="text-lg md:text-2xl font-bold flex items-center gap-2 text-red-500">
                    <FaTrophy /> PRIZE POOL
                  </h3>
                  <p>
                    1ST PRIZE:{" "}
                    <span className="animate-greenPulse font-bold text-2xl">
                      {parsedPrizePool.first}
                    </span>
                  </p>
                  <p>
                    2ND PRIZE:{" "}
                    <span className="animate-greenPulse font-bold text-2xl">
                      {parsedPrizePool.second}
                    </span>
                  </p>
                  <p>
                    3RD PRIZE:{" "}
                    <span className="animate-greenPulse font-bold text-2xl">
                      {parsedPrizePool.third}
                    </span>
                  </p>
                </div>
                <div className="border p-8 rounded-lg">
                  <h3 className="text-lg md:text-xl font-bold text-purple-400 flex items-center gap-2">
                    <FaGamepad /> EVENT DESCRIPTION
                  </h3>
                  <p>{description}</p>
                </div>
              </div>
            </div>
            {eventData.eventFormat && (
              <div className="border p-8 mt-6 md:mt-8 rounded-lg">
                <h3 className="text-lg md:text-2xl font-bold text-center text-purple-400">
                  EVENT FORMAT
                </h3>
                <p>{eventData.eventFormat}</p>
              </div>
            )}
            {/* Event Rules */}
            <div
              ref={rulesRef}
              className="border p-8 mt-6 md:mt-8 rounded-lg transition duration-300"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center animate-rainbow">
                EVENT RULES
              </h3>
              <h4 className="text-lg md:text-xl font-bold mt-4 animate-rainbow">
                CRITERIA
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                {mergedRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>

            {/* Event Organizers */}
            <div className="border p-8 mt-6 md:mt-8 rounded-lg">
              <h3 className="text-lg md:text-2xl font-bold text-center text-purple-400">
                {organizersTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {eventOrganizers.map((organizer, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg hover:bg-gray-800 transition"
                  >
                    <h4 className="text-lg md:text-xl font-bold">
                      {organizer.name}
                    </h4>
                    <p className="flex items-center gap-2">
                      <FaPhoneAlt /> {organizer.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      {/* <FaEnvelope /> {organizer.email} */}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditionally render Event Format if available */}
          </div>

          {/* Share Options Modal with blurred dark background */}
          {showShareOptions && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50"
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="bg-white text-black rounded p-4 w-80">
                <h3 className="text-xl font-bold mb-4">Share this event</h3>
                <div className="flex flex-col gap-4">
                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      eventData.eventName,
                    )}&body=${encodeURIComponent(window.location.href)}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FaEnvelope size={20} /> Email
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      eventData.eventName + " " + window.location.href,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <FaWhatsapp size={20} /> WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                  >
                    <FaFacebookF size={20} /> Facebook
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      notify();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    <MdShare size={20} /> Copy Link
                  </button>
                </div>
                <button
                  onClick={() => setShowShareOptions(false)}
                  className="mt-4 text-red-500 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* React Hot Toast Toaster */}
          <Toaster />
        </div>
      </Suspense>
    </>
  );
};

export default AllEvents;

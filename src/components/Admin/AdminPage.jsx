import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import axios from "axios";
import { CONST } from "../../config";
import Loading from "../Loading";
import GridLines from "../GridLines";

export default function AdminPage() {
  const [events, setEvents] = useState();
  const [currentEvent, setCurrentEvent] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFetchEvent = async () => {
    setError("");
    const authToken = localStorage.getItem("SrijanAdminAuthToken");
    if(!authToken)
      navigate("/admin", { replace: true });
    try {
      const response = await axios.post(
        `${CONST.env.API_SERVER}/adminFetchEvents`,
        { authToken: authToken },
      );

      setEvents(response.data.event);
      if (Array.isArray(response.data.event))
        setCurrentEvent(response.data.event[0]);
      else setCurrentEvent(response.data.event);

      // console.log(response.data.event[0]);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(
          "You are not Authenticated to access this page. Kindly Logout",
        );
      } else {
        setError(
          "You are not Authenticated to access this page. Kindly Logout",
        );
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFetchEvent();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("SrijanAdminAuthToken");
    navigate("/admin", { replace: true });
  };

  if (loading) return <Loading />;
  else
    return (
      <div className="w-full relative font-sometypeMono">
        <GridLines />
        <nav className="top-0 text-white p-4 flex flex-row items-center justify-between shadow-md">
          <div className="">
            <img
              src="/srijan-logo-white.svg"
              alt="Srijan Logo"
              width="auto"
              height="auto"
            />
          </div>
          <Button
            variant="outline"
            className="text-white border-white"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </nav>

        {Array.isArray(events) ? (
          <div className="flex flex-wrap gap-4 justify-center mb-5">
            {events.map((event) => (
              <div
                key={event._id}
                className={`text-white p-2 rounded-md border-2 border-white ${event._id == currentEvent._id ? "shadow-[0_0_5px_5px_rgba(255,255,255,1)]" : ""}`}
                onClick={() => {
                  setCurrentEvent(event);
                }}
              >
                {event.name}
              </div>
            ))}
          </div>
        ) : (
          null
        )}
        {currentEvent && <EventCard event={currentEvent} />}
      </div>
    );
}

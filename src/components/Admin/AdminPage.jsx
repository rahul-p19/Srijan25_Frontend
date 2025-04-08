import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import axios from "axios";
import { CONST } from "../../config";
import Loading from "../Loading";
import GridLines from "../GridLines";
import * as XLSX from "xlsx";

export default function AdminPage() {
  const [events, setEvents] = useState();
  const [currentEvent, setCurrentEvent] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFetchEvent = async () => {
    setError("");
    const authToken = localStorage.getItem("SrijanAdminAuthToken");
    if (!authToken) navigate("/admin", { replace: true });
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

  function exportToExcel(data, fileName = "Participants.xlsx") {
    // Determine the maximum number of members dynamically
    const wb = XLSX.utils.book_new();

    // Define headers dynamically
    if (data.isSolo) {
      const headers = ["Name", "Email"];

      // Convert data into rows
      const allParticipants = data.participants;
      const rows = allParticipants.map((team) => {
        return [team.name || "", team.email || ""];
      });

      // Create worksheet and workbook
      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      XLSX.utils.book_append_sheet(wb, ws, "Participants");
    } else {
      const maxMembers = data.maxParticipants - 1;
      const headers = [
        "Team Name",
        "Team Lead Name",
        "Team Lead Email",
        "Team Lead Phone",
      ];
      for (let i = 1; i <= maxMembers; i++) {
        headers.push(`Member${i} Name`, `Member${i} Email`, `Member${i} Phone`);
      }
      headers.push("Status");

      // Convert data into rows
      const allParticipants = data.participants;
      const rows = allParticipants.map((team) => {
        const members = team.members || [];

        return [
          team.name,
          team.creator?.name || "",
          team.creator?.email || "",
          team.creator?.phone || "",
          ...members.flatMap((member) => [
            member.user?.name || "",
            member.user?.email || "",
            member.user?.phone || "",
          ]),
          ...Array((maxMembers - members.length) * 3).fill(""), // Fill empty slots if members < max
          team.status,
        ];
      });

      // Create worksheet and workbook
      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      XLSX.utils.book_append_sheet(wb, ws, "Teams");
    }

    // Save the file
    XLSX.writeFile(wb, fileName + ".xlsx");
  }

  const downloadExcelSheet = async () => {
    if (currentEvent) {
      setLoading(true);
      const authToken = localStorage.getItem("SrijanAdminAuthToken");
      try {
        const response = await axios.post(
          `${CONST.env.API_SERVER}/adminFetchEventParticipants`,
          {
            authToken: authToken,
            slug: currentEvent.slug,
          },
        );
        exportToExcel(response.data.updatedEvent, currentEvent.name);
      } catch (err) {
        alert(err);
      }
      setLoading(false);
    } else alert("Select an event first");
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
          <div>
            <button
              type="button"
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
              onClick={downloadExcelSheet}
            >
              Download Excel Sheet
            </button>
            <Button
              variant="outline"
              className="text-white border-white text-lg"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </nav>

        {Array.isArray(events) ? (
          <div className="flex flex-wrap gap-4 justify-center mb-5 ">
            {events.map((event) => (
              <div
                key={event._id}
                className={`text-white p-2 cursor-pointer rounded-md border-2 border-white ${event._id == currentEvent._id ? "shadow-[0_0_5px_5px_rgba(255,255,255,1)]" : ""}`}
                onClick={() => {
                  setCurrentEvent(event);
                }}
              >
                {event.name}
              </div>
            ))}
          </div>
        ) : null}
        {currentEvent && <EventCard event={currentEvent} />}
      </div>
    );
}

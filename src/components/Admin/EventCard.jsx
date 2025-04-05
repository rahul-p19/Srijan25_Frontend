import React, { useEffect, useState } from "react";
import ParticipantCard from "./ParticipantCard";
import axios from "axios";
import { CONST } from "../../config";

const EventCard = ({ event }) => {
  const [participants, setParticipants] = useState([]);
  const [solo, setSolo] = useState(false);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const handleFetchEventParticipants = async (startIdx) => {
    setLoading(true);
    const authToken = localStorage.getItem("SrijanAdminAuthToken");
    try {
      const response = await axios.post(
        `${CONST.env.API_SERVER}/adminFetchEventParticipants`,
        {
          authToken: authToken,
          startIndex: startIdx,
          endIndex: startIdx + 10,
          slug: event.slug,
        },
      );
      setParticipants(response.data.updatedEvent.participants);
      setSolo(response.data.updatedEvent.isSolo);
      setCount(response.data.count);
      setHasMore(response.data.hasMore);
      setLoading(false);
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    setStartIndex(0);
    handleFetchEventParticipants(0);
  }, [event]);

  const handleNext = async () => {
    handleFetchEventParticipants(startIndex+10)
    setStartIndex(startIndex+10)
  };
  const handlePrev = async () => {
    handleFetchEventParticipants(startIndex-10)
    setStartIndex(startIndex-10)
  };

  if (loading || participants === undefined) {
    return (
      <div className="w-full relative font-sometypeMono px-10">Loading...</div>
    );
  } else if (solo)
    return (
      <div className="w-full relative font-sometypeMono px-10">
        <div className="flex flex-col items-center text-2xl">
          <div className="font-bold text-3xl">{event.name}</div>
          <div>Total Participants: {count.total}</div>
        </div>
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="text-white my-2 p-5 rounded-md shadow-md border-2 border-white"
          >
            {participant.name} &#40;{participant.email}&#41;
          </div>
        ))}
        <NavigationButtons
          hasMore={hasMore}
          handleNext={handleNext}
          handlePrev={handlePrev}
          startIdx={startIndex}
        />
      </div>
    );
  else
    return (
      <div className="w-full relative font-sometypeMono px-10 ">
        <div className="flex flex-col items-center text-2xl">
          <div className="font-bold text-3xl">{event.name}</div>
          <div>Registered: {count.completedRegistration}</div>
          <div>Pending: {count.pendingRegistration}</div>
          <div>Total: {count.total}</div>
        </div>
        {participants.map((participant) => (
          <ParticipantCard key={participant._id} participant={participant} />
        ))}
        <NavigationButtons
          hasMore={hasMore}
          handleNext={handleNext}
          handlePrev={handlePrev}
          startIdx={startIndex}
        />
      </div>
    );
};

const NavigationButtons = ({ hasMore, handleNext, handlePrev, startIdx }) => {
  const [disabled, setDisabled] = useState({
    prev: false,
    next: true,
  });
  useEffect(() => {
    setDisabled({
      prev: startIdx == 0,
      next: !hasMore,
    });
  }, [hasMore, startIdx]);

  return (
    <div className="flex flex-row space items-center justify-between p-2">
      <button
        type="button"
        className="text-white hover:text-white border border-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled.prev}
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        type="button"
        className="text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled.next}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};
export default EventCard;

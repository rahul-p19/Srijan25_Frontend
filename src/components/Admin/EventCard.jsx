import React, { useEffect, useState } from "react";
import ParticipantCard from "./ParticipantCard";

const EventCard = ({ event }) => {
  const [participants, setParticipants] = useState([]);
  const [solo, setSolo] = useState(false);

  useEffect(() => {
    const allParticipants = [
      ...event.participantGroups,
      ...event.pendingParticipantGroups,
      ...event.participants,
    ];
    setParticipants(allParticipants);
    setSolo(event.isSolo);
  }, [event]);

  const countCompleteStatus = () => {
    const completedCount = participants.filter(
      (participant) => participant.status === "complete",
    ).length;
    return completedCount;
  };
  if (solo)
    return (
      <div className="w-full relative font-sometypeMono px-10">
        <div className="flex flex-col items-center text-2xl">
          <div className="font-bold text-3xl">{event.name}</div>
          <div>Total Participants: {participants.length}</div>
        </div>
        {participants.map((participant) => (
          <div key={participant.id} className="text-white my-2 p-5 rounded-md shadow-md border-2 border-white">{participant.name} &#40;{participant.email}&#41;</div>
        ))}
      </div>
    );
  else
    return (
      <div className="w-full relative font-sometypeMono px-10 ">
        <div className="flex flex-col items-center text-2xl">
          <div className="font-bold text-3xl">{event.name}</div>
          <div>Registered: {countCompleteStatus()}</div>
          <div>Pending: {participants.length - countCompleteStatus()}</div>
          <div>Total: {participants.length}</div>
        </div>
        {participants.map((participant) => (
          <ParticipantCard key={participant._id} participant={participant} />
        ))}
      </div>
    );
};

export default EventCard;

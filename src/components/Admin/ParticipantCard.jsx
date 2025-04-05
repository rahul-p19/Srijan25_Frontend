import React from "react";

const ParticipantCard = ({ participant }) => {
  return (
    <div className="text-white my-2 p-5 rounded-md shadow-md border-2 border-white ">
      <div>Team Name: {participant.name}</div>
      {participant.creator && (
        <div>
          Team Lead: {participant.creator.name} (Email:{" "}
          {participant.creator.email}
          {participant.creator.phone &&
            `, Phone No.: ${participant.creator.phone}`}
          )
        </div>
      )}
      <div className="flex flex-wrap">
        Team Members:{}
        {participant.members.length>0 ?participant.members.map((member) => (
          <span key={member._id}>
            {member.user && (
              <>
                &nbsp;{member.user.name} ({member.user.email}),
              </>
            )}
          </span>
        )):
        " - "}
      </div>
      <div>
        Status:{" "}
        <span
          className={`${participant.status !== "complete" ? "text-yellow-500" : "text-green-500"} font-bold`}
        >
          {participant.status}
        </span>
      </div>
    </div>
  );
};

export default ParticipantCard;

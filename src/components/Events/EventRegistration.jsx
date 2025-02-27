import React, { useState } from "react";
import eventData from "../Events/allevents/data.json"; // Adjust path if necessary
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
//import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import image from "/src/assets/icons/mascot.svg";
import { env } from "../../config/config";
import axios from "axios";
import { useEffect } from "react";
import data from "./allevents/data.json";
import MascotAnimation from "../home/MascotAnimation";
import { getImageUrl } from "../../utils/image-util";

// TeamMembers Component for dynamically adding/removing team member email fields
const TeamMembers = ({ membersEmails, setMembersEmails, maxMembers }) => {
  // Email validation using a basic regex
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Check if the current email is a duplicate (case insensitive)
  const isDuplicate = (email, index) => {
    return (
      membersEmails.filter(
        (e) => e.trim().toLowerCase() === email.trim().toLowerCase(),
      ).length > 1
    );
  };

  const handleMemberChange = (index, event) => {
    const newMembers = [...membersEmails];
    newMembers[index] = event.target.value;
    setMembersEmails(newMembers);
  };

  const handleAddMember = () => {
    setMembersEmails([...membersEmails, ""]);
  };

  const handleRemoveMember = (index) => {
    const newMembers = [...membersEmails];
    newMembers.splice(index, 1);
    setMembersEmails(newMembers);
  };

  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="subtitle1" color="white" sx={{ mb: 1 }}>
        Team Members Emails:
      </Typography>
      {membersEmails.map((email, index) => {
        const valid = email && isValidEmail(email);
        const duplicate = email && isDuplicate(email, index);
        const showSuccess = email && valid && !duplicate;
        return (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
          >
            <TextField
              fullWidth
              size="medium"
              label={`Team Member ${index + 2} Email`}
              variant="outlined"
              margin="dense"
              value={email}
              onChange={(e) => handleMemberChange(index, e)}
              error={!!email && (!valid || duplicate)}
              helperText={
                email && !valid
                  ? "Invalid email format."
                  : email && duplicate
                    ? "Duplicate email."
                    : ""
              }
              InputLabelProps={{
                style: { color: "rgba(25, 255, 55, 0.7)", fontSize: "0.8rem" },
              }}
              InputProps={{
                startAdornment: email ? (
                  showSuccess ? (
                    <InputAdornment position="start">
                      <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="start">
                      <CancelIcon sx={{ color: "red", mr: 1 }} />
                    </InputAdornment>
                  )
                ) : null,
              }}
              sx={{
                  "mb": 2,
                  "transition": "all 0.3s ease",
                  "& .MuiOutlinedInput-root": {
                    "backgroundColor": "rgba(0, 0, 0, 0.6)",
                    "borderRadius": "8px",
                    "transition": "all 0.3s ease",
                    "boxShadow": "0 0 10px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(25, 255, 55, 0.05)",
                    "& fieldset": { 
                      borderColor: "rgba(25, 255, 55, 0.3)",
                      borderWidth: "2px",
                      transition: "all 0.3s ease"
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(25, 255, 55, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(25, 255, 55, 0.8)",
                      boxShadow: "0 0 8px rgba(25, 255, 55, 0.3)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "1.1rem",
                    color: "white",
                    padding: "14px 16px",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.5)",
                    },
                  },
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },

              }}
            />
            <IconButton
                onClick={() => handleRemoveMember(index)}
                sx={{ color: "red", ml: 1 }}
            >
              <DeleteIcon />
            </IconButton>      
          </Box>
        );
      })}
      {maxMembers - 1 > membersEmails.length && (
        <Button
          variant="outlined"
          onClick={handleAddMember}
          sx={{
            "mt": 1,
            "color": "white",
            "borderColor": "white",
            "fontWeight": "bold",
            "bgcolor": "black",
            "&:hover": { bgcolor: "black" },
          }}
        >
          Add Member
        </Button>
      )}
    </Box>
  );
};

const GroupInfo = ({ userId, eventID, refresh, setRefresh }) => {
  const [groupInfo, setGroupInfo] = useState({});
  const getGroupInfoForEvent = async () => {
    try {
      const response = await axios.get(
        `${env.API_SERVER}/users/group-info-for-event/${eventID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  useEffect(() => {
    const fetchGroupInfo = async () => {
      let groupInfo = await getGroupInfoForEvent();
      setGroupInfo(groupInfo.data);
      setRefresh(false);
    };
    fetchGroupInfo();
  }, [refresh]);

  const navigate = useNavigate();
  return (
    <div className="w-full h-full p-3 md:p-5 bg-gray-900 text-gray-100">
      {/* Back button */}
      <button 
        onClick={() => navigate(`/events/${eventID}`)}
        className="flex items-center text-sm text-gray-300 hover:text-gray-100 mb-4 md:mb-6 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Event
      </button>
  
      <div className="mb-4 md:mb-6">
        <h1 className="text-lg md:text-xl font-medium tracking-wide">
          Group Information
        </h1>
      </div>
  
      {groupInfo ? (
        <div className="space-y-3 md:space-y-4 bg-gray-800 rounded-lg p-3 md:p-5 border border-gray-700 shadow-md">
          {/* Group Name */}
          <div className="bg-gray-750 rounded-lg p-3 md:p-4 border-l-2 border-blue-500">
            <div className="flex items-center">
              <div className="mr-2 md:mr-3 text-blue-400 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="min-w-0 w-full">
                <p className="text-xs text-gray-400 font-medium">GROUP NAME</p>
                <p className="text-base font-medium text-gray-100 break-words">{groupInfo.name}</p>
              </div>
            </div>
          </div>
  
          {/* Creator Info */}
          <div className="bg-gray-750 rounded-lg p-3 md:p-4 border-l-2 border-blue-500">
            <div className="flex items-center">
              <div className="mr-2 md:mr-3 text-blue-400 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="min-w-0 w-full">
                <p className="text-xs text-gray-400 font-medium">TEAM LEADER</p>
                <p className="font-medium text-gray-100 break-words">{groupInfo?.creator?.name}</p>
                <p className="text-xs text-gray-400 break-words">{groupInfo?.creator?.email}</p>
              </div>
            </div>
          </div>
  
          {/* Members List */}
          <div className="bg-gray-750 rounded-lg p-3 md:p-4 border-l-2 border-blue-500">
            <div className="flex items-center mb-2 md:mb-3">
              <div className="mr-2 md:mr-3 text-blue-400 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 font-medium">TEAM MEMBERS</p>
            </div>
  
            <ul className="space-y-2 mt-2">
              {groupInfo?.members?.map(({ user, status }, index) => (
                <li 
                  key={index} 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 rounded-md ${
                    status === 'accepted' 
                      ? 'bg-green-900/20 border border-green-800' 
                      : status === 'pending' 
                      ? 'bg-yellow-900/20 border border-yellow-800' 
                      : 'bg-red-900/20 border border-red-800'
                  }`}
                >
                  <div className="flex items-center overflow-hidden mb-1 sm:mb-0">
                    <div className={`h-2 w-2 rounded-full mr-2 md:mr-3 flex-shrink-0 ${
                      status === 'accepted' ? 'bg-green-500' : 
                      status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    } ${status === 'pending' ? 'animate-pulse' : ''}`}></div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-100 truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded self-start sm:self-center flex-shrink-0 sm:ml-2 ${
                    status === 'accepted' ? 'text-green-400 bg-green-900/40' :
                    status === 'pending' ? 'text-yellow-400 bg-yellow-900/40' : 'text-red-400 bg-red-900/40'
                  }`}>
                    {status.toUpperCase()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Group Status */}
          <div className="bg-gray-750 rounded-lg p-3 md:p-4 border-l-2 border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 md:mr-3 text-blue-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">GROUP STATUS</p>
                </div>
              </div>
              <div className="bg-blue-900/60 px-3 py-1 rounded-full text-xs font-medium">
                {groupInfo.status}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-5 md:p-8 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
          <div className="text-blue-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-base md:text-lg font-medium text-gray-300 text-center">No group information available</p>
          <p className="text-sm text-gray-400 mt-2 text-center">You haven't joined a group yet or the data is still loading.</p>
        </div>
      )}
    </div>
  );
};

const BackButton = ({eventSlug})=>{
  const navigate = useNavigate();
  const handleBack = ()=>{
    navigate(`/events/${eventSlug}`)
  }
  return(
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{
                  "mt": 3,
                  "py": 1.5,
                  "width": "100%",
                  "color": "white",
                  "borderColor": "rgba(25, 255, 55, 0.5)",
                  "borderWidth": "2px",
                  "fontWeight": "bold",
                  "fontSize": "1rem",
                  "letterSpacing": "3px",
                  "backgroundColor": "rgba(0, 0, 0, 0.6)",
                  "position": "relative",
                  "transition": "all 0.4s ease",
                  "overflow": "hidden",
                  "zIndex": 1,
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(25, 255, 55, 0.2), transparent)",
                    transition: "all 0.5s",
                    zIndex: -1,
                  },
                  "&:hover": {
                    borderColor: "rgba(25, 255, 55, 0.8)",
                    boxShadow: "0 0 20px rgba(25, 255, 55, 0.3)",
                    transform: "translateY(-3px)",
                    letterSpacing: "4px",
                    bgcolor: "rgba(25, 255, 55, 0.1)",
                    "&:before": {
                      left: "100%",
                    },
                  },
                  "&:active": {
                    transform: "translateY(0)",
                    boxShadow: "0 0 10px rgba(25, 255, 55, 0.2)",
                  }
                }}
              >
                BACK
              </Button>
  )

}
const App = () => {
  const [isLoading , setIsLoading] = useState(false);
  const { width, height } = useWindowSize();
  const userId = localStorage.getItem("sid");
  //console.log({ userId });
  const navigate = useNavigate();
  if (!userId) {
    navigate("/login");
    // return;
  }
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [membersEmails, setMembersEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSoloEvent, setIsSoloEvent] = useState(false);
  const [maxMembersAllowed, setMaxMembersAllowed] = useState(1);
  const [participationStatus, setParticipationStatus] =
    useState("not-participating");
  const [canUnregisterStatus, setCanUnregisterStatus] = useState(null);
  const [invitationInfo, setInvitationInfo] = useState(null);
  const [refreshGroupInfo, setRefreshGroupInfo] = useState(false);

  // Store the complete response from the backend.
  const [registrationResponse, setRegistrationResponse] = useState(null);

  // Retrieve the event slug from the URL parameters
  const { eventID } = useParams();
  const eventDetails = eventData.find(e=>e.eventID===eventID);
  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`${env.API_SERVER}/users/${userId}`, {
        withCredentials: true,
      });
      const data = await response.data;
      //console.log(data);
      return data;
    } catch (error) {
      console.error("Error during getting user info:", error);
    }
  };

  const getParticipationStatus = async () => {
    try {
      const response = await axios.get(
        `${env.API_SERVER}/users/get-participation-status/${eventID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      const data = await response.data;
      //console.log(data);
      return data;
    } catch (error) {
      console.error("Error during registration:", error);
      if (error?.response?.data?.error.includes("Event not found")) {
        toast("Event not found");
        navigate("/events");
      }
    }
  };

  const canUnregister = async () => {
    try {
      let response = await axios.get(
        `${env.API_SERVER}/users/can-unregister/${eventID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      //console.log({ canUnregister: response.data });
      return response.data?.canUnregister;
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const isInvited = async () => {
    try {
      let response = await axios.get(`${env.API_SERVER}/users/invitations`, {
        withCredentials: true,
      });
      let invitations = response.data;
      //console.log({ invitations });
      for (const invitation of invitations.data) {
        if (invitation.event.slug == eventID)
          return {
            invited: true,
            group: invitation.group._id,
            status: invitation.status,
          };
      }
      return false;
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleRegister = async () => {
    const payload = {
      userId: userId, // Adjust this as needed
      membersEmails: membersEmails,
      groupName: teamName,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${env.API_SERVER}/events/${eventID}/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      const data = await response.data;

      // If registration was successful, show the success toast.
      toast.success(
        "Successfully registered, now please confirm your team members",
        {
          removeDelay: 8000,
        },
      );
      setRegistrationResponse(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed: " + error.response?.data?.message, {
        removeDelay: 8000,
      });
      setRegistrationResponse({
        success: false,
        message: error.message || "An error occurred during registration.",
      });
      setIsLoading(false);
    }
  };

  // Function to unregister
  const handleUnregister = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${env.API_SERVER}/events/${eventID}/cancel-registration`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      const data = await response.data;
      if (data.success) {
        toast.success("Successfully unregistered");
        setRegistrationResponse(null);
        setParticipationStatus("not-participating");
        setCanUnregisterStatus(false);
      setIsLoading(false);
      } else {
        toast.error("Failed to unregister: " + data.message);
      setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during unregister:", error);
      toast.error("Error during unregister: " + error.message);
    }
  };
  const acceptInvitation = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${env.API_SERVER}/users/accept-invitation`,
        { groupId: invitationInfo.group },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      const data = await response.data;
      if (data.success) {
        toast.success("Successfully accepted invitation");
        setInvitationInfo({ ...invitationInfo, status: "accepted" });
        setRefreshGroupInfo(true);
      setIsLoading(false);
      } else {
        toast.error("Failed to accept invitation: " + data.message);
      setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during accept invitation:", error);
      toast.error("Error during accept invitation: " + error.message);
      setIsLoading(false);
    }
  };
  const declineInvitation = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${env.API_SERVER}/users/reject-invitation`,
        { groupId: invitationInfo.group },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      const data = await response.data;
      if (data.success) {
        toast.success("Successfully declined invitation");
        setInvitationInfo({ ...invitationInfo, status: "declined" });
        setRefreshGroupInfo(true);
      } else {
        toast.error("Failed to decline invitation: " + data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error during decline invitation:", error);
      toast.error("Error during decline invitation: " + error.message);
      setIsLoading(false);
    }
  };
  const fetchParticipationStatusForUseEffect = async () => {
    setLoading(true);
    let status = await getParticipationStatus();
    let { email } = await getUserById(userId);
    setEmail(email);
    console.log(status);
    setParticipationStatus(status);
    setLoading(false);
  };

  useEffect(() => {
    fetchParticipationStatusForUseEffect();
    for (const event of data) {
      if (event.eventID == eventID) {
        //console.log("Event found");
        setIsSoloEvent(event.maxMembers == 1);
        setMaxMembersAllowed(event.maxMembers);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (registrationResponse && registrationResponse.success) {
      fetchParticipationStatusForUseEffect();
    }
  }, [registrationResponse]);

  useEffect(() => {
    const fetchCanUnregister = async () => {
      //console.log({ participationStatus });
      if (participationStatus != "not-participating") {
        let resp = await canUnregister();
        setCanUnregisterStatus(resp);
      }
    };
    fetchCanUnregister();
    const fetchIsInvited = async () => {
      let invited = await isInvited();
      //console.log({ invited });
      setInvitationInfo(invited);
    };
    fetchIsInvited();
  }, [participationStatus]);

  if (loading) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflowY: "auto",
        p: 2,
        transition: "all 0.5s ease-in-out",
      }}
    >
      {/* Background Gradient Overlay with improved gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)",
          opacity: 0.9,
          animation: "pulse 15s infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.7 },
            "50%": { opacity: 0.9 },
            "100%": { opacity: 0.7 }
          },
          zIndex: -1,
        }}
      />
      
      {/* Animated Background Grid Lines */}
      <Box
        sx={{
          position: "absolute",
          zIndex: 0,
          width: "1px",
          height: "100%",
          bgcolor: "rgba(128, 128, 128, 0.15)",
          left: "50%",
          transform: "translateX(-50%)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
          animation: "fadeInOut 8s infinite alternate",
          "@keyframes fadeInOut": {
            "0%": { opacity: 0.3 },
            "100%": { opacity: 0.7 }
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: 0,
          width: "1px",
          height: "100%",
          borderRight: "1px solid rgba(128, 128, 128, 0.15)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
          left: "20%",
          animation: "fadeInOut 10s infinite alternate-reverse",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: 0,
          width: "1px",
          height: "100%",
          borderLeft: "1px solid rgba(128, 128, 128, 0.15)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
          right: "20%",
          animation: "fadeInOut 12s infinite alternate",
        }}
      />
      
      {/* Horizontal grid lines for added depth */}
      <Box
        sx={{
          position: "absolute",
          zIndex: 0,
          width: "100%",
          height: "1px",
          borderTop: "1px solid rgba(128, 128, 128, 0.15)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
          top: "30%",
          animation: "fadeInOut 9s infinite alternate",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: 0,
          width: "100%",
          height: "1px",
          borderBottom: "1px solid rgba(128, 128, 128, 0.15)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
          bottom: "30%",
          animation: "fadeInOut 11s infinite alternate-reverse",
        }}
      />
      
      {/* Registration Box with improved styling and animations */}
      <Paper
        elevation={6}
        sx={{
          zIndex: 10,
          width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
          p: { xs: 3, sm: 4, md: 5 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          bgcolor: "rgba(20, 20, 20, 0.6)",
          backdropFilter: "blur(15px)",
          borderRadius: 3,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.05)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.8), inset 0 0 25px rgba(255, 255, 255, 0.08)",
            transform: "translateY(-5px)",
          },
          animation: "fadeIn 0.8s ease-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" }
          },
        }}
      >
        {/* Event poster image with improved styling and animation */}
        <img
          src={getImageUrl(eventDetails.eventPoster)}
          alt={eventDetails.eventName}
          style={{
            display: { xs: "none", lg: "block" },
            width: "auto",
            maxWidth: "45%",
            padding: "14px",
            height: "fit-content",
            borderRadius: "24px",
            objectFit: "contain",
            transition: "all 0.5s ease",
            transform: "perspective(1000px) rotateY(-5deg)",
            boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.3)",
            filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.1))",
          }}
          className="group-hover:scale-105 group-hover:rotate-2 transition-all duration-500"
        />
        
        {/* Form Section with improved styling */}
        <Box 
          sx={{ 
            width: "100%", 
            maxWidth: "400px",
            ml: { md: 4 },
            animation: "slideIn 0.8s ease-out forwards",
            "@keyframes slideIn": {
              "0%": { opacity: 0, transform: "translateX(20px)" },
              "100%": { opacity: 1, transform: "translateX(0)" }
            }
          }}
        >
          <Typography
            variant="h4"
            color="white"
            align="center"
            fontWeight="bold"
            sx={{
              mb: 3,
              fontSize: { xs: "1.6rem", md: "2.2rem" },
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 30px rgba(20, 220, 50, 0.2)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                width: "60px",
                height: "3px",
                bottom: "-10px",
                left: "calc(50% - 30px)",
                backgroundColor: "rgba(25, 255, 55, 0.5)",
                boxShadow: "0 0 10px rgba(25, 255, 55, 0.5)",
                transition: "all 0.3s ease",
              },
              "&:hover:after": {
                width: "100px",
                left: "calc(50% - 50px)",
                backgroundColor: "rgba(25, 255, 55, 0.7)",
              },
            }}
          >
            REGISTRATION
          </Typography>
          
          {participationStatus == "not-participating" && !isSoloEvent && (
            <>
              <TextField
                fullWidth
                size="medium"
                label="Team Name"
                variant="outlined"
                margin="dense"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                InputLabelProps={{
                  style: {
                    color: "rgba(25, 255, 55, 0.8)",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    textShadow: "0 0 5px rgba(25, 255, 55, 0.3)",
                  },
                }}
                sx={{
                  "mb": 2,
                  "transition": "all 0.3s ease",
                  "& .MuiOutlinedInput-root": {
                    "backgroundColor": "rgba(0, 0, 0, 0.6)",
                    "borderRadius": "8px",
                    "transition": "all 0.3s ease",
                    "boxShadow": "0 0 10px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(25, 255, 55, 0.05)",
                    "& fieldset": { 
                      borderColor: "rgba(25, 255, 55, 0.3)",
                      borderWidth: "2px",
                      transition: "all 0.3s ease"
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(25, 255, 55, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(25, 255, 55, 0.8)",
                      boxShadow: "0 0 8px rgba(25, 255, 55, 0.3)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "1.1rem",
                    color: "white",
                    padding: "14px 16px",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.5)",
                    },
                  },
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              />
              
              <TextField
                fullWidth
                size="medium"
                label={`Team Member 1 (Leader) Email`}
                variant="outlined"
                margin="dense"
                value={email}
                InputProps={{
                  startAdornment: email ? (
                    <InputAdornment position="start">
                      <CheckCircleIcon 
                        sx={{ 
                          color: "rgba(25, 255, 55, 0.8)", 
                          mr: 1,
                          animation: "pulse 2s infinite",
                          "@keyframes pulse": {
                            "0%": { opacity: 0.7 },
                            "50%": { opacity: 1 },
                            "100%": { opacity: 0.7 }
                          }
                        }} 
                      />
                    </InputAdornment>
                  ) : null,
                }}
                sx={{
                  "mb": 2,
                  "transition": "all 0.3s ease",
                  "& .MuiOutlinedInput-root": {
                    "backgroundColor": "rgba(0, 0, 0, 0.6)",
                    "borderRadius": "8px",
                    "transition": "all 0.3s ease",
                    "boxShadow": "0 0 10px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(25, 255, 55, 0.05)",
                    "& fieldset": {
                      borderColor: email ? "rgba(25, 255, 55, 0.5)" : "rgba(255, 255, 255, 0.3)",
                      borderWidth: "2px"
                    },
                    "&:hover fieldset": {
                      borderColor: email ? "rgba(25, 255, 55, 0.7)" : "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: email ? "rgba(25, 255, 55, 0.8)" : "rgba(255, 255, 255, 0.6)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "1.1rem",
                    color: "white",
                    padding: "14px 16px",
                  },
                  "input": {
                    color: "white",
                  }
                }}
                InputLabelProps={{
                  style: {
                    color: "rgba(25, 255, 55, 0.8)",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    textShadow: "0 0 5px rgba(25, 255, 55, 0.3)",
                  },
                }}
              />
              
              <TeamMembers
                membersEmails={membersEmails}
                setMembersEmails={setMembersEmails}
                maxMembers={maxMembersAllowed}
              />
              
              {/* REGISTER Button with improved styling */}
              <Button
                variant="outlined"
                onClick={handleRegister}
                disabled={isLoading}
                sx={{
                  "mt": 3,
                  "py": 1.5,
                  "width": "100%",
                  "color": "white",
                  "borderColor": "rgba(25, 255, 55, 0.5)",
                  "borderWidth": "2px",
                  "fontWeight": "bold",
                  "fontSize": "1rem",
                  "letterSpacing": "3px",
                  "backgroundColor": "rgba(0, 0, 0, 0.6)",
                  "position": "relative",
                  "transition": "all 0.4s ease",
                  "overflow": "hidden",
                  "zIndex": 1,
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(25, 255, 55, 0.2), transparent)",
                    transition: "all 0.5s",
                    zIndex: -1,
                  },
                  "&:hover": {
                    borderColor: "rgba(25, 255, 55, 0.8)",
                    boxShadow: "0 0 20px rgba(25, 255, 55, 0.3)",
                    transform: "translateY(-3px)",
                    letterSpacing: "4px",
                    bgcolor: "rgba(25, 255, 55, 0.1)",
                    "&:before": {
                      left: "100%",
                    },
                  },
                  "&:active": {
                    transform: "translateY(0)",
                    boxShadow: "0 0 10px rgba(25, 255, 55, 0.2)",
                  }
                }}
              >
                REGISTER
              </Button>
              <BackButton eventSlug={eventID}></BackButton>
            </>
          )}
          
          {participationStatus == "not-participating" && isSoloEvent && (
            <div className="flex gap-2 text-white flex-col">
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "white", 
                  mb: 2, 
                  textAlign: "center",
                  textShadow: "0 0 5px rgba(255, 255, 255, 0.3)"
                }}
              >
                Confirming once more before registering for solo event!
              </Typography>
              
              {/* REGISTER Solo Button with improved styling */}
              <Button
                variant="outlined"
                disabled={isLoading}
                onClick={handleRegister}
                sx={{
                  "mt": 1,
                  "py": 1.5,
                  "width": "100%",
                  "color": "white",
                  "borderColor": "rgba(25, 255, 55, 0.5)",
                  "borderWidth": "2px",
                  "fontWeight": "bold",
                  "fontSize": "1rem",
                  "letterSpacing": "3px",
                  "backgroundColor": "rgba(0, 0, 0, 0.6)",
                  "position": "relative",
                  "transition": "all 0.4s ease",
                  "overflow": "hidden",
                  "zIndex": 1,
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(25, 255, 55, 0.2), transparent)",
                    transition: "all 0.5s",
                    zIndex: -1,
                  },
                  "&:hover": {
                    borderColor: "rgba(25, 255, 55, 0.8)",
                    boxShadow: "0 0 20px rgba(25, 255, 55, 0.3)",
                    transform: "translateY(-3px)",
                    letterSpacing: "4px",
                    bgcolor: "rgba(25, 255, 55, 0.1)",
                    "&:before": {
                      left: "100%",
                    },
                  },
                  "&:active": {
                    transform: "translateY(0)",
                    boxShadow: "0 0 10px rgba(25, 255, 55, 0.2)",
                  }
                }}
              >
                REGISTER - SOLO
              </Button>
            </div>
          )}
          
          {participationStatus != "not-participating" && !isSoloEvent && (
            <GroupInfo
              userId={userId}
              eventID={eventID}
              refresh={refreshGroupInfo}
              setRefresh={setRefreshGroupInfo}
            />
          )}
          
          {participationStatus != "not-participating" && isSoloEvent && (
            <div className="flex gap-2 text-white flex-col">
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "white", 
                  p: 2, 
                  textAlign: "center",
                  borderRadius: "8px",
                  background: "rgba(25, 255, 55, 0.1)",
                  border: "1px solid rgba(25, 255, 55, 0.3)",
                  boxShadow: "0 0 15px rgba(25, 255, 55, 0.1)",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { boxShadow: "0 0 15px rgba(25, 255, 55, 0.1)" },
                    "50%": { boxShadow: "0 0 20px rgba(25, 255, 55, 0.3)" },
                    "100%": { boxShadow: "0 0 15px rgba(25, 255, 55, 0.1)" }
                  }
                }}
              >
                You are already registered for this event!
              </Typography>
            </div>
          )}
          
          {/* UNREGISTER Button with improved styling */}
          {canUnregisterStatus && (
            <Button
              variant="outlined"
              onClick={handleUnregister}
              disabled={isLoading}
              sx={{
                "mt": 3,
                "py": 1.5,
                "width": "100%",
                "color": "white",
                "borderColor": "rgba(255, 80, 80, 0.5)",
                "borderWidth": "2px",
                "fontWeight": "bold",
                "fontSize": "1rem",
                "letterSpacing": "3px",
                "backgroundColor": "rgba(0, 0, 0, 0.6)",
                "position": "relative",
                "transition": "all 0.4s ease",
                "overflow": "hidden",
                "zIndex": 1,
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 80, 80, 0.2), transparent)",
                  transition: "all 0.5s",
                  zIndex: -1,
                },
                "&:hover": {
                  borderColor: "rgba(255, 80, 80, 0.8)",
                  boxShadow: "0 0 20px rgba(255, 80, 80, 0.3)",
                  transform: "translateY(-3px)",
                  letterSpacing: "4px",
                  bgcolor: "rgba(255, 80, 80, 0.1)",
                  "&:before": {
                    left: "100%",
                  },
                },
                "&:active": {
                  transform: "translateY(0)",
                  boxShadow: "0 0 10px rgba(255, 80, 80, 0.2)",
                }
              }}
            >
              UNREGISTER
            </Button>
          )}
          
          {invitationInfo?.status == "pending" && (
            <div className="flex gap-3 mt-4 justify-center">
              <Button
                onClick={acceptInvitation}
                sx={{
                  "py": 1.2,
                  "px": 3,
                  "color": "white",
                  "borderColor": "rgba(25, 255, 55, 0.5)",
                  "borderWidth": "2px",
                  "fontWeight": "bold",
                  "fontSize": "0.9rem",
                  "bgcolor": "rgba(25, 255, 55, 0.1)",
                  "borderRadius": "6px",
                  "transition": "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(25, 255, 55, 0.2)",
                    boxShadow: "0 0 15px rgba(25, 255, 55, 0.3)",
                    transform: "translateY(-2px)",
                  },
                }}
                variant="outlined"
              >
                Accept Invitation
              </Button>
              <Button
                onClick={declineInvitation}
                disabled={isLoading}
                sx={{
                  "py": 1.2,
                  "px": 3,
                  "color": "white",
                  "borderColor": "rgba(255, 80, 80, 0.5)",
                  "borderWidth": "2px",
                  "fontWeight": "bold",
                  "fontSize": "0.9rem",
                  "bgcolor": "rgba(255, 80, 80, 0.1)",
                  "borderRadius": "6px",
                  "transition": "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255, 80, 80, 0.2)",
                    boxShadow: "0 0 15px rgba(255, 80, 80, 0.3)",
                    transform: "translateY(-2px)",
                  },
                }}
                variant="outlined"
              >
                Decline Invitation
              </Button>
            </div>
          )}
        </Box>
      </Paper>
      {/* <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 9000,
          removeDelay: 9000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 5000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      /> */}
    </Box>
  )
};

export default App;

import React, { useState } from "react";
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
                "bgcolor": "black",
                "boxShadow": 51,
                "fontWeight": "bold",
                "fontFamily": "Roboto, sans-serif",
                "& .MuiOutlinedInput-root": {
                  "backgroundColor": "rgba(255, 255, 255, 0.1)",
                  "borderRadius": "4px",
                  "transition": "all 0.3s ease",
                  "& fieldset": {
                    borderColor: email
                      ? showSuccess
                        ? "green"
                        : "red"
                      : "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: email
                      ? showSuccess
                        ? "green"
                        : "red"
                      : "rgba(255, 255, 255, 0.5)",
                  },
                },
                "& .MuiInputBase-input": {
                  fontSize: "1.2rem",
                  color: "white",
                },
              }}
            />
            {membersEmails.length > 1 && (
              <IconButton
                onClick={() => handleRemoveMember(index)}
                sx={{ color: "red", ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            )}
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
  console.log({ userId, eventID });
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
      console.log(data);
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

  return (
    <div className="w-full h-full items-center p-4 text-white">
      <h1>Group Info</h1>
      {groupInfo ? (
        <div>
          <h2>Group Name: {groupInfo.name}</h2>
          <h2>
            Creator: {groupInfo?.creator?.name} - {groupInfo?.creator?.email}
          </h2>
          <h2>Members:</h2>
          <ul>
            {groupInfo?.members?.map(({ user, status }, index) => (
              <li key={index}>
                {user.name} - {user.email} - {status}
              </li>
            ))}
          </ul>
          <div>
            <h2>Group Status: {groupInfo.status}</h2>
          </div>
        </div>
      ) : (
        <p>No group info available</p>
      )}
    </div>
  );
};

const App = () => {
  const { width, height } = useWindowSize();
  const userId = localStorage.getItem("sid");
  console.log({ userId });
  const navigate = useNavigate();
  if (!userId) {
    navigate("/login");
    // return;
  }
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [membersEmails, setMembersEmails] = useState([""]);
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

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`${env.API_SERVER}/users/${userId}`, {
        withCredentials: true,
      });
      const data = await response.data;
      console.log(data);
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
      console.log(data);
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
      console.log({ canUnregister: response.data });
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
      console.log({ invitations });
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
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed: " + error.response?.data?.message, {
        removeDelay: 8000,
      });
      setRegistrationResponse({
        success: false,
        message: error.message || "An error occurred during registration.",
      });
    }
  };

  // Function to unregister
  const handleUnregister = async () => {
    try {
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
      } else {
        toast.error("Failed to unregister: " + data.message);
      }
    } catch (error) {
      console.error("Error during unregister:", error);
      toast.error("Error during unregister: " + error.message);
    }
  };
  const acceptInvitation = async () => {
    try {
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
      } else {
        toast.error("Failed to accept invitation: " + data.message);
      }
    } catch (error) {
      console.error("Error during accept invitation:", error);
      toast.error("Error during accept invitation: " + error.message);
    }
  };
  const declineInvitation = async () => {
    try {
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
    } catch (error) {
      console.error("Error during decline invitation:", error);
      toast.error("Error during decline invitation: " + error.message);
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
        console.log("Event found");
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
      console.log({ participationStatus });
      if (participationStatus != "not-participating") {
        let resp = await canUnregister();
        setCanUnregisterStatus(resp);
      }
    };
    fetchCanUnregister();
    const fetchIsInvited = async () => {
      let invited = await isInvited();
      console.log({ invited });
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
        bgcolor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflowY: "auto",
        p: 2,
      }}
    >
      {/* Background Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #000000, #434343)",
          zIndex: -1,
        }}
      />
      {/* Background Lines */}
      <Box
        sx={{
          position: "absolute",
          zIndex: 0,
          width: "1px",
          height: "100%",
          bgcolor: "gray",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: 0,
          width: "1px",
          height: "100%",
          borderRight: "1px solid gray",
          left: "20%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: 0,
          width: "1px",
          height: "100%",
          borderLeft: "1px solid gray",
          right: "20%",
        }}
      />
      {/* Registration Box */}
      <Paper
        elevation={6}
        sx={{
          zIndex: 10,
          width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
          p: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          bgcolor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(9px)",
          borderRadius: 3,
          border: "1px solid white",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Image Section */}
        {/* <Box */}
        {/*   sx={{ */}
        {/*     width: { xs: "100%", sm: "90%", md: "50%" }, */}
        {/*     display: "flex", */}
        {/*     justifyContent: "center", */}
        {/*     mb: { xs: 3, md: 0 }, */}
        {/*     mr: { md: 3 }, */}
        {/*   }} */}
        {/* > */}
        {/*   <Box */}
        {/*     component="img" */}
        {/*     src={image} */}
        {/*     alt="Robot" */}
        {/*     sx={{ */}
        {/*       width: "100%", */}
        {/*       height: "auto", */}
        {/*       maxHeight: { xs: "200px", md: "calc(100vh - 100px)" }, */}
        {/*       objectFit: "contain", */}
        {/*       objectPosition: "top", */}
        {/*       display: "block", */}
        {/*     }} */}
        {/*   /> */}
        {/* </Box> */}
        {/* Form Section */}
        <MascotAnimation />
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          <Typography
            variant="h4"
            color="white"
            align="center"
            fontWeight="bold"
            sx={{
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
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
                    color: "rgba(25, 255, 55, 0.7)",
                    fontSize: "0.8rem",
                  },
                }}
                sx={{
                  "mb": 1.5,
                  "bgcolor": "black",
                  "boxShadow": 51,
                  "fontWeight": "bold",
                  "fontFamily": "Roboto, sans-serif",
                  "& .MuiOutlinedInput-root": {
                    "backgroundColor": "rgba(255, 255, 255, 0.1)",
                    "borderRadius": "4px",
                    "transition": "all 0.3s ease",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "1.2rem",
                    color: "white",
                  },
                }}
              />
              <TextField
                fullWidth
                size="medium"
                label={`Team Member 1 (Leader) Email`}
                variant="outlined"
                margin="dense"
                disabled={true}
                value={email}
                InputProps={{
                  startAdornment: email ? (
                    <InputAdornment position="start">
                      <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
                    </InputAdornment>
                  ) : null,
                }}
                sx={{
                  "bgcolor": "black",
                  "boxShadow": 51,
                  "fontWeight": "bold",
                  "fontFamily": "Roboto, sans-serif",
                  "fontColor": "white",
                  "& .MuiOutlinedInput-root": {
                    "backgroundColor": "rgba(255, 255, 255, 0.1)",
                    "borderRadius": "4px",
                    "transition": "all 0.3s ease",
                    "& fieldset": {
                      borderColor: email ? "green" : "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: email ? "green" : "rgba(255, 255, 255, 0.5)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "1.2rem",
                    color: "white",
                  },
                  input : {
                    color: "white",
                  }
                }}
                InputLabelProps={{
                  style: {
                    color: "rgba(25, 255, 55, 0.7)",
                    fontSize: "0.8rem",
                  },
                }}
              />
              <TeamMembers
                membersEmails={membersEmails}
                setMembersEmails={setMembersEmails}
                maxMembers={maxMembersAllowed}
              />
              {/* REGISTER Button */}
              <Button
                variant="outlined"
                onClick={handleRegister}
                sx={{
                  "mt": 1.5,
                  "py": { xs: 1, md: 1.5 },
                  "color": "white",
                  "borderColor": "white",
                  "fontWeight": "bold",
                  "fontSize": { xs: "0.9rem", md: "0.8rem" },
                  "bgcolor": "black",
                  "position": "relative",
                  "transition": "all 0.3s ease-in-out",
                  "boxShadow": "inset 0 0 0px rgba(255, 255, 255, 0)",
                  "&:hover": {
                    boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.8)",
                    bgcolor: "black",
                    transform: "scale(1.02)",
                  },
                }}
              >
                REGISTER
              </Button>
            </>
          )}
          {participationStatus == "not-participating" && isSoloEvent && (
            <div className="flex gap-2 text-white flex-col">
              Confirming once more before registering for solo event!
              {/* REGISTER Button */}
              <Button
                variant="outlined"
                onClick={handleRegister}
                sx={{
                  "mt": 1.5,
                  "py": { xs: 1, md: 1.5 },
                  "color": "white",
                  "borderColor": "white",
                  "fontWeight": "bold",
                  "fontSize": { xs: "0.9rem", md: "0.8rem" },
                  "bgcolor": "black",
                  "position": "relative",
                  "transition": "all 0.3s ease-in-out",
                  "boxShadow": "inset 0 0 0px rgba(255, 255, 255, 0)",
                  "&:hover": {
                    boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.8)",
                    bgcolor: "black",
                    transform: "scale(1.02)",
                  },
                }}
              >
                REGISTER - Solo
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
              You are already registered for this event!
            </div>
          )}
          {/* UNREGISTER Button: Only show if registration is successful */}
          {canUnregisterStatus && (
            <Button
              variant="outlined"
              onClick={handleUnregister}
              sx={{
                "mt": 1.5,
                "ml": 1,
                "py": { xs: 1, md: 1.5 },
                "color": "white",
                "borderColor": "white",
                "fontWeight": "bold",
                "fontSize": { xs: "0.9rem", md: "0.8rem" },
                "bgcolor": "black",
                "position": "relative",
                "transition": "all 0.3s ease-in-out",
                "boxShadow": "inset 0 0 0px rgba(255, 255, 255, 0)",
                "&:hover": {
                  boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.8)",
                  bgcolor: "black",
                  transform: "scale(1.02)",
                },
              }}
            >
              UNREGISTER
            </Button>
          )}
          {invitationInfo?.status == "pending" && (
            <div className="flex gap-2">
              <button
                className="bg-gray-800 text-white p-2 rounded-md mt-2 border border-gray-600"
                onClick={acceptInvitation}
              >
                Accept Invitation
              </button>
              <button
                className="bg-gray-800 text-white p-2 rounded-md mt-2 border border-gray-600"
                onClick={declineInvitation}
              >
                Decline Invitation
              </button>
            </div>
          )}
        </Box>
      </Paper>
      <Toaster
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
      />
    </Box>
  );
};

export default App;

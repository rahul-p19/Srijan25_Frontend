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
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
//import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import image from "/src/assets/icons/mascot.svg";

// TeamMembers Component for dynamically adding/removing team member email fields
const TeamMembers = ({ membersEmails, setMembersEmails }) => {
  // Email validation using a basic regex
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Check if the current email is a duplicate (case insensitive)
  const isDuplicate = (email, index) => {
    return (
      membersEmails.filter(
        (e) => e.trim().toLowerCase() === email.trim().toLowerCase()
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
              label={`Team Member ${index + 1} Email`}
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
                bgcolor: "black",
                boxShadow: 51,
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
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
      <Button
        variant="outlined"
        onClick={handleAddMember}
        sx={{
          mt: 1,
          color: "white",
          borderColor: "white",
          fontWeight: "bold",
          bgcolor: "black",
          "&:hover": { bgcolor: "black" },
        }}
      >
        Add Member
      </Button>
    </Box>
  );
};

const App = () => {
  const { width, height } = useWindowSize();
  const [teamName, setTeamName] = useState("");
  const [teamLeaderName, setTeamLeaderName] = useState("");
  const [membersEmails, setMembersEmails] = useState([""]);
  // Store the complete response from the backend.
  const [registrationResponse, setRegistrationResponse] = useState(null);

  // Retrieve the event slug from the URL parameters
  const { eventID } = useParams();

  // Function to register
  const handleRegister = async () => {
    const payload = {
      userId: "67b201fb012d176009da4d6f", // Adjust this as needed
      membersEmails: membersEmails,
      groupName: teamName,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/${eventID}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      toast.success("Successfully registered, now please confirm your team members", {
        removeDelay: 8000,
      });
      setRegistrationResponse(data);
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationResponse({
        success: false,
        message: error.message || "An error occurred during registration.",
      });
    }
  };

  // Function to unregister
  const handleUnregister = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/${eventID}/unregister`,
        {
          method: "POST", // or DELETE depending on your backend implementation
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: "67b201fb012d176009da4d6f" }),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Successfully unregistered");
        setRegistrationResponse(null);
      } else {
        toast.error("Failed to unregister: " + data.message);
      }
    } catch (error) {
      console.error("Error during unregister:", error);
      toast.error("Error during unregister: " + error.message);
    }
  };

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
        <Box
          sx={{
            width: { xs: "100%", sm: "90%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            mb: { xs: 3, md: 0 },
            mr: { md: 3 },
          }}
        >
          <Box
            component="img"
            src={image}
            alt="Robot"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: { xs: "200px", md: "calc(100vh - 100px)" },
              objectFit: "contain",
              objectPosition: "top",
              display: "block",
            }}
          />
        </Box>
        {/* Form Section */}
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
          <TextField
            fullWidth
            size="medium"
            label="Team Name"
            variant="outlined"
            margin="dense"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            InputLabelProps={{
              style: { color: "rgba(25, 255, 55, 0.7)", fontSize: "0.8rem" },
            }}
            sx={{
              mb: 1.5,
              bgcolor: "black",
              boxShadow: 51,
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                transition: "all 0.3s ease",
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
            label="Team Leader Name"
            variant="outlined"
            margin="dense"
            value={teamLeaderName}
            onChange={(e) => setTeamLeaderName(e.target.value)}
            InputLabelProps={{
              style: { color: "rgba(25, 255, 55, 0.7)", fontSize: "0.8rem" },
            }}
            sx={{
              mb: 1.5,
              bgcolor: "black",
              boxShadow: 51,
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                transition: "all 0.3s ease",
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
          <TeamMembers
            membersEmails={membersEmails}
            setMembersEmails={setMembersEmails}
          />
          {/* REGISTER Button */}
          <Button
            variant="outlined"
            onClick={handleRegister}
            sx={{
              mt: 1.5,
              py: { xs: 1, md: 1.5 },
              color: "white",
              borderColor: "white",
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", md: "0.8rem" },
              bgcolor: "black",
              position: "relative",
              transition: "all 0.3s ease-in-out",
              boxShadow: "inset 0 0 0px rgba(255, 255, 255, 0)",
              "&:hover": {
                boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.8)",
                bgcolor: "black",
                transform: "scale(1.02)",
              },
            }}
          >
            REGISTER
          </Button>
          {/* UNREGISTER Button: Only show if registration is successful */}
          {registrationResponse && registrationResponse.success && (
            <Button
              variant="outlined"
              onClick={handleUnregister}
              sx={{
                mt: 1.5,
                ml: 1,
                py: { xs: 1, md: 1.5 },
                color: "white",
                borderColor: "white",
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", md: "0.8rem" },
                bgcolor: "black",
                position: "relative",
                transition: "all 0.3s ease-in-out",
                boxShadow: "inset 0 0 0px rgba(255, 255, 255, 0)",
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
          {registrationResponse && (
            <Typography
              variant="body1"
              align="center"
              sx={{
                mt: 2,
                color: registrationResponse.success ? "green" : "red",
              }}
            >
              {registrationResponse.message}
            </Typography>
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
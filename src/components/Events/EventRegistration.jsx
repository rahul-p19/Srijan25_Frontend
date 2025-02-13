
import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

// (Optional) Simple email validation regex for future use
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// TeamMembers Component for dynamically adding/removing team member email fields
const TeamMembers = () => {
  const [members, setMembers] = useState([""]);

  const handleMemberChange = (index, event) => {
    const newMembers = [...members];
    newMembers[index] = event.target.value;
    setMembers(newMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  const handleRemoveMember = (index) => {
    // Remove the member at the specified index
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="subtitle1" color="white" sx={{ mb: 1 }}>
        Team Members Emails:
      </Typography>
      {members.map((email, index) => (
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
            InputLabelProps={{
              style: { color: "rgba(25, 255, 55, 0.7)", fontSize: "0.8rem" },
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
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
              },
              "& .MuiInputBase-input": {
                fontSize: "1.2rem",
                color: "blue",
              },
            }}
          />
          <Button
            variant="outlined"
            onClick={() => handleRemoveMember(index)}
            sx={{
              ml: 1,
              color: "white",
              borderColor: "white",
              fontWeight: "bold",
              bgcolor: "black",
              "&:hover": { bgcolor: "black" },
            }}
          >
            Remove
          </Button>
        </Box>
      ))}
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
  const [email, setEmail] = useState("");

  // Update the email state as the user types in the main email field.
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
        {/* Robot Image */}
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
            src="https://s3-alpha-sig.figma.com/img/859d/4657/f0a900f634d163ac50ea76555f4f2f42?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sIUYfd1LRJqU12uyyj0NgeSVBKkUSsj4iQs4GJcG~MtsDHdWb8ExpKdlkR33zFTuWAFjtxGH~IKjpowHV-0VG63cKFYOALhxlqDG~4jDpw8pcfoWAAlfYwXHPgBw7w4nWIALmVoi18j1ZHFYLbqa2fWw5XesxB4nVMAK74oVWsSdFyN~dWcB6b0dhnmlFE4dKdIPkWN~Ac4Mf5TTe7AFz5bP0u4gTAIds45Yl29pOC-2onF1mXLir45JzAQdKr-y7cTQovEtTEaRg5nA0pr1iZ32-OPHaCeF3tkulMXeKyGpC3VnQ20dZo3ZF8axGMppO~MTCxmJ0H17vmG9SDbTIQ__"
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
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
          }}
        >
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

          {/* Team Name Field */}
          <TextField
            fullWidth
            size="medium"
            label="Team Name"
            variant="outlined"
            margin="dense"
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
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
              },
              "& .MuiInputBase-input": {
                fontSize: "1.2rem",
                color: "blue",
              },
            }}
          />

          {/* Team Leader Name Field */}
          <TextField
            fullWidth
            size="medium"
            label="Team Leader Name"
            variant="outlined"
            margin="dense"
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
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
              },
              "& .MuiInputBase-input": {
                fontSize: "1.2rem",
                color: "blue",
              },
            }}
          />

          {/* Team Members Emails Component */}
          <TeamMembers />

          <Button
            variant="outlined"
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
        </Box>
      </Paper>
    </Box>
  );
};

export default App;

import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";


const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const App = () => {
  const [email, setEmail] = useState("");

  // Update the email state as the user types.
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
          // Adjusted width with extra reduction on mediumer screens.
          width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
          p: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          bgcolor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(9px)",
          borderRadius: 3,
          border: "1px solid white",
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
            sx={{ mb: 2, fontSize: { xs: "1.5rem", md: "2rem" } }}
          >
            REGISTRATION
          </Typography>

          {/* Name Field */}
          <TextField
            fullWidth
            size="medium"
            label="Name"
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              style: { color: "rgba(255, 255, 255, 0.7)", fontSize: "0.8rem" },
            }}
            sx={{
              mb: 1.5,
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8rem",
                color: "white",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
              },
            }}
          />

          {/* Email Field with Validation */}
          <TextField
            fullWidth
            size="medium"
            label="Email"
            variant="outlined"
            margin="dense"
            value={email}
            onChange={handleEmailChange}
            InputLabelProps={{
              style: { color: "rgba(255, 255, 255, 0.7)", fontSize: "0.8rem" },
            }}
            sx={{
              mb: 1.5,
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8rem",
                color: "white",
                "& fieldset": {
                  borderColor:
                    email === ""
                      ? "rgba(255, 255, 255, 0.3)"
                      : isValidEmail(email)
                      ? "green"
                      : "red",
                },
                "&:hover fieldset": {
                  borderColor:
                    email === ""
                      ? "rgba(255, 255, 255, 0.5)"
                      : isValidEmail(email)
                      ? "green"
                      : "red",
                },
              },
            }}
          />

          {/* Additional Fields */}
          <TextField
            fullWidth
            size="medium"
            label="College name"
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              style: { color: "rgba(255, 255, 255, 0.7)", fontSize: "0.8rem" },
            }}
            sx={{
              mb: 1.5,
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8rem",
                color: "white",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
              },
            }}
          />
          <TextField
            fullWidth
            size="medium"
            label="Password"
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              style: { color: "rgba(255, 255, 255, 0.7)", fontSize: "0.8rem" },
            }}
            sx={{
              mb: 1.5,
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8rem",
                color: "white",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
              },
            }}
          />
          <TextField
            fullWidth
            size="medium"
            label="Refferal"
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              style: { color: "rgba(255, 255, 255, 0.7)", fontSize: "0.8rem" },
            }}
            sx={{
              mb: 1.5,
              "& .MuiOutlinedInput-root": {
                fontSize: "",
                color: "white",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
              },
            }}
          />

          <Button
           // fullWidth
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































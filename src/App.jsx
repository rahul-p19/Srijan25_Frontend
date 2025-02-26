import "./App.css";
import { useState, useEffect } from "react";
import { LandingPage } from "./components/home/LandingPage";
import MerchandisePage from "./components/MerchandisePage";
import Eventpage from "./components/Events/Eventpage";
import EventRegistration from "./components/Events/EventRegistration";
import { DashboardPage } from "./components/protected_routes/DashboardPage";
import Signup from "./components/login/Signup";
import Login from "./components/login/Login";
import EmailVerify from "./components/login/EmailVerify";
import ResetPassword from "./components/login/ResetPassword";
import ForgotPassword from "./components/login/ForgotPassword";
import PageNotFound from "./components/PageNotFound";
import AllEvents from "./components/Events/allevents/AllinoneEvents";
import { WorkshopPage } from "./components/workshop/WorkshopPage";
import Loading from "./components/Loading"

import { ProtectedRoute } from "./components/protected_routes/AuthRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notifications from "./components/protected_routes/Notifications";
import { Toaster } from "react-hot-toast";
import { logoutCall } from "./services/http/auth";
import { uri } from "./config/endpoints";
import Referral from "./components/login/Referral";

function App() {
  const [user, setUser] = useState("");
  const [checking, setChecking] = useState(true);

  const handleLogout = async () => {
    setUser("");
    localStorage.removeItem("sid");
    localStorage.removeItem("providerID");
    await logoutCall();
  };

  const setActiveUser = () => {
    const sid = localStorage.getItem("sid");
    setUser(sid ?? "");
  };

  useEffect(setActiveUser, [user]);

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route element={<ProtectedRoute accessAllowed={!!user} />}>
            <Route
              path="/dashboard"
              element={<DashboardPage logout={handleLogout} />}
            />
          </Route>
          <Route path="/events" element={<Eventpage />} />
          <Route path="/events/:category/:eventID" element={<AllEvents />} />
          <Route
            path="/events/:category/:eventID/:registration"
            element={<EventRegistration />}
          />
          <Route>
            {/* <Route path="/merchandise" element={
             <ProtectedRoute checkUserSession={checkUserSession} logout={logout}>
             <MerchandisePage />
           </ProtectedRoute>
              } /> */}
              <Route path="/merchandise" element={ <MerchandisePage />}/>
            </Route>
          <Route path="/events" element={<Eventpage />} />
          <Route path="/eventregistration" element={<EventRegistration />} />
          <Route
            path="/signup"
            element={<Signup user={user} setActiveUser={setActiveUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setActiveUser={setActiveUser} />}
          />
          <Route path="/referral" element={<Referral />} />
          <Route path="/verify" element={<EmailVerify />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            backgroundColor: "#141414",
            borderRadius: "6px",
            fontSize: "16px",
            padding: "6px",
            color: "white",
            borderTop: "1px solid #b60000",
            borderLeft: "1px solid #b60000",
            borderBottom: "1px solid #532e8f",
            borderRight: "1px solid #532e8f",
            zIndex: 1005,
            textAlign: "center",
          },
        }}
      />
    </>
  );
}

export default App;

import "./App.css";
import { LandingPage } from "./components/home/LandingPage";
import MerchandisePage from "./components/MerchandisePage";
import Eventpage from "./components/Events/Eventpage";
import EventRegistration from "./components/Events/EventRegistration";
import { DashboardPage } from "./components/protected_routes/DashboardPage";

import { ProtectedRoute } from "./components/protected_routes/AuthRoutes";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  /**
   * @typedef {object} User
   * @property {string} id
   * @property {string} name
   * @property {string[]} permissions
   * @property {string} [imageURL]
   * @property {string} year
   * @property {string} department
   */

  /**
   * Tracks the current user as per authentication state
   * @type {[User, React.Dispatch<React.SetStateAction<User>>]}
   */
  const [user, setUser] = useState({
    id: "123",
    name: "bob pop",
    permissions: [],
    department: "idk man",
    year: "Eighth",
  });

  const handleLogout = () => setUser(null);

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route element={<ProtectedRoute accessAllowed={!!user} />}>
            <Route
              path="/dashboard"
              element={<DashboardPage user={user} logout={handleLogout} />}
            />
          </Route>
          <Route path="/merchandise" element={<MerchandisePage />} />
          <Route path="/events" element={<Eventpage />} />
          <Route path="/eventregistration" element={<EventRegistration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

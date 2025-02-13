import "./App.css";
import { LandingPage } from "./components/home/LandingPage";
import MerchandisePage from "./components/MerchandisePage";
import Eventpage from "./components/Events/Eventpage";
import EventRegistration from "./components/Events/EventRegistration";
import { DashboardPage } from "./components/protected_routes/DashboardPage";
import PageNotFound from "./components/PageNotFound";

import { ProtectedRoute } from "./components/protected_routes/AuthRoutes";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import jwt from 'jsonwebtoken';
import { verifyToken } from "./components/protected_routes/verifytoken";

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

  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('/api/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIsAuthenticated(response.ok);
    } catch (err) {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    }
  };


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
          <Route>
            <Route path="/merchandise" element={
             <ProtectedRoute isAuthenticated={isAuthenticated}>
             <MerchandisePage />
           </ProtectedRoute>
              } />
            </Route>
          <Route path="/events" element={<Eventpage />} />
          <Route path="/eventregistration" element={<EventRegistration />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes >
      </Router >
    </>
  );
}

export default App;

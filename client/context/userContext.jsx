import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/welcome", {
          withCredentials: true, // Ensure cookies are sent
        });
        setUser(response.data); // Set user data from API response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const logout = () => {
    setUser(null); // Clear the user state in the context
    // Clear session or authentication data (e.g., tokens, cookies)
    localStorage.removeItem("authToken"); // If you're storing the token in localStorage
    sessionStorage.removeItem("authToken"); // If you're storing the token in sessionStorage
    // Optionally, remove cookies here if applicable

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <UserContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

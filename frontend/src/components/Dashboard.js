import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Contacts from "./Contacts";
import ContactForm from "./ContactForm";



function Dashboard() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const { data } = await API.get("/contacts");
      setContacts(data);
    } catch (err) {
      alert("Failed to fetch contacts.");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage to log out the user
    localStorage.removeItem("token");

    // Navigate to the login page after logout
    navigate("/"); // Redirect to the login page
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>
      <ContactForm refreshContacts={fetchContacts} />
      <Contacts contacts={contacts} refreshContacts={fetchContacts} />
    </div>
  );
}

export default Dashboard;

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
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>

      <div style={{ margin: "20px 0" }}>
        <ContactForm refreshContacts={fetchContacts} />
      </div>

      <div>
        <h3>Contacts</h3>
        <table
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "80%",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Email
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {contact.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {contact.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {contact.mobile}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleLogout}
        style={{ marginBottom: "20px", marginTop: "10px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;

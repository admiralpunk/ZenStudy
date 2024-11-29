import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ContactForm from "./ContactForm";

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null); // Track the contact being edited

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

  const handleDelete = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      fetchContacts(); // Refresh the contacts list after deletion
    } catch (err) {
      alert("Failed to delete contact.");
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact); // Set the contact for editing
  };

  const cancelEdit = () => {
    setEditingContact(null); // Cancel editing mode
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>

      <div style={{ margin: "20px 0" }}>
        <ContactForm
          editingContact={editingContact}
          refreshContacts={fetchContacts}
          cancelEdit={cancelEdit}
        />
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
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                {/* Conditionally render either the contact's details or input fields */}
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {editingContact && editingContact._id === contact._id ? (
                    <input
                      type="text"
                      value={editingContact.name}
                      onChange={(e) =>
                        setEditingContact({
                          ...editingContact,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    contact.name
                  )}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {editingContact && editingContact._id === contact._id ? (
                    <input
                      type="email"
                      value={editingContact.email}
                      onChange={(e) =>
                        setEditingContact({
                          ...editingContact,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    contact.email
                  )}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {editingContact && editingContact._id === contact._id ? (
                    <input
                      type="text"
                      value={editingContact.mobile}
                      onChange={(e) =>
                        setEditingContact({
                          ...editingContact,
                          mobile: e.target.value,
                        })
                      }
                    />
                  ) : (
                    contact.mobile
                  )}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {editingContact && editingContact._id === contact._id ? (
                    <button
                      onClick={async () => {
                        // Update the contact if in editing mode
                        try {
                          await API.put(
                            `/contacts/${editingContact._id}`,
                            editingContact
                          );
                          fetchContacts();
                          cancelEdit();
                        } catch (err) {
                          alert("Failed to update contact.");
                        }
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(contact)}>Edit</button>
                  )}
                  <button
                    onClick={() => handleDelete(contact._id)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "red",
                      color: "white",
                    }}
                  >
                    Delete
                  </button>
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

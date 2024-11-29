import React from "react";
import API from "../api";

function Contacts({ contacts, refreshContacts }) {
  const deleteContact = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      refreshContacts();
    } catch (err) {
      alert("Failed to delete contact.");
    }
  };

  return (
    <div>
      <h3>Contacts</h3>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.mobile}
            <button onClick={() => deleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;

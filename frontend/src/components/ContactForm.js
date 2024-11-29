import React, { useState } from "react";
import API from "../api";

function ContactForm({ refreshContacts }) {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/contacts", formData);
      refreshContacts();
      setFormData({ name: "", email: "", mobile: "" });
    } catch (err) {
      alert("Failed to add contact.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Contact</h3>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        value={formData.name}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        value={formData.email}
      />
      <input
        type="text"
        placeholder="Mobile"
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        value={formData.mobile}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default ContactForm;

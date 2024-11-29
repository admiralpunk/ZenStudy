const express = require("express");
const Contact = require("../models/Contact");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

// Add a contact
router.post("/", verifyToken, async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    const contact = await Contact.create({ ...req.body, userId: req.user.id });
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all contacts for a user
router.get("/", verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a contact
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a contact
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

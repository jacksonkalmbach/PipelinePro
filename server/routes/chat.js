const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all messages from a conversation
router.get("/conversation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allMessages = await pool.query(
      "SELECT * FROM messages WHERE conversation_id = $1",
      [id]
    );
    res.json(allMessages.rows);
  } catch (err) {
    console.error(
      `Error getting all messages for conversation, ${err.message}`
    );
  }
});

// Get all conversations for a user
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allConversations = await pool.query(
      "SELECT * FROM conversations WHERE user_1 = $1 OR user_2 = $1",
      [id]
    );
    res.json(allConversations.rows);
  } catch (err) {
    console.error(`Error getting all conversations for user, ${err.message}`);
  }
});

// Create a new conversation
router.post("/conversations", async (req, res) => {
  try {
    const { sender, recipient } = req.body;
    const newConversation = await pool.query(
      "INSERT INTO conversations (user_1, user_2) VALUES ($1, $2) RETURNING *",
      [sender, recipient]
    );
    res.json(newConversation.rows[0]);
  } catch (err) {
    console.error(`Error creating new conversation, ${err.message}`);
  }
});

// Create a new message
router.post("/messages", async (req, res) => {
  try {
    const { conversation_id, sender, recipient, message_body } = req.body;
    const newMessage = await pool.query(
      "INSERT INTO messages (conversation_id, sender, recipient, message_body) VALUES ($1, $2, $3, $4) RETURNING *",
      [conversation_id, sender, recipient, message_body]
    );
    res.json(newMessage.rows[0]);
  } catch (err) {
    console.error(`Error creating new message, ${err.message}`);
  }
});

module.exports = router;

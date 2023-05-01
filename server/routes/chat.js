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

module.exports = router;

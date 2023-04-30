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

module.exports = router;

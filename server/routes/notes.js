const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create a note
router.post("/notes", async (req, res) => {
  try {
    const { note, lead_id } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes (note, lead_id) VALUES($1, $2) RETURNING *",
      [note, lead_id]
    );

    res.json(newNote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all notes for a lead
router.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allNotes = await pool.query(
      "SELECT * FROM notes WHERE lead_id = $1",
      [id]
    );
    res.json(allNotes.rows);
  } catch (err) {
    console.error(`Error getting all notes for lead, ${err.message}`);
  }
});

// Update a note
router.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { note, lead_id } = req.body;
    const updateNote = await pool.query(
      "UPDATE notes SET note = $1, lead_id = $2 WHERE note_id = $3",
      [note, lead_id, id]
    );

    res.json("Note was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a note
router.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await pool.query(
      "DELETE FROM notes WHERE note_id = $1",
      [id]
    );
    res.json("Note was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

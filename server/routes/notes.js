const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create a note
router.post("/", async (req, res) => {
  try {
    const { noteAuthor, leadId, noteTitle, noteBody, createdAt } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes (note_title, note_body, lead_id, created_at, created_by) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [noteTitle, noteBody, leadId, createdAt, createdBy]
    );

    res.json(newNote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all notes
router.get("/", async (req, res) => {
  try {
    const allNotes = await pool.query("SELECT * FROM notes");
    res.json(allNotes.rows);
  } catch (err) {
    console.error(`Error getting all notes, ${err.message}`);
  }
});

// Get all notes for a lead
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create an event
router.post("/", async (req, res) => {
  try {
    const { eventName, eventDate, eventTime, eventDescription, eventOwner } =
      req.body;
    const newEvent = await pool.query(
      "INSERT INTO events (event_name, event_date, event_time, event_description, event_owner) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [eventName, eventDate, eventTime, eventDescription, eventOwner]
    );

    res.json(newEvent.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const allEvents = await pool.query("SELECT * FROM events");
    res.json(allEvents.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all events for a specific day and user
router.get("/:date/:owner", async (req, res) => {
  try {
    const { date, owner } = req.params;
    const allEvents = await pool.query(
      "SELECT * FROM events WHERE event_date = $1 AND event_owner = $2 ORDER BY event_time ASC",
      [date, owner]
    );
    res.json(allEvents.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEvent = await pool.query("DELETE FROM events WHERE id = $1", [
      id,
    ]);
    res.json("Event was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

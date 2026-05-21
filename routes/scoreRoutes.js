const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/", (req, res) => {
  const { category } = req.query;

  let sql = "SELECT * FROM scores";
  const params = [];

  if (category) {
    sql += " WHERE category = ?";
    params.push(category);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    res.status(200).json(rows);
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  db.get("SELECT * FROM scores WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: "Score not found" });
    }

    res.status(200).json(row);
  });
});

router.post("/", (req, res) => {
  const { playerName, gameTitle, score, category, platform } = req.body;

  if (!playerName || !gameTitle || score === undefined || !category || !platform) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (typeof score !== "number") {
    return res.status(400).json({ message: "Score must be a number" });
  }

  const sql = `
    INSERT INTO scores (playerName, gameTitle, score, category, platform)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [playerName, gameTitle, score, category, platform], function (err) {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    res.status(201).json({
      message: "Score created",
      id: this.lastID,
      score: {
        id: this.lastID,
        playerName,
        gameTitle,
        score,
        category,
        platform
      }
    });
  });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { playerName, gameTitle, score, category, platform } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  if (!playerName || !gameTitle || score === undefined || !category || !platform) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (typeof score !== "number") {
    return res.status(400).json({ message: "Score must be a number" });
  }

  db.get("SELECT * FROM scores WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: "Score not found" });
    }

    const sql = `
      UPDATE scores
      SET playerName = ?, gameTitle = ?, score = ?, category = ?, platform = ?
      WHERE id = ?
    `;

    db.run(sql, [playerName, gameTitle, score, category, platform, id], function (err) {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err.message });
      }

      res.status(200).json({
        message: "Score updated",
        id,
        score: {
          id,
          playerName,
          gameTitle,
          score,
          category,
          platform
        }
      });
    });
  });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  db.get("SELECT * FROM scores WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: "Score not found" });
    }

    db.run("DELETE FROM scores WHERE id = ?", [id], function (err) {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err.message });
      }

      res.status(200).json({ message: "Score deleted", deletedId: id });
    });
  });
});

module.exports = router;
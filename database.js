const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/scores.db", (err) => {
  if (err) {
    console.error("Could not connect to database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      playerName TEXT NOT NULL,
      gameTitle TEXT NOT NULL,
      score INTEGER NOT NULL,
      category TEXT NOT NULL,
      platform TEXT NOT NULL
    )
  `);
});

module.exports = db;
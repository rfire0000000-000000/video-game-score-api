const express = require("express");
const scoreRoutes = require("./routes/scoreRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/scores", scoreRoutes);

app.get("/", (req, res) => {
  res.send("Video Game Score API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
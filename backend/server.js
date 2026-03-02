const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jobRoutes = require("./routes/routes");
const profileRoutes = require("./routes/profile");
const profileupload = require("./routes/profileupload");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/profileupload", profileupload);

app.get("/", (req, res) => {
  res.send("Job Application Tracker API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
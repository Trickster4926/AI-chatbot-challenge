require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const chatRoute = require("./routes/chat");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use("/api/chat", chatRoute);

const PORT = process.env.PORT
app.listen(PORT , () => {
  console.log("Backend running on http://localhost:" + PORT);
});
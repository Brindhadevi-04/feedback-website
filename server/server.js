

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/feedback";

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  q5: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// POST - Save Feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    console.log("New feedback received:", feedback);

    res.status(201).json({
      message: "Feedback submitted successfully!",
      data: feedback,
    });
  } catch (error) {
    console.log("Error saving feedback:", error);
    res.status(500).json({
      message: "Failed to submit feedback",
    });
  }
});

// GET - Display All Feedback
app.get("/api/getfeedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.log("Error fetching feedback:", error);
    res.status(500).json({
      message: "Failed to fetch feedback",
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  });

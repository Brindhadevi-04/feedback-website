
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/feedback")
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

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

    console.log("\n========== NEW FEEDBACK ==========");
    console.log("Name:", feedback.q1);
    console.log("Department:", feedback.q2);
    console.log("Session Title:", feedback.q3);
    console.log("Feedback:", feedback.q4);
    console.log("Suggestions:", feedback.q5);
    console.log("==================================\n");

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
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

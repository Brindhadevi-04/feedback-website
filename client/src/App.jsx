
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Feedback:", feedback);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback",
        feedback
      );

      console.log("Backend Response:", response.data);

      alert("Feedback submitted successfully!");

      setFeedback({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
      });

    } catch (error) {
      console.error("Error submitting feedback:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Error Data:", error.response.data);
      } else {
        console.log("Connection Error:", error.message);
      }

      alert("Error submitting feedback!");
    }
  };

  return (
    <div className="container">
      <h1>Online Survey Application</h1>
      <h2>Feedback Form</h2>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="q1"
          value={feedback.q1}
          onChange={handleChange}
          required
        />

        <label>Department:</label>
        <input
          type="text"
          name="q2"
          value={feedback.q2}
          onChange={handleChange}
          required
        />

        <label>Session Title:</label>
        <input
          type="text"
          name="q3"
          value={feedback.q3}
          onChange={handleChange}
          required
        />

        <label>Feedback:</label>
        <textarea
          name="q4"
          value={feedback.q4}
          onChange={handleChange}
          required
        />

        <label>Suggestions:</label>
        <textarea
          name="q5"
          value={feedback.q5}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Submit Feedback
        </button>
      </form>

      <div className="feedback-link">
        <Link to="/getAllData">
          View All Feedback
        </Link>
      </div>
    </div>
  );
}

export default App;


import axios from "axios";
import { useEffect, useState } from "react";

function GetAllDAta() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getfeedback")
      .then((response) => {
        setFeedbacks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Feedback List</h2>

      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback._id}>
              <strong>Name:</strong> {feedback.q1}<br />
              <strong>Department:</strong> {feedback.q2}<br />
              <strong>Session Title:</strong> {feedback.q3}<br />
              <strong>Feedback:</strong> {feedback.q4}<br />
              <strong>Suggestions:</strong> {feedback.q5}<br />
              <strong>Submitted At:</strong>{" "}
              {new Date(feedback.submittedAt).toLocaleString()}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetAllDAta;

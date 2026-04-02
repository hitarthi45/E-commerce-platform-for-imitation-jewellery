import { useState } from "react";
import "../styles/feedback.css";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    setFeedbackList([...feedbackList, formData]);

    setFormData({
      name: "",
      message: "",
    });
  };

  return (
    <div className="page-container">
      <h2>Customer Feedback</h2>

      {/* FORM */}
      <div className="feedback-form">
        <h3>Give Your Feedback</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Feedback"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* FEEDBACK LIST */}
      <div className="feedback-list">
        <h3>Recent Feedback</h3>

        {feedbackList.length === 0 ? (
          <p>No feedback yet</p>
        ) : (
          feedbackList.map((item, index) => (
            <div key={index} className="feedback-card">
              <h4>{item.name}</h4>
              <p>{item.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feedback;
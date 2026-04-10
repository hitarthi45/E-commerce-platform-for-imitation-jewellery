import { useState, useEffect } from "react";
import "../styles/feedback.css";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/feedback")
      .then(res => res.json())
      .then(data => setFeedbackList(data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      // ✅ MAP FRONTEND → BACKEND FORMAT
      const payload = {
        product_id: "64f000000000000000000001", // dummy ObjectId (required)
        rating: 5, // default rating
        comment: `${formData.name}: ${formData.message}`,
      };

      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // ✅ SHOW IN UI
      setFeedbackList([...feedbackList, data]);

      setFormData({ name: "", message: "" });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">

        <div className="feedback-left">
          <h4> IMITATION JEWELLERY</h4>
          <h1>Crafted with care,<br /> worn with pride.</h1>
          <p>Share your experience and help us improve our jewellery production and service.</p>
        </div>

        <div className="feedback-right">
          <p className="welcome">FEEDBACK FORM</p>
          <h2>Share Your Experience</h2>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Feedback</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />

            <button type="submit">Submit Feedback →</button>
          </form>

          <div className="feedback-list">
            {feedbackList.map((item, index) => (
              <div key={index}>
                <p>{item.comment}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Feedback;
import React, { useState } from 'react';
import './LodgeComplaints.css';

function LodgeComplaints() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    complaint: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic
    console.log(formData);
  };

  return (
    <div className="LodgeComplaints">
      <h1>Lodge a Complaint</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="complaint">Complaint</label>
        <textarea
          id="complaint"
          name="complaint"
          value={formData.complaint}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LodgeComplaints;

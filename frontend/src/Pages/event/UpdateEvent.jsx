import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const UpdateEvent = () => {

  const navigate=useNavigate()
  const { eventId } = useParams();
  const [auth, setAuth] = useAuth();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    capacity: "",
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/event/get/${eventId}`
        );
        const eventDataFromServer = response.data;

        const formattedDate = new Date(eventDataFromServer.date)
          .toISOString()
          .split("T")[0];

        setEventData({
          ...eventDataFromServer,
          date: formattedDate,
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/event/update/${eventId}`,
        eventData,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      console.log("Event updated:", response.data);
      navigate('/')
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Update Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={eventData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            className="form-control"
            value={eventData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={eventData.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={eventData.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <select
            name="category"
            className="form-select"
            value={eventData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Capacity:</label>
          <input
            type="number"
            name="capacity"
            className="form-control"
            value={eventData.capacity}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;

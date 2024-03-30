import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const YourUpcomingEvents = () => {
  const [auth, setAuth] = useAuth();
  const [events, setEvents] = useState([]);

  const upcomingEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/event/your-events`,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      console.log(response.data.events);
      setEvents(response.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    upcomingEvents();
  }, []);

  const upcomingEventsCount = events.length;

  return (
    <div className="container mt-5">
      <h1>Your Upcoming Events</h1>
      <p>Upcoming Events Count: {upcomingEventsCount}</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{event.location}</td>
              <td style={{ color: "red" }}>
                {new Date(event.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourUpcomingEvents;

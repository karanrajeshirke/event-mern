import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const YourCreatedEvents = () => {
  const [auth, setAuth] = useAuth();
  const [events, setEvents] = useState([]);

  const getCreatorEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/event/get", {
        headers: {
          Authorization: auth.token,
        },
      });
      console.log(response.data);
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCreatorEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8080/api/event/delete/${eventId}`, {
        headers: {
          Authorization: auth.token,
        },
      });
      alert("deleted ");
      getCreatorEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Created Events</h1>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <p className="card-text">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="card-text">Location: {event.location}</p>
                <p className="card-text">Category: {event.category}</p>
                <p className="card-text">Capacity: {event.capacity}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>

                <br />

                <Link to={`/dashboard/registered/${event._id}`}>
                  <button className="btn btn-dark mt-3">
                    Check Regiserations
                  </button>
                </Link>

                <Link to={`/dashboard/update/${event._id}`}>
                  <button
                    className="btn btn-dark mt-3"
                    style={{ marginLeft: "2px" }}
                  >
                    Update Event
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourCreatedEvents;

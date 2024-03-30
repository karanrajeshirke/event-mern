import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const CreateEvent = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    capacity: 0,
  });

  function handleInput(event) {
    setEventData((prevEvent) => ({
      ...prevEvent,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(eventData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/event/create",
        eventData,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      console.log(response.data);
      alert("Event created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Create Event</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    name="title"
                    onChange={handleInput}
                    value={eventData.title}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    onChange={handleInput}
                    value={eventData.description}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    onChange={handleInput}
                    value={eventData.date}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    name="location"
                    onChange={handleInput}
                    value={eventData.location}
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-control"
                    name="category"
                    onChange={handleInput}
                    value={eventData.category}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Capacity"
                    name="capacity"
                    onChange={handleInput}
                    value={eventData.capacity}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;

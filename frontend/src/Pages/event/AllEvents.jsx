import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { Checkbox } from "antd";
import { Space } from "antd";
const AllEvents = () => {
  const [auth, setAuth] = useAuth();
  const [events, setEvents] = useState([]);

  const getAllEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/event/get-all"
      );

      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const isUserRegistered = (event) => {
    return event.registrations.includes(auth.user.id);
  };

  const handleRegister = async (eventId) => {
    try {
      await axios.get(`http://localhost:8080/api/event/register/${eventId}`, {
        headers: {
          Authorization: auth.token,
        },
      });

      alert("registeration done");
    } catch (error) {
      console.log(error);
    }

    getAllEvents();
  };

  const [checkedList, setCheckedList] = useState([]);

  const onChange = (checkedValues) => {
    console.log(checkedValues);
    setCheckedList(checkedValues);
  };

  useEffect(() => {

    if(checkedList.length)
    {
      filterProduct()
    }
    
    
  }, [checkedList]);


  const filterProduct=async()=>
  {
    const response=await axios.post('http://localhost:8080/api/event/filter',{checkedList});

    setEvents(response.data);
  }

  const options = [
    { label: "conference", value: "conference" },
    { label: "workshop", value: "workshop" },
    { label: "seminar", value: "seminar" },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Filters</h5>

              <Checkbox.Group
                options={options}
                value={checkedList}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h1 className="text-center mb-4">All Events</h1>
          <div className="row">
            {events.map((event) => (
              <div className="col-md-6 mb-4" key={event._id}>
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
                    <p className="card-text">Creator: {event.creator.name}</p>
                    {!auth.user ? (
                      <p className="text-danger">Login to register</p>
                    ) : (
                      !isUserRegistered(event) && (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleRegister(event._id)}
                        >
                          Register
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;

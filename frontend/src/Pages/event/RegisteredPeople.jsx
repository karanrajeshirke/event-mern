import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const RegisteredPeople = () => {
  const [auth, setAuth] = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const { eventId } = useParams();

  const handleViewRegistrations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/event/registered/${eventId}`,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setRegistrations(response.data.registerations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleViewRegistrations();
  }, []);

  const registeredCount = registrations.length;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Registered People</h1>
      <div className="mb-3">Total Registered People: {registeredCount}</div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredPeople;

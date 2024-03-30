import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    phone: "",
    address: "",
    role: "",
  });

  function handleInput(event) {
    const { name, value, files } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: files ? files[0] : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let response = await axios.post(
        "http://localhost:8080/api/auth/register",
        user
      );
      console.log(response.data);
      alert("Registered");
      navigate("/login");
    } catch (error) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      }
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Register</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    onChange={handleInput}
                    value={user.name}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                    value={user.email}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                    value={user.password}
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <span>
                  Already have an account? <Link to="/login">Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

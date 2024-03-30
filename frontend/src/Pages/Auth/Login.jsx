import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleInput(event) {
    setUser((prevUser) => {
      return {
        ...prevUser,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let response = await axios.post(
        "http://localhost:8080/api/auth/login",
        user
      );

      setAuth((prevAuth) => {
        return {
          ...prevAuth,
          user: response.data.user,
          token: response.data.token,
        };
      });

      localStorage.setItem("auth", JSON.stringify(response.data));

      alert("Logged In");
      navigate("/");
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
              <h5 className="card-title text-center">Login</h5>
              <form onSubmit={handleSubmit}>
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
                    Login
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <span>
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth";

function Navbar() {
  const [auth, setAuth] = useAuth();
  function handleLogout() {
    setAuth((prevAuth) => {
      return {
        ...prevAuth,
        user: "",
        token: "",
      };
    });
    localStorage.removeItem("auth");
    alert("Logged Out");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!auth.user && (
              <li className="nav-item m-2">
                {" "}
                <NavLink to="/login">Login</NavLink>{" "}
              </li>
            )}
            {!auth.user && (
              <li className="nav-item m-2">
                <NavLink to="/register">Register</NavLink>
              </li>
            )}

            <li className="nav-item m-2">
              <NavLink to="dashboard/create">Create Event</NavLink>
            </li>
            <li className="nav-item m-2">
              <NavLink to="/">All Events</NavLink>
            </li>
            <li className="nav-item m-2">
              <NavLink to="dashboard/creator-events">
                Your Created Events
              </NavLink>
            </li>
            <li className="nav-item m-2">
              <NavLink to="dashboard/upcoming">Your Upcoming Events</NavLink>
            </li>
            {auth.user && (
              <li className="nav-item m-2">
                <NavLink to="/login" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
            )}

            <li className="nav-item m-2" style={{ color: "green" }}>
              {auth?.user?.email}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

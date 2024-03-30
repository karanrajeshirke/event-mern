import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Navbar from "./components/Navbar";
import { AdminRoute } from "./Pages/event/AdminRoute";
import CreateEvent from "./Pages/event/CreateEvent";
import AllEvents from "./Pages/event/AllEvents";
import YourCreatedEvents from "./Pages/event/YourCreatedEvents";
import RegisteredPeople from "./Pages/event/RegisteredPeople";
import UpdateEvent from "./Pages/event/UpdateEvent";
import YourUpcomingEvents from "./Pages/event/YourUpcomingEvents";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<AllEvents />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<AdminRoute />}>
              <Route path="create" element={<CreateEvent />} />
              <Route path="creator-events" element={<YourCreatedEvents />} />
              <Route
                path="registered/:eventId"
                element={<RegisteredPeople />}
              />
              <Route path="update/:eventId" element={<UpdateEvent />} />
              <Route path="upcoming" element={<YourUpcomingEvents />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

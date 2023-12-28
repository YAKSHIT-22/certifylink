import { Routes, Route } from "react-router-dom";
import Landing from "./landingPage/Landing";
import Error from "./Error";
import Login from "./DashboardPage/Login";
import Home from "./DashboardPage/Home";
import Organisations from "./DashboardPage/Organisations";
import Events from "./DashboardPage/Events";
import Templates from "./DashboardPage/Templates";
import Certificates from "./DashboardPage/Certificates";
import Profile from "./DashboardPage/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard/home" element={<Home/>} />
      <Route path="/dashboard/organisations" element={<Organisations/>} />
      <Route path="/dashboard/events" element={<Events/>} />
      <Route path="/dashboard/templates" element={<Templates/>} />
      <Route path="/dashboard/certificates" element={<Certificates/>} />
      <Route path="/dashboard/profile" element={<Profile/>} />
      <Route path="*" element={<Error/>} />
    </Routes>
  );
}

export default App;

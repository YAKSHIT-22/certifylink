import React from "react";
import {useLocation,useNavigate} from 'react-router-dom'
const DashboardNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full p-2">
      <nav className="flex items-center justify-center w-full p-2">
        <div className="flex items-center w-full justify-between p-2">
          <div className="flex text-white">
            <p className="font-bold uppercase">{location.pathname.split("/")[2]}</p>
          </div>
          <button className="flex" onClick={()=>navigate("/dashboard/profile")}>
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsfGVufDB8fDB8fHww"
              alt="avatar"
              className="flex w-8 h-8 object-cover rounded-full"
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNav;

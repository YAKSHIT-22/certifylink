import React, { useEffect } from "react";
import DashboardHeader from "../pagesComponents/dashboardPage/DashboardHeader";
import DashboardNav from "../pagesComponents/dashboardPage/DashboardNav";
import { useAuthStore } from "../../store/masterStore";
import { useNavigate } from "react-router";
import { publicApi } from "../../utils/app.utils";

const DashboardContainer = ({ children }) => {
  const { user, setUser, clearUser, clearToken, token } = useAuthStore(state => state)
  const navigate = useNavigate();
  const checkAuth = async () => {
    publicApi.get("/api/v1/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.data) {
        setUser(res.data);
      }
    }).catch((err) => {
      clearUser();
      return navigate("/login");
    })
  }
  useEffect(() => {
    checkAuth();
    if (!user) {
      return navigate("/login");
    }
  }, [clearUser])
  return (
    <main className="flex items-start justify-start h-screen w-screen overflow-hidden">
      <div className="flex items-center justify-center w-full max-w-screen-2xl mx-auto min-h-[100dvh] md:py-0 pb-[8rem]">
        <div className="flex items-start justify-start w-full min-h-[100dvh] md:flex-row flex-col-reverse">
          <div className="flex items-center justify-center w-full h-full md:w-[15%] lg:w-[25%] xl:w-[15%]">
            <DashboardHeader clearUser={clearUser} clearToken={clearToken} token={token} />
          </div>
          <div className="flex items-start justify-start w-full min-h-[100dvh] md:w-[85%] lg:w-[75%] xl:w-[85%] flex-col">
            <DashboardNav img={user?.img} />
            <div className="flex items-center justify-center w-full h-full p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContainer;

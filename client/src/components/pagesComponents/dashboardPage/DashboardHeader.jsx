import React from "react";
import logo from "../../../assets/logo.svg";
import { IoHomeOutline } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { GoProjectTemplate } from "react-icons/go";
import { GrCertificate } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import DashboardLinks from "../../minorComponents/DashboardLinks";
import toast from "react-hot-toast";
import { publicApi } from "../../../utils/app.utils";
import { useNavigate } from "react-router";

const DashboardHeader = ({ clearUser = () => { } }) => {
  const router = useNavigate();
  return (
    <header className="md:static fixed bottom-0 flex items-start justify-start w-full md:min-h-[100dvh] md:h-full bg-[#191919] z-10 border-r border-[#252525]">
      <nav className="flex items-center justify-center w-full h-full md:min-h-[100dvh]">
        <div className="flex items-center justify-center w-full h-full md:min-h-[100dvh]">
          <div className="flex items-center justify-center w-full md:min-h-[100dvh] flex-col gap-4 p-2">
            <div className="items-center md:flex hidden justify-center w-full h-full">
              <img src={logo} alt="" className="flex w-24 h-24 object-cover" />
            </div>
            <div className="flex items-start justify-start w-full flex-row md:flex-col gap-3 p-4 h-full flex-1">
              <DashboardLinks
                text={"Home"}
                icon={<IoHomeOutline className="w-6 h-6" />}
                link={"/dashboard/home"}
              />
              <DashboardLinks
                text={"Organisations"}
                icon={<GoOrganization className="w-6 h-6" />}
                link={"/dashboard/organisations"}
              />
              <DashboardLinks
                text={"Events"}
                icon={<MdOutlineEmojiEvents className="w-6 h-6" />}
                link={"/dashboard/events"}
              />
              <DashboardLinks
                text={"Certificates"}
                icon={<GrCertificate className="w-6 h-6" />}
                link={"/dashboard/certificates"}
              />
              <DashboardLinks
                text={"Templates"}
                icon={<GoProjectTemplate className="w-6 h-6" />}
                link={"/dashboard/templates"}
              />
            </div>
            <div className="flex items-center justify-center w-full">
              <button onClick={async () => {
                await publicApi.get("/api/v1/user/signout");
                clearUser();
                router("/login");
                toast.success("Logged out!");
              }} className="text-lg font-semibold flex items-center justify-center gap-2 text-red-600">
                <span className="lg:flex hidden">Logout</span>
                <IoMdLogOut className="-rotate-90 w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;

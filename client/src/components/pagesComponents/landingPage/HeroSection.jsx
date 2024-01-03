import React from "react";
import video from "../../../assets/video.mp4";
import video1 from "../../../assets/video.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/masterStore";

const HeroSection = () => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user)
  return (
    <section className="w-full min-h-[100dvh] flex items-center justify-center relative">
      <div className="absolute w-screen min-h-screen h-full flex items-center justify-center scale-x-[-1] will-change-transform translate-x-0 translate-y-0 translate-z-0">
        <video
          src={video}
          alt="video"
          className="w-full h-full object-cover aspect-video"
          muted
          loop
          autoPlay
          playsInline
          placeholder={video1}
          controls=""
        />
      </div>
      <div className="max-w-screen-2xl mx-auto w-full min-h-screen h-full flex items-center justify-center p-2 s:p-6">
        <div className="w-screen min-h-screen h-full flex items-center justify-center bg-black/10 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-10">
          <div className="flex items-center justify-center w-full h-full p-4">
            <div className="flex items-center justify-center w-full flex-col p-4 max-w-6xl gap-4">
              <div className="flex items-center justify-center s:p-2">
                <h1 className="text-4xl sm:text-6xl xl:text-8xl font-bold text-white text-center">
                  Welcome to <span className="text-[#FFC947]">CertifyLink</span>
                </h1>
              </div>
              <div className="flex items-center justify-center s:p-2 max-w-4xl">
                <p className="text-lg sm:text-xl xl:text-2xl font-light text-white text-center">
                  CertifyLink is a state-of-the-art platform for securely
                  managing, validating, and distributing certificates, covering
                  educational, professional, and training accomplishments.
                </p>
              </div>
              <div className="flex items-center justify-center p-2">
                <button
                  onClick={() => {
                    if (user) {
                      navigate("/dashboard/home");
                    } else {
                      navigate("/login");
                    }
                  }}
                  className="px-6 sm:px-12 py-3 rounded-full bg-white hover:bg-transparent hover:border: border-white border border-transparent text-[#181818] hover:text-white transition-all"
                >
                  <p className="text-sm sm:text-base font-medium">
                    Get Started
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

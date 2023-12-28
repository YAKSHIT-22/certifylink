import React from "react";
import video from "../assets/video1.mp4";
import video1 from "../assets/video1.webp";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-[100dvh] flex items-center justify-center relative">
      <div className="absolute w-screen min-h-screen h-full scale-x-[-1] will-change-transform translate-x-0 translate-y-0 translate-z-0">
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
      <div className="max-w-screen-2xl mx-auto w-full min-h-screen h-full z-[1] flex items-center justify-center p-6">
        <div className="flex items-center justify-center w-full h-full py-8 px-4 xs:px-8 s:px-12 md:px-16">
          <div className="flex items-center justify-center w-full pt-24 h-full">
            <div className="flex items-center justify-center w-full pt-6 xs:pt-8 s:pt-12 md:pt-16 lg:pt-24 xl:pt-32 h-full flex-col gap-6">
              <div className="flex items-start w-full justify-end flex-col flex-1 ">
                <h1 className="text-4xl xs:text-5xl s:text-6xl text-white xl:text-7xl font-bold">
                  Oop's 404
                  <br /> I guess you are lost!
                </h1>
              </div>
              <div className="flex items-end w-full justify-start">
                <div className="w-[90%] md:w-[50%] flex items-end justify-start">
                  {" "}
                  <p className="text-[#9c9c9c] text-sm xs:text-base s:text-lg sm:text-xl">
                    It appears that the requested resource is either temporarily
                    unavailable, has been moved, or no longer exists. Please
                    check the URL for any typos or try navigating back to the
                    homepage.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center rounded-full">
                  <button
                    onClick={() => navigate("/")}
                    className="bg-[#f9f9f9] text-black px-8 py-2 w-full h-full rounded-full font-medium flex items-center justify-center"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;

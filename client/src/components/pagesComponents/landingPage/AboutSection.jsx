import React from "react";
import about from "../../../assets/about.mp4";
import about1 from "../../../assets/about.png";

const AboutSection = () => {
  return (
    <section className="flex items-center justify-center min-h-[100dvh] w-full p-2">
      <div className="max-w-screen-2xl mx-auto w-full flex items-center justify-center p-2 s:p-6">
        <div className="flex items-center justify-center w-full p-2">
          <div className="flex items-center justify-center lg:flex-row flex-col gap-8">
            <div className="flex items-center justify-center w-full">
              <video
                src={about}
                alt="video"
                className="w-[75%] h-[75%] object-cover aspect-square bg-blend-screen"
                muted
                loop
                autoPlay
                playsInline
                placeholder={about1}
                controls=""
              />
            </div>
            <div className="flex items-start p-2 justify-center w-full flex-col h-full gap-4">
                <div className="flex items-center justify-center gap-1">
                    <div className="h-4 w-4 bg-purple-800 rounded-full"></div>
                    <div className="h-4 w-4 bg-[#ffffff] rounded-full"></div>
                </div>
              <div className="flex items-start justify-center flex-col">
                <h1 className="text-3xl sm:text-5xl xl:text-6xl text-white font-bold">Generate Certificates <br/>In Zero Time.</h1>
              </div>
              <div className="flex w-[85%] lg:w-[75%] items-start justify-center flex-col font-light py-2 text-[#cbcbcb] gap-2">
                <p className="text-base">
                  Welcome to CertifyLink, the premier platform revolutionizing
                  the management, validation, and distribution of certificates.
                  Our cutting-edge technology ensures a secure and efficient
                  process for handling a spectrum of achievements, be it in
                  education, profession, or training.
                </p>
                <p className="text-base">
                Whether you're an educational institution, a professional organization, or an individual, our platform provides a seamless solution for maintaining the integrity of certificates while streamlining the validation and distribution process. Join us on the forefront of certificate management and experience the convenience of CertifyLink.
                </p>
              </div>
              <div className="flex items-center justify-start w-full">
              <button className="px-6 sm:px-12 py-3 rounded-full bg-white hover:bg-transparent hover:border: border-white border border-transparent text-[#181818] hover:text-white transition-all">
                <p className="text-sm sm:text-base font-medium">Learn More</p>
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

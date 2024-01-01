import React, { useState } from "react";
import contact from "../../../assets/contact.mp4";
import contact1 from "../../../assets/contact.png";

const ContactSection = () => {
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <section className="flex items-center justify-center min-h-[100dvh] w-full p-2">
      <div className="max-w-screen-2xl mx-auto w-full flex items-center justify-center p-2 s:p-6">
        <div className="flex items-center justify-center w-full p-2">
          <div className="flex items-center justify-center lg:flex-row flex-col-reverse">
            <div className="flex items-start lg:pl-28 p-2 justify-center w-full flex-col h-full gap-3">
              <div className="flex items-center justify-center gap-1">
                <div className="h-4 w-4 bg-purple-800 rounded-full"></div>
                <div className="h-4 w-4 bg-[#ffffff] rounded-full"></div>
              </div>
              <div className="flex w-full items-start justify-center flex-col">
                <h1 className="text-3xl sm:text-5xl xl:text-6xl text-white font-bold">
                  Contact Us <br />
                  Any Query Let's Connect!
                </h1>
              </div>
              <form onSubmit={handleSubmit} id="contact" className="flex w-full md:w-[90%] items-start justify-center flex-col font-light py-2 text-[#f4f4f4] gap-2">
                <div className="flex w-full items-start justify-center flex-col gap-2">
                  <label className="text-sm">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name || ""}
                    onChange={handleChange}
                    placeholder="What do we call you!"
                    className="rounded-md border border-[#252525] bg-transparent text-[#cbcbcb] w-full focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent py-4 px-4 transition-all"
                  />
                </div>
                <div className="flex w-full items-start justify-center flex-col gap-2">
                  <label className="text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email || ""}
                    onChange={handleChange}
                    placeholder="Where can we reach you!"
                    className="rounded-md border border-[#252525] bg-transparent text-[#cbcbcb] w-full focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent py-4 px-4 transition-all"
                  />
                </div>
                <div className="flex w-full items-start justify-center flex-col gap-2">
                  <label className="text-sm">Message</label>
                  <textarea
                    type="text"
                    rows="3"
                    name="message"
                    id="message"
                    value={form.message || ""}
                    onChange={handleChange}
                    placeholder="What do you want to say!"
                    className="rounded-md border border-[#252525] bg-transparent text-[#cbcbcb] w-full focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent py-4 px-4 transition-all"
                  />
                </div>
              </form>
              <div className="flex items-center justify-start w-full">
                <button type="submit" form="contact"  className="px-12 sm:px-20 py-3 rounded-full bg-white hover:bg-transparent hover:border: border-white border border-transparent text-[#181818] hover:text-white transition-all">
                  <p className="text-sm sm:text-base font-medium">Submit</p>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <video
                src={contact}
                alt="video"
                className="w-[75%] h-[75%] object-cover aspect-square bg-blend-screen"
                muted
                loop
                autoPlay
                playsInline
                placeholder={contact1}
                controls=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

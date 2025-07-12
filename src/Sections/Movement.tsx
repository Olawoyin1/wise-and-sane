import React from "react";
import FancyLinkButton from "../components/Button";
import { Link } from "react-router-dom";

const Movement: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center flex-col py-12 px-4">
      {/* Fixed Brand */}
      <Link
        to="/"
        className="text-3xl md:text-6xl font-bold tracking-tight text-gray-800 fixed bottom-17"
      >
        <span className="block z-50">sosioloji</span>
      </Link>

      {/* VERTICAL LINE - Positioned */}
      <div className="hidden md:block  absolute top-20 bottom-20 left-1/2 transform -translate-x-1/2 w-px bg-black" />



      <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
        <div className="relative grid  grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* FORM SECTION – 1st on desktop, 2nd on mobile */}
          <div className="relative ml-9 md:ml-0 order-2 md:order-1  ">
            {/* Decorative Span below bottom-right, shifted left */}
            <span
              className="absolute border border-gray-700 rounded-[15px] opacity-50 z-[-1]     bottom-[-14px] right-4     w-full h-full"
            />

            {/* Rotated Header */}
            <h3 className="absolute left-[-84px] sm:left-[-100px] top-1/2 transform rotate-270 text-sm md:text-xl font-bold text-center writing-vertical text-[#1E1B1B] font-playfair">
              Get Insight
              <span className="text-blue-500 inline-block ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  width="14"
                  height="14"
                  fill="currentColor"
                >
                  <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                </svg>
              </span>
            </h3>

            {/* Main Tag Container */}
            <div
              className="relative w-full bg-[#FFF0D3] flex items-center justify-center rounded-[15px] shadow-md p-4  h-auto"
              id="tag-box"
            >
              <div className="flex flex-wrap space-x-3  justify-center items-center w-full">
                <form
                  className="subscribe-form mt-4"
                  data-members-form="subscribe"
                >
                  <h5 className="text-2xl md:text-4xl text-center mb-4 md:mb-7 font-bold">
                    Join The Movement
                  </h5>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="w-full px-7 py-3 pf text-gray-700 bg-white border border-gray-300 rounded-3xl text-sm outline-none focus:ring-0 focus:ring-pink-300 transition"
                      required
                      placeholder="Enter your name"
                      // value={formData.name}
                      // onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      className="w-full mt-2 sm:mt-4 sm:mb-3 px-7 py-3 pf text-gray-700 bg-white border border-gray-300 rounded-3xl text-sm outline-none focus:ring-0 focus:ring-pink-300 transition"
                      required
                      placeholder="Enter your email"
                      // value={formData.email}
                      // onChange={handleChange}
                    />

                    <FancyLinkButton
                      label="Submit"
                      textColor="black"
                      bgColor="#FEBDD0"
                      block
                      to="/"
                    />
                  </div>
                </form>
              </div>
            </div>

            
          </div>

          {/* TEXT SECTION – 2nd on desktop, 1st on mobile */}
          <div className="w-full  order-1 md:order-2">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Why join the Movement?
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Joining the movement means being part of something bigger than
              yourself — a community that values awareness, education, and
              activism. It's about using your voice to spark meaningful dialogue
              and ignite change.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              When you join, you're not just signing up. You're aligning with a
              cause that’s committed to empowering others, amplifying important
              voices, and contributing to the betterment of society.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movement;

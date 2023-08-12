import React from "react";
import "./index.css";

const Hero = (props) => {
  return (
    <section className="text-gray-600">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 py-24 md:flex-row">
        <div className="mb-40 flex flex-col items-center pt-6 text-center md:ml-24 md:w-1/2 md:items-start md:text-left lg:grow">
          <h1 className="mb-5 items-center text-5xl  text-gray-900 sm:text-6xl">
            SD are making AI Stunning Tesla Concept
          </h1>
          <p className="mb-4 text-lg text-gray-600 xl:w-3/4">
            ColorTesla is a free to use AI tool made with Stalbe
            Difussion,ReactJS and styled with Tailwind CSS
          </p>{" "}
          <div className="flex justify-center">
            <a
              className="mt-2 inline-flex items-center rounded-lg border bg-gray-900 px-5 py-3 font-medium text-white   transition duration-500 ease-in-out"
              href="https://github.com/r1/nine4-2/"
            >
              <span className="justify-center">Find out more</span>
            </a>
          </div>
        </div>
        <div className="mb-0 mr-48 sm:mr-0 sm:mb-28 md:pl-10 lg:mb-0 xl:mr-44">
          <img
            className="ml-24 w-80 md:ml-1"
            alt="iPhone-12"
            src="/images/color5-transformed.png"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl pt-20 text-center">
        <h1 className="mb-8 text-6xl font-semibold text-gray-900">
          No code, Hidden prompt,Semanticized Colors
        </h1>
        <h1 className="mb-8 text-center text-2xl font-semibold text-gray-600">
          Few configs,More Picutres, and a lot of ....
        </h1>
        <div className="container mx-auto flex flex-col items-center justify-center rounded-lg ">
          <img
            className="mb-10 w-3/4 rounded-lg border object-cover object-center shadow-md"
            alt="Placeholder"
            src="./images/Car_demo1.jpeg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

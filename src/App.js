import { useState } from "react";
import React from "react";
import Hero from "./Hero";
import SDForm from "./sdform";
import TslGallery from "./TslGallery";
import "./index.css";

function App() {
  const _pics = [];
  const [pics, SetPics] = useState(_pics);

  return (
    <div>
      <Hero />
      <SDForm SetPics={SetPics} />
      <div style={{ height: "60px" }}></div>
      <TslGallery pics={pics} />
      <section>
        <div style={{ marginTop: "20px", height: "50px" }}></div>
      </section>
    </div>
  );
}

export default App;

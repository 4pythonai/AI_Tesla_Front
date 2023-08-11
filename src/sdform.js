/* eslint-disable */
"use client";
import React from "react";
import { ChangeEvent, useState } from "react";
import ColorPicker from "./colorpicker";

const SDForm = (props) => {
  const [openModal, setOpenModal] = useState(undefined);
  const [state, setState] = useState({
    fullName: "",
    Model: "Model3",
    logoText: "",
    showCfg: { display: "none" },
  });

  const { fullName, Model, logoText, showCfg } = state;

  const onChangeLogo = (v) => {
    setState((prev) => ({ ...prev, [event.target.name]: v }));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setState((prev) => ({
      ...prev,
      Model: event.target.value,
    }));
  };

  const handleColorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event);
  };

  const onRequestSD = async () => {
    setState((prev) => ({
      ...prev,
      showCfg: { display: "block" },
    }));
    try {
      const SD_URL = "http://127.0.0.1:8000";
      const response = await fetch(SD_URL + "/txt2img");
      if (!response.ok) {
        throw new Error("Network response was not ok");
        alert("Network response was not ok");
      }
      const data = await response.json();
      console.log(data); // Print the JSON respons
      const pics = data.files.map((filename) => {
        return {
          original: SD_URL + `/images/${filename}`,
          thumbnail: SD_URL + `/images/${filename}`,
        };
      });
      // setState({ loading: "none" });
      console.log(pics); // Print the converted pics array
      props.SetPics(pics);
      console.log(fullName, Model);
    } catch (error) {
      console.error("Error:", error);

      setState((prev) => ({
        ...prev,
        showCfg: { display: "none" },
      }));
    }
  };
  return (
    <div className="flex items-start space-x-2">
      <select
        value={Model}
        onChange={handleOptionChange}
        name=""
        className="select select-bordered max-w-xs"
      >
        <option>Model3</option>
        <option>ModelS</option>
        <option>ModelY</option>
      </select>

      <div className="form-control max-w-xs">
        <input
          onChange={(event) => {
            onChangeLogo(event.target.value);
          }}
          name="logoText"
          value={logoText}
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered"
        />
      </div>

      <button className="btn" onClick={() => window.my_modal_4.showModal()}>
        open modal
      </button>
      <dialog id="my_modal_4" className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-7xl">
          <ColorPicker />
          <div className="modal-action">
            <button className="btn">X</button>
          </div>
        </form>
      </dialog>
      <button className="btn btn-active btn-neutral">Neutral</button>
    </div>
  );
};

export default SDForm;

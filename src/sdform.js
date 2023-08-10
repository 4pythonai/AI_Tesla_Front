/* eslint-disable */
"use client";
// import { Flex, Text, Button } from '@radix-ui/themes';
import { Button, Select } from "@radix-ui/themes";
// import * as Form from "@radix-ui/react-form";

import { ChangeEvent, useState } from "react";
import ColorPicker from "./colorpicker";
import colorData from "./colorData.json";

const SDForm = (props) => {
  console.log("SDFOM=>SetPics", props);
  const [openModal, setOpenModal] = useState(undefined);

  const [state, setState] = useState({
    fullName: "",
    Model: "Model3",
    logoText: "",
    showCfg: { display: "none" },
  });
  const { fullName, Model, logoText, showCfg } = state;
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    console.log(event.target.value);
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
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
      console.log(data); // Print the JSON response

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
    }

    setState((prev) => ({
      ...prev,
      showCfg: { display: "none" },
    }));
  };
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Select value={Model} onChange={handleOptionChange}>
        <option>Model3</option>
        <option>ModelS</option>
        <option>ModelY</option>
      </Select>
      <TextInput
        type="text"
        placeholder="Full name"
        name="fullName"
        value={fullName}
        onChange={onChange}
      />
      <TextInput
        type="text"
        placeholder="LogoText"
        name="logoText"
        value={logoText}
        onChange={onChange}
      />

      <Button onClick={() => setOpenModal("default")}>选择颜色</Button>
      <Modal
        style={{ zIndex: 10001 }}
        size="7xl"
        show={openModal === "default"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <ColorPicker colorSeries={colorData} onSelect={handleColorSelect} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(undefined)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <Button size="lg" color="dark" onClick={onRequestSD}>
        <Spinner
          style={showCfg}
          aria-label="Alternate spinner button example"
        />
        <span className="pl-3">点击生成</span>
      </Button>
    </div>
  );
};
export default SDForm;

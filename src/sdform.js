/* eslint-disable */
"use client";
import React from "react";
import { ChangeEvent, useState } from "react";
import ColorPicker from "./colorpicker";
import colorData from "./colorData.json";

// const SDForm = (props) => {
//   console.log("SDFOM=>SetPics", props);
//   const [openModal, setOpenModal] = useState(undefined);

//   const [state, setState] = useState({
//     fullName: "",
//     Model: "Model3",
//     logoText: "",
//     showCfg: { display: "none" },
//   });
//   const { fullName, Model, logoText, showCfg } = state;
//   const onChange = (event: ChangeEvent<HTMLInputElement>) => {
//     event.persist();
//     console.log(event.target.value);
//     setState((prev) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//   };
//   const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     console.log(event.target.value);
//     setState((prev) => ({
//       ...prev,
//       Model: event.target.value,
//     }));
//   };
//   const handleColorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     console.log(event);
//   };

//   const onRequestSD = async () => {
//     setState((prev) => ({
//       ...prev,
//       showCfg: { display: "block" },
//     }));

//     try {
//       const SD_URL = "http://127.0.0.1:8000";
//       const response = await fetch(SD_URL + "/txt2img");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//         alert("Network response was not ok");
//       }
//       const data = await response.json();
//       console.log(data); // Print the JSON response

//       const pics = data.files.map((filename) => {
//         return {
//           original: SD_URL + `/images/${filename}`,
//           thumbnail: SD_URL + `/images/${filename}`,
//         };
//       });
//       // setState({ loading: "none" });
//       console.log(pics); // Print the converted pics array
//       props.SetPics(pics);
//       console.log(fullName, Model);
//     } catch (error) {
//       console.error("Error:", error);
//     }

//     setState((prev) => ({
//       ...prev,
//       showCfg: { display: "none" },
//     }));
//   };
//   return (
//     <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
//       <Select value={Model} onChange={handleOptionChange}>
//         <option>Model3</option>
//         <option>ModelS</option>
//         <option>ModelY</option>
//       </Select>
//       {/* <TextInput
//         type="text"
//         placeholder="Full name"
//         name="fullName"
//         value={fullName}
//         onChange={onChange}
//       />
//       <TextInput
//         type="text"
//         placeholder="LogoText"
//         name="logoText"
//         value={logoText}
//         onChange={onChange}
//       /> */}

//       <Button onClick={() => setOpenModal("default")}>选择颜色</Button>

//       {/* <Modal
//         style={{ zIndex: 10001 }}
//         size="7xl"
//         show={openModal === "default"}
//         onClose={() => setOpenModal(undefined)}
//       >
//         <Modal.Header>Terms of Service</Modal.Header>
//         <Modal.Body>
//           <ColorPicker colorSeries={colorData} onSelect={handleColorSelect} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={() => setOpenModal(undefined)}>I accept</Button>
//           <Button color="gray" onClick={() => setOpenModal(undefined)}>
//             Decline
//           </Button>
//         </Modal.Footer>
//       </Modal>
//        */}
//       <Button size="lg" color="dark" onClick={onRequestSD}>
//         {/* <Spinner
//           style={showCfg}
//           aria-label="Alternate spinner button example"
//         />
//          */}
//         <span className="pl-3">点击生成</span>
//       </Button>
//     </div>
//   );
// };

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
    <div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-secondary w-full max-w-xs"
      />

      <select
        value={Model}
        onChange={handleOptionChange}
        name=""
        className="select select-bordered w-full max-w-xs"
      >
        <option>Model3</option>
        <option>ModelS</option>
        <option>ModelY</option>
      </select>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Your Logo(YCL)?</span>
        </label>
        <input
          onChange={(event) => {
            onChangeLogo(event.target.value);
          }}
          name="logoText"
          value={logoText}
          type="text"
          placeholder="Type here"
          className="input  input-primary  input-bordered w-full max-w-xs"
        />
      </div>

      <button className="btn btn-active">Default</button>
      <button className="btn btn-active btn-neutral">Neutral</button>
      <button className="btn btn-active btn-primary">Primary</button>
      <button className="btn btn-active btn-secondary">Secondary</button>
      <button className="btn btn-active btn-accent">Accent</button>
      <button className="btn btn-active btn-ghost">Ghost</button>
      <button className="btn btn-active btn-link">Link</button>

      {/* Open the modal using ID.showModal() method */}

      {/* You can open the modal using ID.showModal() method */}
      <button className="btn" onClick={() => window.my_modal_4.showModal()}>
        open modal
      </button>
      <dialog id="my_modal_4" className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click the button below to close</p>
          <div className="modal-action">
            {/* if there is a button, it will close the modal */}
            <button className="btn">X</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default SDForm;

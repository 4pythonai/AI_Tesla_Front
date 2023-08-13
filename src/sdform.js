"use client";
import React from "react";
import { useState } from "react";
import ColorPicker from "./colorpicker";
import axios from "axios";
import RenderClock from "./components/stopwatch/RenderClock";
import { useStopwatch } from "react-timer-hook";

axios.defaults.crossDomain = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  process.env.VUE_APP_Access_Control_Allow_Origin;

const SDForm = (props) => {
  const [car, setCar] = useState("Model3");
  const [logoText, setLogoText] = useState("YCL");
  const [showCfg, setShowcfg] = useState({ display: "none" });
  const [color, setColor] = useState("");

  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  const baseUrl = "http://127.0.0.1:8000";
  const showGallery = (files) => {
    const pics = files.map((filename) => {
      return {
        src: baseUrl + `/images/${filename}`,
        width: 1,
        height: 1,
      };
    });
    console.log("后台图片", pics);
    setShowcfg({ display: "none" });
    props.SetPics(pics);
  };

  const onRequestSD = async () => {
    reset();
    start();
    props.SetPics([]);
    const endpoint = "/txt2img";
    const apiUrl = baseUrl + endpoint;

    setShowcfg({ display: "block" });
    const axiosCfg = { timeout: 500000 };

    try {
      const response = await axios.get(apiUrl, axiosCfg);
      console.log("返回数据:", response.data);
      const files = response.data.files;
      console.log("Json序列化:", files);

      showGallery(files);
      setShowcfg({ display: "none" });
      pause(); //停止计时
    } catch (error) {
      setShowcfg({ display: "none" });
      pause(); //停止计时
    }
  };
  return (
    <section>
      <div className="flex flex-col w-full">
        <div className="grid h-20 card  rounded-box place-items-center">
          <div className="flex items-start space-x-2">
            {" "}
            <div
              style={{ marginTop: "10px" }}
              className="flex items-start space-x-2"
            >
              AI出图配置:
            </div>
            <select
              value={car}
              onChange={(event) => {
                setCar(event.target.value);
              }}
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
                  setLogoText(event.target.value);
                }}
                name="logoText"
                value={logoText}
                type="text"
                placeholder="Type here"
                className="input input-primary input-bordered"
              />
            </div>
            <button
              className="btn"
              onClick={() => window.my_modal_4.showModal()}
            >
              选择车模颜色
            </button>
            <dialog id="my_modal_4" className="modal">
              <form method="dialog" className="modal-box w-11/12 max-w-7xl">
                <ColorPicker setColor={setColor} />
                <div className="modal-action">
                  <button className="btn">X</button>
                </div>
              </form>
            </dialog>
            <button className="btn btn-neutral" onClick={onRequestSD}>
              <span style={showCfg} className="loading loading-spinner"></span>
              生成照片!
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="grid h-20 card  rounded-box place-items-center">
          <div className="flex items-start space-x-2">
            <RenderClock
              seconds={seconds}
              minutes={minutes}
              start={start}
              reset={reset}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDForm;

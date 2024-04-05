"use client";
import React from "react";
import { useState } from "react";
import ColorPicker from "./colorpicker";
import axios from "axios";
import RenderClock from "./components/stopwatch/RenderClock";
import { useStopwatch } from "react-timer-hook";
import { makePrompt } from "./utils/tools";

axios.defaults.crossDomain = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  process.env.VUE_APP_Access_Control_Allow_Origin;

const SDForm = (props) => {
  const [car, setCar] = useState("车型-Model3");
  const [logoText, setLogoText] = useState("YCL");
  const [showCfg, setShowcfg] = useState({ display: "none" });
  const [color, setColor] = useState(""); // 车膜颜色
  const [matte, setMatte] = useState(false); // set哑光 matte color
  const [style, setStyle] = useState("风格-柔和"); //
  const [background, setBackground] = useState("背景-车间");
  const [prompt, setPrompt] = useState("提示词将会显示到这里");

  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  const baseUrl = "http://119.255.238.247:6789";
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

    const data = {
      car: car,
      logoText: logoText,
      color: color,
      matte: matte,
      style: style,
      background: background,
    };

    let newPrompt = makePrompt(data);
    setPrompt(newPrompt);
    const api = axios.create({ baseURL: apiUrl, timeout: 500000 });

    try {
      const response = await api.post(apiUrl, {
        prompt: newPrompt,
        age: "22",
        sex: "male",
      });
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

  const handleChange = () => {
    console.log(!matte);
    setMatte(!matte);
  };

  return (
    <section className="text-gray-600">
      {/* 组件 */}

      <div className="flex flex-col space-x-2  md:flex-row   md:gap-y-14 content-center items-center justify-center">
        <div className="whitespace-nowrap" id="section-1">
          AI出图配置:
        </div>
        <div>
          <select
            value={car}
            onChange={(event) => {
              setCar(event.target.value);
            }}
            name=""
            className="select select-bordered"
          >
            <option>车型-Model3</option>
            <option>车型-ModelS</option>
            <option>车型-ModelY</option>
          </select>
        </div>

        <div style={{ width: "140px" }} className="form-control">
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
        <div className="whitespace-nowrap">
          <button className="btn" onClick={() => window.my_modal_4.showModal()}>
            <div className="whitespace-nowrap">选择车模颜色</div>
          </button>
        </div>
        <div style={{ marginTop: "4px" }} className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">哑光</span>
            <input
              value={matte}
              type="checkbox"
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
        <div>
          <select
            value={background}
            onChange={(event) => {
              setBackground(event.target.value);
            }}
            name=""
            className="select select-bordered max-w-xs"
          >
            <option>背景-车间</option>
            <option>背景-马路</option>
            <option>背景-森林</option>
            <option>背景-沙漠</option>
          </select>
        </div>
        <div>
          <select
            value={style}
            onChange={(event) => {
              setStyle(event.target.value);
            }}
            name=""
            className="select select-bordered max-w-xs"
          >
            <option>风格-柔和</option>
            <option>风格-锐利</option>
            <option>风格-动感</option>
          </select>
        </div>
        <dialog id="my_modal_4" className="modal">
          <form method="dialog" className="modal-box w-11/12 max-w-7xl">
            <ColorPicker setColor={setColor} />
            <div className="modal-action">
              <button className="btn">X</button>
            </div>
          </form>
        </dialog>
        <div>
          <button
            className="btn btn-neutral hover:bg-sky-700"
            onClick={onRequestSD}
          >
            <span
              id="sd"
              style={showCfg}
              className="loading loading-spinner hover:bg-sky-700"
            ></span>
            生成照片!
          </button>
        </div>
      </div>

      {/* prompt */}

      <div className="flex flex-col w-full">
        <div className="grid h-20 card  rounded-box place-items-center">
          <textarea
            value={prompt}
            readOnly
            className="input input-primary input-bordered textarea-xs"
            type="text"
            style={{ width: "940px" }}
          />
          <div className="flex items-start space-x-2"></div>
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

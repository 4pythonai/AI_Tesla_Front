import React, { useState } from "react";
import colorData from "./colorData.json";

const ColorPicker = (props) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorName, setColorName] = useState("");
  const handleColorSelect = (colorStr, colorname) => {
    setSelectedColor(colorStr);
    setColorName(colorname);
    props.setColor(colorStr);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {colorData.map((series) => (
        <div
          key={series.name}
          style={{
            marginTop: "16px",
            flex: 1,
            fontSize: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4>{series.name}</h4>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {series.colors.map((color) => (
              <div key={color.code}>
                <div
                  className="hover:bg-sky-700 rounded-lg"
                  key={color.code}
                  style={{
                    margin: "4px",
                    zIndex: 10000,
                    backgroundColor: color.code,
                    color: "white",
                    width: "70px",
                    radius: "10px",
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorSelect(color.en, color.zh)}
                >
                  {color.zh}
                </div>
                <span style={{ marginLeft: "20px", fontSize: "12px" }}>
                  {color.zh}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        {selectedColor && (
          <span>
            {colorName}
            {selectedColor}
          </span>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;

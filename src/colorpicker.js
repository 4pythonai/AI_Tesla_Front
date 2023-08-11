import React, { useState } from "react";
import colorData from "./colorData.json";

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = (colorCode) => {
    setSelectedColor(colorCode);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3>Select a Color:</h3>
      {colorData.map((series) => (
        <div
          key={series.name}
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <h4>{series.name}</h4>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {series.colors.map((color) => (
              <div
                key={color.code}
                style={{
                  zIndex: 10000,
                  backgroundColor: color.code,
                  color: "white",
                  width: "70px",
                  height: "70px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleColorSelect(
                    color.zh + "  " + color.en + "  " + color.code
                  )
                }
              >
                {color.zh}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        Selected Color:{" "}
        {selectedColor && (
          <span style={{ color: selectedColor }}>{selectedColor}</span>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;

import { useState } from "react";

import Wheel from "./Wheel";

interface Props {
  size?: number;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
}

export default function InteractiveColorWheel({
  size = 300,
  mixBlendMode = "initial",
}: Props) {
  const [rotation, setRotation] = useState<string>("0");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap-reverse",
      }}
    >
      <div style={{ flexGrow: 0, flexShrink: 0 }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            // padding: "1rem",
            margin: "2rem",
            width: "100%",
          }}
        >
          <span>Rotation</span>
          <input
            id="rotation"
            name="rotation"
            value={rotation}
            min="0"
            max="360"
            step="1"
            onChange={(e) => {
              setRotation(e.target.value);
            }}
            type="range"
            style={{ margin: "0 1rem" }}
          />
          <div style={{ width: "75px" }}>{rotation}°</div>
        </label>
      </div>
      <div
        style={{
          position: "relative",
          height: `${size}px`,
          width: `${size}px`,
        }}
      >
        <Wheel size={size} square />
        <Wheel
          size={size}
          rotation={rotation}
          style={{
            mixBlendMode,
          }}
        />
      </div>
    </div>
  );
}

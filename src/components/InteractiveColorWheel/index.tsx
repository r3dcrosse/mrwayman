import { useState } from "react";

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
        flexWrap: "wrap",
      }}
    >
      <div>
        <label style={{ display: "flex" }}>
          Rotation
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
          />
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

interface WheelProps {
  size?: number;
  style?: React.CSSProperties;
  square?: boolean;
  rotation?: string;
}

function Wheel({
  size = 300,
  style = {},
  square = false,
  rotation = "0",
}: WheelProps) {
  const getConicGradient = () => {
    return `conic-gradient(
                from 90deg,
                hsl(360, 100%, 50%),
                hsl(315, 100%, 50%),
                hsl(270, 100%, 50%),
                hsl(225, 100%, 50%),
                hsl(180, 100%, 50%),
                hsl(135, 100%, 50%),
                hsl(90, 100%, 50%),
                hsl(45, 100%, 50%),
                hsl(0, 100%, 50%)
            )`;
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: square ? 0 : "100%",
        background: getConicGradient(),
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
    />
  );
}

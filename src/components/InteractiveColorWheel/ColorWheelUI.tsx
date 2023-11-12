import { useState, CSSProperties } from "react";
import Wheel, { Gradient, GradientMap } from "./Wheel";

const SIZE = 300;

const CSS_BLEND_MODES = [
  "initial",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];
const GRADIENTS = Object.keys(GradientMap) as Array<Gradient>;

export default function ColorWheelUI() {
  const [showSquare, setShowSquare] = useState<boolean>(true);
  const [rotation, setRotation] = useState<string>("0");
  const [gradient, setGradient] = useState<Gradient>(GRADIENTS[0]);
  const [blendMode, setBlendMode] =
    useState<CSSProperties["mixBlendMode"]>("initial");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap-reverse",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>
          <span>Show Background Square</span>
          <input
            type="checkbox"
            onChange={(e) => {
              setShowSquare((s) => !s);
            }}
            checked={showSquare}
          />
        </label>
        <label>
          <span>Gradient</span>
          <select
            name="Gradient"
            id="gradient"
            value={gradient}
            onChange={(e) => {
              setGradient(e.target.value as Gradient);
            }}
          >
            {GRADIENTS.map((g) => {
              return (
                <option key={g} value={g}>
                  {g}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          <span>Blend Mode</span>
          <select
            name="Blend Mode"
            id="blend-mode"
            value={blendMode}
            onChange={(e) => {
              setBlendMode(e.target.value as CSSProperties["mixBlendMode"]);
            }}
          >
            {CSS_BLEND_MODES.map((mode) => {
              return (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              );
            })}
          </select>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            width: "200px",
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
          <span>{rotation}°</span>
        </label>
      </div>
      <div
        style={{
          position: "relative",
          height: `${SIZE}px`,
          width: `${SIZE}px`,
        }}
      >
        <Wheel size={SIZE} square={showSquare} gradient={Gradient.default} />
        <Wheel
          size={SIZE}
          gradient={gradient}
          rotation={rotation}
          style={{ mixBlendMode: blendMode }}
        />
      </div>
    </div>
  );
}

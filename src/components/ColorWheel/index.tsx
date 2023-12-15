import { useState, useEffect } from "react";
import {
  radToDegrees,
  normalizeDegrees,
  getQuadrant,
  hslColorQuadrant,
  hslToCustomColorQuadrant,
  linearInterpolation,
} from "./utils";

interface Props {
  /**
   * size: optional number
   * The width and height of the color wheel
   * In pixels (px)
   * Default is 300px
   */
  size?: number;
  /**
   * isCompass: optional boolean
   * Replaces the color wheel with a compass background
   * Default is false
   */
  isCompass?: boolean;
  /**
   * personalized: optional boolean
   * Replaces the colors on the color wheel with my
   * personalized mapping:
   * North -> Cyan
   * East -> Yellow
   * South -> Red
   * West -> Purple
   */
  personalized?: boolean;
  /**
   * showDegrees: optional boolean
   * Displays the current degree of the color wheel
   * Default is false
   */
  showDegrees?: boolean;
}

export default function ColorWheel({
  size = 300,
  isCompass = false,
  personalized = false,
  showDegrees = false,
}: Props): JSX.Element {
  const colorPointerSize = size / 10;
  const defaultREM = colorPointerSize / 10;

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const [extrapolatedX, setExtrapolatedX] = useState(0);
  const [extrapolatedY, setExtrapolatedY] = useState(0);
  const [hslTheta, setHslTheta] = useState(0);

  useEffect(() => {
    // We need to normalize our X and Y coords
    // because of the way coordinates work in the DOM
    const normalizedX = offsetX - size / 2;
    const normalizedY = size / 2 - offsetY;

    const theta = Math.atan2(normalizedY, normalizedX);
    setHslTheta(theta);

    // Get the edge of the circle
    // this is always going to be equal to the radius
    // because we've normalized our circle's coordinates
    const circleEdge = size / 2 + colorPointerSize / 2;

    // Use the extrapolated r and convert back to cartesian coordinates
    const extraX = circleEdge * Math.cos(theta);
    const extraY = circleEdge * Math.sin(theta);

    // Remove our normalization of X and Y coords
    setExtrapolatedX(extraX + size / 2);
    setExtrapolatedY(extraY + size / 2);
  }, [size, offsetX, offsetY]);

  const getConicGradient = (): string => {
    if (isCompass) return "transparent";

    if (personalized) {
      return `conic-gradient(
      from 180deg,
      hsl(360, 100%, 50%),
      hsl(270, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(75, 100%, 50%),
      hsl(0, 100%, 50%)
      )`;
    }

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

  const getColor = (): string => {
    if (personalized) {
      let deg = parseFloat(radToDegrees(hslTheta).toFixed(20));
      deg = normalizeDegrees(deg);

      const quad = getQuadrant(deg);
      const interpolatedColorDeg = linearInterpolation(
        deg,
        hslColorQuadrant[quad],
        hslToCustomColorQuadrant[quad]
      );

      return `hsl(${interpolatedColorDeg}deg, 100%, 50%)`;
    }

    return `hsl(${hslTheta}rad, 100%, 50%)`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginTop: `${defaultREM}rem`,
      }}
    >
      <div style={{ display: "flex", width: `${size}px`, height: `${size}px` }}>
        {isCompass && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              height: `${size}px`,
              width: `${size}px`,
              zIndex: 0,
            }}
          >
            <div>North</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <div>West</div>
              <div>+</div>
              <div>East</div>
            </div>
            <div>South</div>
          </div>
        )}
        <div
          style={{
            height: `${size}px`,
            width: `${size}px`,
            zIndex: 10,
          }}
          onMouseMove={(e) => {
            setOffsetX(e.nativeEvent.offsetX);
            setOffsetY(e.nativeEvent.offsetY);
          }}
          onMouseDown={(e) => {
            setOffsetX(e.nativeEvent.offsetX);
            setOffsetY(e.nativeEvent.offsetY);
          }}
        >
          <div
            style={{
              height: `${size}px`,
              width: `${size}px`,
              borderRadius: "100%",
              background: getConicGradient(),
              border: isCompass ? "1px solid green" : "none",
            }}
          />
          <div
            onMouseMove={(e) => {
              // When we have a mouseover event here
              // stop the event propagation. Otherwise
              // we get a bug where we reset offsetX and offsetY
              // coordinates to their default position
              e.stopPropagation();
            }}
            style={{
              height: `${colorPointerSize}px`,
              width: `${colorPointerSize}px`,
              background: getColor(),
              borderRadius: "100%",
              position: "relative",
              // Need to offset by half the width of the colorPointer
              // if you'd like it centered
              bottom: `${extrapolatedY + colorPointerSize / 2}px`,
              left: `${extrapolatedX - colorPointerSize / 2}px`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          height: `${size}px`,
          width: `${size}px`,
          background: getColor(),
          margin: `${defaultREM}rem`,
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showDegrees ? (
          <span
            style={{
              mixBlendMode: "difference",
              color: "white",
              fontSize: "3rem",
            }}
          >
            {normalizeDegrees(parseFloat(radToDegrees(hslTheta).toFixed(0)))}°
          </span>
        ) : null}
      </div>
    </div>
  );
}

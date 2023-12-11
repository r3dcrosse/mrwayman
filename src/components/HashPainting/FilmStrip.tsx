import React, { useState, useEffect } from "react";

import Frame, { FrameMetadata } from "./Frame";

import { Art } from ".";

interface Props {
  frames: Array<FrameMetadata>;
  art: Art;
  hueRotation?: string;
  size?: number;
}

export default function FilmStrip({
  frames,
  hueRotation = "0",
  art,
  size,
}: Props): JSX.Element {
  return (
    <div
      style={{
        filter: `hue-rotate(${hueRotation}deg)`,
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {frames.map((frame) => {
        return <Frame key={frame.id} frame={frame} art={art} size={size} />;
      })}
    </div>
  );
}

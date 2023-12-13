import React, { forwardRef } from "react";

import Frame, { FrameMetadata } from "./Frame";

import { Art } from ".";

interface Props {
  frames: Array<FrameMetadata>;
  art: Art;
  hueRotation?: string;
  size?: number;
}

export default forwardRef(function FilmStrip(
  { frames, hueRotation = "0", art, size }: Props,
  ref
): JSX.Element {
  return (
    <div
      // @ts-ignore ignoring because the ref still works
      ref={ref}
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
});

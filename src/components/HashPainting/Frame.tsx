import React from "react";
import HexRow from "./HexRow";
import { Art } from ".";

export interface FrameMetadata {
  id: number;
  word: string;
  hash: string;
  hashGrid: Array<Array<string>>;
}

interface Props {
  frame: FrameMetadata;
  art?: Art;
  size?: number;
}

export default function Frame({ frame, art, size }: Props): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Optionally display the word next to the frame */}
      {/* {frame.word} */}
      <div>
        {frame.hashGrid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} style={{ display: "flex", width: "100%" }}>
              {row.map((r, columnIndex) => {
                return (
                  <div key={columnIndex} style={{ width: "100%" }}>
                    {/* {art === Art.rawHash && r}
                    {(art === Art.horizontalHexColor ||
                      art === Art.verticalHexColor) && (
                      <HexRow
                        word={word}
                        hash={hash}
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        art={art}
                        size={size}
                      />
                    )} */}
                    <HexRow
                      word={frame.word}
                      hash={frame.hash}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      size={size}
                      art={art}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

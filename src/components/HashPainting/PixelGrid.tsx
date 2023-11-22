import React from "react";

import HexRow from "./HexRow";

import { Art } from ".";

interface Props {
  hash: string;
  art: Art;
  hueRotation?: string;
  size?: number,
}

export default function PixelGrid({
  hash = "",
  hueRotation = "0",
  art,
  size,
}: Props): JSX.Element {
  const grid = makeGridArray(hash);

  return (
    <div
      style={{
        filter: `hue-rotate(${hueRotation}deg)`,
      }}
    >
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} style={{ display: "flex", width: "100%" }}>
            {row.map((r, columnIndex) => {
              return (
                <div key={columnIndex} style={{ width: "100%" }}>
                  {art === Art.rawHash && r}
                  {(art === Art.horizontalHexColor ||
                    art === Art.verticalHexColor) && (
                    <HexRow
                      hash={hash}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      art={art}
                      size={size}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/**
 * makeGridArray - Helper function to turn a string into a square matrix.
 *
 * @param s The string to make the grid array out of.
 *          For best results, use a string that has a length
 *          equal to a perfect square (1, 4, 9, 16, ... 144 etc)
 * @returns An Array<Array<string>> with each character
 *          from the string placed left to right,
 *          top to bottom (a grid)
 */
function makeGridArray(s: string): Array<Array<string>> {
  // Get the width of each row
  // Because we're assuming s.length is a perfect square,
  // we'll also assume width === height here.
  const width = Math.sqrt(s.length);

  const charArray = s.split("");

  const gridArray = [];
  for (let i = 0; i < width; i++) {
    const row = i * width;
    gridArray.push(charArray.slice(row, row + width));
  }

  return gridArray;
}

import React from "react";

import StyledPixel from "./StyledPixel";
import HexRow from "./HexRow";

import { Art } from ".";

interface Props {
  sha256Hash: string;
  art: Art;
  blur?: string;
  hueRotation?: string;
  pixelSize?: number,
}

export default function PixelGrid({
  sha256Hash,
  blur = "0",
  hueRotation = "0",
  art,
  pixelSize,
}: Props): JSX.Element {
  const grid = makeGridArray(sha256Hash);
  
  const width = 6;
  const charArray = sha256Hash.split("");
  const colorArray = [];

  if (sha256Hash) {
    for (let i = 0; i < Math.ceil(sha256Hash.length / 6); i++) {
      const row = i * width;
      colorArray.push(charArray.slice(row, row + width));
    }
  }

  return (
    <div
      style={{
        filter: `blur(${blur}px)  hue-rotate(${hueRotation}deg)`,
      }}
    >
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((r, columnIndex) => {
              return (
                <div key={columnIndex} style={{ width: `${pixelSize}px` }}>
                  {art === Art.rawHash && r}
                  {art === Art.pixel && <StyledPixel value={r} />}
                  {(art === Art.horizontalHexColor ||
                    art === Art.verticalHexColor) && (
                    <HexRow
                      hash={sha256Hash}
                      colorArray={colorArray}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      art={art}
                      pixelSize={pixelSize}
                      char={r}
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

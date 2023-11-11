import React from "react";

import StyledPixel from "./StyledPixel";
import HexRow from "./HexRow";

import { Art } from ".";

interface Props {
  sha256Hash: string;
  art: Art;
  blur?: string;
  hueRotation?: string;
}

export default function PixelGrid({
  sha256Hash,
  blur = "0",
  hueRotation = "0",
  art,
}: Props): JSX.Element {
  const grid = makeGridArray(sha256Hash);

  return (
    <div
      style={{
        filter: `blur(${blur}px)  hue-rotate(${hueRotation}deg)`,
      }}
    >
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} style={{ display: "flex", width: "100%" }}>
            {row.map((r, columnIndex) => {
              return (
                <div key={columnIndex} style={{ width: "25px" }}>
                  {art === Art.rawHash && r}
                  {art === Art.pixel && <StyledPixel value={r} />}
                  {(art === Art.horizontalHexColor ||
                    art === Art.verticalHexColor) && (
                    <HexRow
                      hash={sha256Hash}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      art={art}
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

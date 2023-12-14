import React from "react";

import { Art } from ".";

interface Props {
  hash: string;
  rowIndex: number;
  columnIndex: number;
  colorArray: Array<Array<string>>;
  art?: Art.horizontalHexColor | Art.verticalHexColor;
  pixelSize?: number;
  char?: string;
}

export default function HexRow({
  hash,
  rowIndex,
  columnIndex,
  colorArray,
  art = Art.horizontalHexColor,
  pixelSize,
  char,
}: Props): JSX.Element {
  let colorIndex = 8 * rowIndex + columnIndex;

  if (art === Art.horizontalHexColor) {
    const startOfColor = Math.floor(colorIndex / 6);    
    const hexColor = colorArray[startOfColor].join("");

    return (
      <div
        style={{
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          backgroundColor: `#${hexColor}`,
          transition: "background-color 0.2s",
          textAlign: "center",
        }}
      >
        {char && (
          <span style={{ mixBlendMode: "difference", color: "white" }}>
            {char}
          </span>
        )}
      </div>
    );
  }

  colorIndex = rowIndex + columnIndex;

  // Cool vertical bars kinda effect
  // const startOfColor = Math.floor(rowIndex / 6) + columnIndex;
  // const endOfColor = startOfColor + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // checker color pattern
  // const startOfColor = Math.floor(rowIndex - columnIndex / 6) + columnIndex;
  // const endOfColor = startOfColor + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Cool mini pallet, one active color, 3 darker pixels all in top left corner
  // const startOfColor = Math.floor(rowIndex / 6);
  // const endOfColor = colorIndex + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Cool, left half of a vertical bar effect
  // const startOfColor = Math.floor(rowIndex / 6);
  // const endOfColor = columnIndex + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Cool, top half of a vertical bar effect
  // const startOfColor = Math.floor(columnIndex / 6);
  // const endOfColor = rowIndex + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Another cool mini, 8 pixels all in top left corner
  // const startOfColor = Math.floor(rowIndex / 6);
  // const endOfColor = startOfColor + 6;
  // const hexColor = hash.slice(colorIndex, endOfColor);

  // Sets a color scheme that produces a solid background
  // with a ground floor
  // const startOfColor = Math.floor(rowIndex / 6);
  // const endOfColor = startOfColor + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Sets a color scheme that produces a solid left background
  // with different color of two rows on right
  // const startOfColor = Math.floor(columnIndex / 6);
  // const endOfColor = startOfColor + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Produces two similar color lines at top
  // const startOfColor = Math.floor(rowIndex / 6);
  // const endOfColor = rowIndex + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Diagonal cross
  // const startOfColor = Math.floor(colorIndex / 6);
  // const endOfColor = colorIndex;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Very cool near diagonal pattern
  const startOfColor = Math.floor(rowIndex / 6) + colorIndex;
  const endOfColor = startOfColor + 6;
  const hexColor = hash.slice(startOfColor, endOfColor);

  // Perfect diagonal pattern
  // const startOfColor = Math.floor(rowIndex / 6) + colorIndex;
  // const endOfColor = colorIndex + 6;
  // const hexColor = hash.slice(colorIndex, endOfColor);

  // Irregular opposite diagonal
  // const startOfColor = Math.floor(columnIndex / 6) + rowIndex;
  // const endOfColor =  columnIndex + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Cool horizontal pattern, diagonal top left filled out
  // mini diagonal bottom right
  // const startOfColor = Math.floor(colorIndex / 6) + rowIndex;
  // const endOfColor =  rowIndex + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Another cool irregular opposite diagonal
  // const startOfColor = Math.floor(columnIndex + rowIndex / 6) + columnIndex;
  // const endOfColor =  colorIndex + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  // Cool irregular pattern of opposite diagonal
  // const startOfColor = Math.floor(columnIndex + rowIndex / 6) + columnIndex;
  // const endOfColor = rowIndex + 6;
  // const hexColor = hash.slice(startOfColor, endOfColor);

  return (
    <div
      style={{
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        backgroundColor: `#${hexColor}`,
        transition: "background-color 0.2s",
        textAlign: "center",
      }}
    >
      {char && (
        <span style={{ mixBlendMode: "difference", color: "white" }}>
          {char}
        </span>
      )}
    </div>
  );
}

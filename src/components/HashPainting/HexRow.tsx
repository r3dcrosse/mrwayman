import React from "react";

import { Art } from ".";

interface Props {
  word: string;
  hash: string;
  rowIndex: number;
  columnIndex: number;
  art?: Art;
  size?: number;
}

export default function HexRow({
  word,
  hash,
  rowIndex,
  columnIndex,
  art = Art.horizontalHexColor,
  size,
}: Props): JSX.Element {
  const colorIndex = rowIndex + columnIndex;
  let startOfColor = Math.floor(colorIndex / 6) + rowIndex;
  let endOfColor = startOfColor + 6;
  let hexColor = hash.slice(startOfColor, endOfColor);

  // We can get a color every 6 characters
  if (art === Art.horizontalHexColor) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: `#${hexColor}`,
          transition: "background-color 0.2s",
        }}
      />
    );
  }

  const wordLength = word?.length;

  // Entropy! Use the word length to bucket the pattern
  // into 16 different effects.
  const entropy = wordLength % 16;

  switch (entropy) {
    case 0:
      // Cool vertical bars kinda effect
      startOfColor = Math.floor(rowIndex / 6) + columnIndex;
      endOfColor = startOfColor + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 1:
      // checker color pattern
      startOfColor = Math.floor(rowIndex - columnIndex / 6) + columnIndex;
      endOfColor = startOfColor + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 2:
      // Cool, left half of a vertical bar effect
      startOfColor = Math.floor(rowIndex / 6);
      endOfColor = columnIndex + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 3:
      // Cool mini pallet, one active color, 3 darker pixels all in top left corner
      startOfColor = Math.floor(rowIndex / 6);
      endOfColor = colorIndex + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 4:
      // Very cool near diagonal pattern
      startOfColor = Math.floor(rowIndex / 6) + colorIndex;
      endOfColor = startOfColor + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 5:
      // Another cool mini, 8 pixels all in top left corner
      startOfColor = Math.floor(rowIndex / 6);
      endOfColor = startOfColor + 6;
      hexColor = hash.slice(colorIndex, endOfColor);
      break;
    case 6:
      // Cool, top half of a vertical bar effect
      startOfColor = Math.floor(columnIndex / 6);
      endOfColor = rowIndex + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 7:
      // Sets a color scheme that produces a solid background
      // with a ground floor
      startOfColor = Math.floor(rowIndex / 6);
      endOfColor = startOfColor + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 8:
      // Sets a color scheme that produces a solid left background
      // with different color of two rows on right
      startOfColor = Math.floor(columnIndex / 6);
      endOfColor = startOfColor + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 9:
      // Produces two similar color lines at top
      startOfColor = Math.floor(rowIndex / 6);
      endOfColor = rowIndex + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 10:
      // Diagonal cross
      startOfColor = Math.floor(colorIndex / 6);
      endOfColor = colorIndex;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 11:
      // Perfect diagonal pattern
      startOfColor = Math.floor(rowIndex / 6) + colorIndex;
      endOfColor = colorIndex + 6;
      hexColor = hash.slice(colorIndex, endOfColor);
      break;
    case 12:
      // Irregular opposite diagonal
      startOfColor = Math.floor(columnIndex / 6) + rowIndex;
      endOfColor = columnIndex + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 13:
      // Cool horizontal pattern, diagonal top left filled out
      // mini diagonal bottom right
      startOfColor = Math.floor(colorIndex / 6) + rowIndex;
      endOfColor = rowIndex + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 14:
      // Another cool irregular opposite diagonal
      startOfColor = Math.floor(columnIndex + rowIndex / 6) + columnIndex;
      endOfColor = colorIndex + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    case 15:
      // Cool irregular pattern of opposite diagonal
      startOfColor = Math.floor(columnIndex + rowIndex / 6) + columnIndex;
      endOfColor = rowIndex + 6;
      hexColor = hash.slice(startOfColor, endOfColor);
      break;
    default:
      break;
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: `#${hexColor}`,
        transition: "background-color 0.2s",
      }}
    />
  );
}

import React from "react";

interface Props {
  hash: string;
  rowIndex: number;
  columnIndex: number;
}

export default function HexRow({
  hash,
  rowIndex,
  columnIndex,
}: Props): JSX.Element {
  const colorIndex = rowIndex + columnIndex;

  // We can get a color every 6 characters
  const startOfColor = Math.floor(colorIndex / 6) + rowIndex;
  const endOfColor = startOfColor + 6;
  const hexColor = hash.slice(startOfColor, endOfColor);

  return (
    <div
      style={{ width: "25px", height: "25px", backgroundColor: `#${hexColor}` }}
    />
  );
}

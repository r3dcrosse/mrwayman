import { useState, useEffect, useMemo } from "react";
import PixelGenerator, { Art } from "../PixelGenerator";

export default function HashPainting(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [wordSpeed, setWordSpeed] = useState<number>(1000);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const words = useMemo(() => {
    return text.split(" ");
  }, [text]);

  useEffect(() => {
    if (!isPlaying) return;

    const wordTimer = setInterval(() => {
      let nextIndex = index + 1;

      if (words[nextIndex] === undefined) {
        setIsPlaying(false);
        setIndex(0);
        setWordSpeed(1000);
      } else {
        setIndex(nextIndex);
        setWordSpeed(words[nextIndex].length * 0.1 * 1000);
      }
    }, wordSpeed);

    return () => clearInterval(wordTimer);
  }, [isPlaying, words, index, wordSpeed]);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <div style={{ flexBasis: "33%", height: "100%" }}>
        <textarea
          style={{ width: "100%", height: "calc(100vh - 10rem)" }}
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
        <button
          onClick={() => {
            setIsPlaying((p) => !p);
          }}
          style={{ width: "100%", height: "9rem" }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      {/* <div>{words[index]} | {wordSpeed}</div> */}
      <div>
        <PixelGenerator value={words[index]} art={Art.verticalHexColor} />
      </div>
    </div>
  );
}

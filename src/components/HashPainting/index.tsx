import { useState, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { toPng } from "html-to-image";
import FilmStrip from "./FilmStrip";
import styles from "./styles.module.css";

import ThoughtsByMyraViolaWilds from "./Thoughts";

import { FrameMetadata } from "./Frame";

let frameID = 0;

export enum Art {
  pixel = "pixel",
  horizontalHexColor = "horizontalHexColor",
  verticalHexColor = "verticalHexColor",
  /**
   * will display each character of the
   * hash instead of a stylized pixel
   */
  rawHash = "rawHash",
}

interface Props {
  /**
   * Size: The size of each pixel (in px).
   * Default is 50.
   */
  size?: number;
  /**
   * Max Buffer: The maximum number of frames
   * allowed to be rendered consecutively.
   * Default is 10.
   */
  maxFrameBuffer?: number;
}

export default function HashPainting({
  size = 50,
  maxFrameBuffer = 10,
}: Props): JSX.Element {
  const [text, setText] = useState<string>(ThoughtsByMyraViolaWilds);
  const [index, setIndex] = useState<number>(0);
  const [wordSpeed, setWordSpeed] = useState<number>(1000);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [frames, setFrames] = useState<Array<FrameMetadata>>([]);
  const paintingRef = useRef(null);

  const words = useMemo(() => {
    return text.split(/[\s]+/);
  }, [text]);
  const whitespace = useMemo(() => {
    return text.split(/[\S]+/);
  }, [text]);

  /**
   * Because of how we've split the text:
   * 1) split on whitespace chars
   * 2) split on everything except whitespace chars
   *
   * One of these arrays will start with an empty string.
   *
   * We need to figure out which array starts
   * with an empty string. That array becomes
   * the first array in our zip function.
   */
  const wordIsFirst = words[0] === "";
  const arr1 = wordIsFirst ? words : whitespace;
  const arr2 = !wordIsFirst ? words : whitespace;

  /**
   * Use this effect to handle updating what word
   * we're currently hashing and how long
   * we should display the hash.
   */
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
        setWordSpeed(
          zip(arr1, arr2, nextIndex, nextIndex + 1).length * 0.1 * 1000
        );
      }
    }, wordSpeed);

    return () => clearInterval(wordTimer);
  }, [isPlaying, words, index, wordSpeed]);

  /**
   * Use this effect for generating the hash
   * of the current word and adding a new frame
   */
  useEffect(() => {
    async function getHash(word) {
      const hash = await getSHA256Hash(word);
      const hashGrid = makeGridArray(hash);

      setFrames((s) => [
        ...s,
        {
          word,
          hash,
          hashGrid,
          id: frameID++,
        },
      ]);
    }

    /**
     * If the play button isn't pressed,
     * make a hash of the entire textarea contents.
     */
    getHash(isPlaying || index !== 0 ? words[index] : text);
  }, [isPlaying, words, index, maxFrameBuffer]);

  const handleReset = () => {
    setIndex(0);
    setIsPlaying(false);
    setFrames([]);
  };

  const handleSavePNG = () => {
    if (paintingRef?.current) {
      toPng(paintingRef?.current)
        .then((dataUrl) => {
          const a = document.createElement("a");
          a.href = dataUrl;
          a.target = "_self";
          a.download = "hash-poem";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <div
        style={{
          maxWidth: "50vw",
          //   flexBasis: "50%",
          maxHeight: "80vh",
          height: "100%",
          padding: "1rem",
          flexGrow: 0,
          flexShrink: 0,
          position: "sticky",
          top: "0",
        }}
      >
        <h1>Painting Poems with Hashes</h1>
        <p>Enter a poem or text, then press the play button.</p>
        <p>
          Each word is hashed using SHA-256, then colors are generated from the
          hexadecimal characters in the hash. The result is a "hash-painting."
        </p>
        {!isPlaying && (
          <textarea
            style={{
              width: "100%",
              height: "calc(70vh - 12rem)",
              marginBottom: "1rem",
              padding: "1rem",
            }}
            onChange={(e) => {
              setText(e.target.value);
              setIsPlaying(false);
              setIndex(0);
            }}
            value={text}
          />
        )}
        {isPlaying && (
          <pre style={{ height: "calc(70vh - 12rem)" }}>
            {zip(arr1, arr2, 0, index)}
            <span className={styles.currentWord}>
              {zip(arr1, arr2, index, index + 1)}
            </span>
            {zip(arr1, arr2, index + 1, arr1.length)}
          </pre>
        )}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => {
                setIsPlaying((p) => !p);
              }}
              className={clsx(styles.playButton, {
                [styles.playing]: isPlaying,
              })}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={handleReset} className={styles.resetButton}>
              Reset
            </button>
          </div>
        </div>

        <button onClick={handleSavePNG} className={styles.saveButton}>
          Save as .png
        </button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/**
         * NAVI VOICE: HEY! LISTEN!
         *
         * When rendering the film strip, set a buffer limit on the
         * maximum number of frames to draw, to avoid adding too
         * many elements to the DOM.
         *
         * Allegedly, the DOM can render ~1500 nodes before performance
         * starts to degrade. We can notice this if we set a
         * maxFrameBuffer too high.
         */}
        <FilmStrip
          ref={paintingRef}
          frames={frames.slice(-1 * maxFrameBuffer)}
          art={Art.verticalHexColor}
          size={size}
        />
      </div>
    </div>
  );
}

/**
 * zip - Given two arrays, a start, and end index
 * combine both arrays like a zipper, starting with
 * arr1.
 */
function zip(
  arr1: string[],
  arr2: string[],
  startIndex: number,
  endIndex: number
): string {
  let result = "";

  for (let i = startIndex; i < endIndex; i++) {
    result += arr1[i] ?? "";
    result += arr2[i] ?? "";
  }

  return result;
}

/**
 * getSHA256Hash - Takes a unicode string and returns the SHA256 hash for it
 * @param {string} text - The unicode string to hash
 * @returns {string} The SHA256 hash
 */
async function getSHA256Hash(text: string): Promise<string> {
  const name = new TextEncoder().encode(text);
  const hashAsArrayBuffer = await crypto.subtle.digest("SHA-256", name);
  const uint8ViewOfHash = new Uint8Array(hashAsArrayBuffer);

  const hashAsString = Array.from(uint8ViewOfHash)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashAsString;
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

import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import PixelGrid from "./PixelGrid";
import styles from "./styles.module.css";

import ThoughtsByMyraViolaWilds from "./Thoughts";

const whitespaceRegEx = new RegExp(/[\s]+/);

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
}

export default function HashPainting({ size = 50 }: Props): JSX.Element {
  const [text, setText] = useState<string>(ThoughtsByMyraViolaWilds);
  const [index, setIndex] = useState<number>(0);
  const [wordSpeed, setWordSpeed] = useState<number>(1000);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hash, setHash] = useState<string>("");

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
   * of the current word.
   */
  useEffect(() => {
    async function getHash(word) {
      const hash = await getSHA256Hash(word);

      setHash(hash);
    }

    /**
     * If the play button isn't pressed,
     * make a hash of the entire textarea contents.
     */
    getHash(isPlaying || index !== 0 ? words[index] : text);
  }, [isPlaying, words, index]);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <div style={{ flexBasis: "50%", height: "100%", padding: "1rem" }}>
        <h1>Hash Painting</h1>
        <p>Generate colors from a SHA-256 hash</p>
        <p>
          Enter some text, such as a poem. Press the play button to view the
          hash painting for each word.
        </p>
        {isEditing ? (
          <textarea
            style={{
              width: "100%",
              height: "calc(80vh - 10rem)",
              marginBottom: "1rem",
              padding: "1rem",
            }}
            onChange={(e) => {
              setText(e.target.value);
              setIsPlaying(false);
              setIndex(0);
            }}
            onBlur={() => {
              setIsEditing(false);
            }}
            onMouseOut={() => {
              setIsEditing(false);
            }}
            value={text}
          />
        ) : (
          <pre
            onClick={() => {
              setIsEditing(true);
            }}
            onMouseOver={() => {
              setIsEditing(true);
            }}
            style={{ width: "100%", height: "calc(80vh - 10rem)" }}
          >
            {zip(arr1, arr2, 0, index)}
            <span className={styles.currentWord}>
              {zip(arr1, arr2, index, index + 1)}
            </span>
            {zip(arr1, arr2, index + 1, arr1.length)}
          </pre>
        )}
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
          <button
            onClick={() => {
              setIndex(0);
              setIsPlaying(false);
            }}
            className={styles.resetButton}
          >
            Reset
          </button>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PixelGrid hash={hash} art={Art.verticalHexColor} size={size} />
      </div>
    </div>
  );
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

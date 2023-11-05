import React, { useState, useEffect } from "react";

import PixelGrid from "./PixelGrid";

interface Props {
  /**
   * displayRaw: optional boolean that will display
   * each character of the hash instead of a
   * stylized pixel
   */
  displayRaw?: boolean;
}

export default function AvatarGenerator({
  displayRaw = false,
}: Props): JSX.Element {
  const [text, setText] = useState<string>("");
  const [SHA256Hash, setSHA256Hash] = useState<string>("");
  const [blur, setBlur] = useState<string>(displayRaw ? "0" : "5");
  const [hueRotation, setHueRotation] = useState<string>("0");

  /**
   * Use this effect to convert the username text string
   * into a SHA256 hash, then we'll store a copy of it
   * in local component state.
   */
  useEffect(() => {
    async function getHashFromText(t: string) {
      const hash = await getSHA256Hash(t);
      setSHA256Hash(hash);
    }

    getHashFromText(text);
  }, [text]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        style={{ marginBottom: "1rem" }}
      />
      <PixelGrid
        sha256Hash={SHA256Hash}
        displayRaw={displayRaw}
        blur={blur}
        hueRotation={hueRotation}
      />
      {!displayRaw && (
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            width: "200px",
          }}
        >
          <label htmlFor="blur">Blur</label>
          <input
            id="blur"
            name="blur"
            value={blur}
            min="0"
            max="15"
            step="0.1"
            onChange={(e) => {
              setBlur(e.target.value);
            }}
            type="range"
          />
          <label htmlFor="hue">Hue Rotation</label>
          <input
            id="hue"
            name="hue"
            value={hueRotation}
            min="0"
            max="360"
            step="1"
            onChange={(e) => {
              setHueRotation(e.target.value);
            }}
            type="range"
          />
        </div>
      )}
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

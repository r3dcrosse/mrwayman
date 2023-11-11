import React from "react";
import styles from "./styles.module.css";

interface Props {
  /**
   * Hexadecimal values
   * 0-9
   * a-f (lowercased)
   */
  value: string;
}

const A = () => (
  <div className={styles.letter}>
    <div  style={{ backgroundColor: "red" }} />
    <div style={{ backgroundColor: "blue" }} />
  </div>
);
const B = () => (
  <div className={styles.letter}>
    <div  style={{ backgroundColor: "green" }} />
    <div style={{ backgroundColor: "cyan" }} />
  </div>
);
const C = () => (
  <div className={styles.letter}>
    <div style={{ backgroundColor: "orange" }} />
    <div style={{ backgroundColor: "yellow" }} />
  </div>
);
const D = () => (
  <div  className={styles.letter}>
    <div  style={{ backgroundColor: "purple" }} />
    <div  style={{ backgroundColor: "indigo" }} />
  </div>
);
const E = () => (
  <div className={styles.letter}>
    <div  style={{ backgroundColor: "green" }} />
    <div  style={{ backgroundColor: "yellow" }} />
  </div>
);
const F = () => (
  <div className={styles.letter}>
    <div  style={{ backgroundColor: "orange" }} />
    <div  style={{ backgroundColor: "blue" }} />
  </div>
);

const Zero = () => (
  <div className={styles.number}>
    <div style={{ backgroundColor: "lightseagreen" }} />
    <div style={{ backgroundColor: "lightgreen" }} />
  </div>
);
const One = () => (
  <div className={styles.number}>
    <div style={{ backgroundColor: "lemonchiffon" }} />
    <div style={{ backgroundColor: "lightcoral" }} />
  </div>
);
const Two = () => (
  <div className={styles.number}>
    <div style={{ backgroundColor: "gold" }} />
    <div style={{ backgroundColor: "hotpink" }} />
  </div>
);
const Three = () => (
  <div className={styles.number}>
    <div style={{ backgroundColor: "firebrick" }} />
    <div style={{ backgroundColor: "darkturquoise" }} />
  </div>
);
const Four = () => (
  <div className={styles.number}>
    <div style={{ backgroundColor: "deeppink" }} />
    <div style={{ backgroundColor: "darksalmon" }} />
  </div>
);
const Five = () => (
  <div className={styles.number}>
    <div style={{ backgroundColor: "darkkhaki" }} />
    <div style={{ backgroundColor: "darkred" }} />
  </div>
);
const Six = () => (
  <div className={styles.number}>
    <div style={{ backgroundColor: "cadetblue" }} />
    <div style={{ backgroundColor: "antiquewhite" }} />
  </div>
);
const Seven = () => (
  <div className={styles.number}>
    <div style={{ backgroundColor: "aliceblue" }} />
    <div style={{ backgroundColor: "aquamarine" }} />
  </div>
);
const Eight = () => (
  <div className={styles.number}>
    <div style={{ backgroundColor: "chartreuse" }} />
    <div style={{ backgroundColor: "crimson" }} />
  </div>
);
const Nine = () => (
  <div className={styles.number}>
    <div style={{ backgroundColor: "darkblue" }} />
    <div style={{ backgroundColor: "darkcyan" }} />
  </div>
);

// const B = () => <div />;
// const C = () => <div />;
// const D = () => <div />;
// const E = () => <div />;
// const F = () => <div />;

export default function StyledPixel({ value }: Props): JSX.Element {
  // Handle converting the hexadecimal number to it's component name
  switch (value) {
    case "0":
      return <Zero />;
    case "1":
      return <One />;
    case "2":
      return <Two />;
    case "3":
      return <Three />;
    case "4":
      return <Four />;
    case "5":
      return <Five />;
    case "6":
      return <Six />;
    case "7":
      return <Seven />;
    case "8":
      return <Eight />;
    case "9":
      return <Nine />;
    case "a":
      return <A />;
    case "b":
      return <B />;
    case "c":
      return <C />;
    case "d":
      return <D />;
    case "e":
      return <E />;
    case "f":
      return <F />;
    default:
      return null;
  }
}

// const Zero = () => <div />;
// const One = () => <div />;
// const Two = () => <div />;
// const Three = () => <div />;
// const Four = () => <div />;
// const Five = () => <div />;
// const Six = () => <div />;
// const Seven = () => <div />;
// const Eight = () => <div />;
// const Nine = () => <div />;

/**
 * 0 - blank space
 * 1 - filled in
 * 2 -
 * 3 -
 * 4 -
 * 5 -
 * 6 -
 * 7 -
 * 8 -
 * 9 -
 * a -
 * b -
 * c -
 * d -
 * e -
 * f -
 */

/**
 * 0 - blank space
 * 1 - filled in
 * 2 -
 * 3 -
 * 4 -
 * 5 -
 * 6 -
 * 7 -
 * 8 -
 * 9 -
 * a -
 * b -
 * c -
 * d -
 * e -
 * f -
 */

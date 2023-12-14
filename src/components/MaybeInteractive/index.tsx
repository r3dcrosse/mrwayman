import React from "react";

import ColorWheel from "../../../src/components/ColorWheel";

interface Props {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export default function MaybeInteractive({
  src,
  alt,
  children,
}: Props): JSX.Element {
  /**
   * Only render our interactive react component
   * if the following are true:
   *
   * 1) We know for sure we're in a browser environment
   * 2) We have JavaScript enabled
   *
   * This means by default, always display a GIF first.
   * Then if we have JavaScript, swap the GIF out
   * with our react component
   */
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    return <>{children}</>;
  }

  // By default we want to render an image or GIF
  return <img src={src} alt={alt} />;
}

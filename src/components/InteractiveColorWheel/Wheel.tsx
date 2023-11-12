interface Props {
  size?: number;
  style?: React.CSSProperties;
  square?: boolean;
  rotation?: string;
  gradient?: Gradient;
}

export enum Gradient {
  default = "default",
  rgb = "rgb",
  /**
   * Red, Green, Blue, White
   */
  rgbw = "rgbw",
  /**
   * Red, cyan, red, cyan
   */
  rcrc = "rcrc",
}

export const GradientMap = {
  [Gradient.default]: `conic-gradient(
    from 90deg,
    hsl(360, 100%, 50%),
    hsl(315, 100%, 50%),
    hsl(270, 100%, 50%),
    hsl(225, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(135, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(45, 100%, 50%),
    hsl(0, 100%, 50%)
  )`,
  [Gradient.rgb]: `conic-gradient(
    from 90deg,
    hsl(0, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(360, 100%, 50%)
  )`,
  [Gradient.rgbw]: `conic-gradient(
    from 90deg,
    hsl(0, 100%, 50%),
    hsl(0, 100%, 100%),
    hsl(240, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(360, 100%, 50%)
  )`,
  [Gradient.rcrc]: `conic-gradient(
    from 90deg,
    hsl(0, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(0, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(0, 100%, 50%)
  )`,
};

export default function Wheel({
  size = 300,
  style = {},
  square = false,
  rotation = "0",
  gradient = Gradient.default,
}: Props) {
  const getConicGradient = () => {
    return `conic-gradient(
                  from 90deg,
                  hsl(0, 100%, 50%),
                  hsl(180, 100%, 50%),
                  hsl(0, 100%, 50%),
                  hsl(180, 100%, 50%),
                  hsl(0, 100%, 50%)
              )`;
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: square ? 0 : "100%",
        // background: getConicGradient(),
        background: GradientMap[gradient],
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
    />
  );
}

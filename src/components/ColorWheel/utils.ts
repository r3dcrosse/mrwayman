export enum Quadrant {
  I = "I",
  II = "II",
  III = "III",
  IV = "IV",
}

export function getQuadrant(d: number): Quadrant {
  if (d >= 0 && d < 90) return Quadrant.I;
  if (d >= 90 && d < 180) return Quadrant.II;
  if (d >= 180 && d < 270) return Quadrant.III;
  if (d >= 270 && d < 360) return Quadrant.IV;
  if (d < 0 && d > -90) return Quadrant.IV;
  if (d <= -90 && d > -180) return Quadrant.III;
}

export type Point = [number, number];

/**
 * Break up a circle into four quadrants going counter-clockwise
 */
export const hslColorQuadrant: Record<Quadrant, Point> = {
  [Quadrant.I]: [0, 90],
  [Quadrant.II]: [90, 180],
  [Quadrant.III]: [180, 270],
  [Quadrant.IV]: [270, 360],
};

/**
 * Create a custom map of where on the HSL color wheel
 * we'd like our colors to transition from/to.
 * 
 * Combining this with the hslColorQuadrant we can produce
 * a color map such as:
 * 
 * 1) at 0 degrees on the wheel, display hsl(60deg, 100%, 50%)
 * 2) at 90 degrees on the wheel, display hsl(180deg, 100%, 50%)
 * 3) at 180 degrees on the wheel, display hsl(280deg, 100%, 50%)
 * ... and so on
 */
export const hslToCustomColorQuadrant: Record<Quadrant, Point> = {
  [Quadrant.I]: [60, 180],
  [Quadrant.II]: [180, 280],
  [Quadrant.III]: [280, 360],
  [Quadrant.IV]: [0, 60],
};

export function radToDegrees(r: number): number {
  // formula for converting radians to degrees
  return r * (180 / Math.PI);
}

export function degreesToRad(d: number): number {
  // formula for converting degrees to radians
  return d * (Math.PI / 180);
}

export function normalizeDegrees(d: number): number {
  // Handle normalizing degrees of a circle
  // so we don't use negative degrees
  return d < 0 ? (d += 360) : d;
}

export function linearInterpolation(
  x: number,
  hsl: Point,
  custom: Point
): number {
  // We need to take the two different color quadrants
  // and calculate a linear interpolation between the two
  const p1: Point = [hsl[0], custom[0]];
  const p2: Point = [hsl[1], custom[1]];

  /**
   *     y₂-y₁
   * m = -----
   *     x₂-x₁
   */
  const deltaY = p2[1] - p1[1];
  const deltaX = p2[0] - p1[0];
  const m = deltaY / deltaX;
  const b = p1[1] - parseFloat(m.toFixed(20)) * p1[0];

  // Using y = mx + b
  return parseFloat(m.toFixed(20)) * x + parseFloat(b.toFixed(20));
}

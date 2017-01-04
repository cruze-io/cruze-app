/**
 * distance.js
 * Get the distance between 2 points
 */

export const DISTANCE = {
  getDistance: (x1, y1, x2, y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  }
}

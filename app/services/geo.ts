
/**
 * Converts a decimal degree value to its equivalent in Degrees, Minutes, Seconds (DMS) format.
 *
 * @param decimal - The decimal degree value to convert.
 * @param type - The type of coordinate; 'lat' for latitude or 'lon' for longitude, which determines the directional indicator (N, S, E, W).
 * @returns The coordinate formatted as a string in DMS notation with the appropriate directional orientation.
 */
export function toDMS(decimal: number, type: 'lat' | 'lon'): string {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutesFull = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFull);
  const seconds = Math.floor(((minutesFull - minutes) * 60));

  let direction = '';
  if (type === 'lat') {
    direction = decimal >= 0 ? 'N' : 'S';
  } else if (type === 'lon') {
    direction = decimal >= 0 ? 'E' : 'W';
  }

  return `${degrees}°${minutes}'${seconds}"${direction}`;
}
// Final reference: a black key is 60% of a white key, centred on its boundary.
export function keyGeometry(index: number, white: boolean, whiteCount: number) {
  return { left: `${(index - (white ? 0 : .3)) / whiteCount * 100}%`, width: `${(white ? 1 : .6) / whiteCount * 100}%` };
}

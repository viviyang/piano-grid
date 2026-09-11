import type { ScaleDirection, ScaleHand, ScaleOption } from './scale-types';

export function scaleSequence(option: ScaleOption, hand: ScaleHand, direction: ScaleDirection) {
  if (direction !== 'up_down') return option.sequences[hand][direction];
  const ascending = option.sequences[hand].ascending;
  const descending = option.sequences[hand].descending;
  const sharesApex = ascending.at(-1)?.midi === descending[0]?.midi;
  return [...ascending, ...(sharesApex ? descending.slice(1) : descending)];
}

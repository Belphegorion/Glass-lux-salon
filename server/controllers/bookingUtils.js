// helper to determine overlap between two intervals [start,end)
export function overlaps(aStart, aEnd, bStart, bEnd){
  return (aStart < bEnd) && (bStart < aEnd);
}

import { overlaps } from '../controllers/bookingUtils.js';

test('overlap simple', () => {
  const aStart = new Date('2025-09-05T10:00:00');
  const aEnd = new Date('2025-09-05T11:00:00');
  const bStart = new Date('2025-09-05T10:30:00');
  const bEnd = new Date('2025-09-05T11:30:00');
  expect(overlaps(aStart,aEnd,bStart,bEnd)).toBe(true);
});

test('no overlap adjacent', () => {
  const aStart = new Date('2025-09-05T10:00:00');
  const aEnd = new Date('2025-09-05T11:00:00');
  const bStart = new Date('2025-09-05T11:00:00');
  const bEnd = new Date('2025-09-05T12:00:00');
  expect(overlaps(aStart,aEnd,bStart,bEnd)).toBe(false);
});

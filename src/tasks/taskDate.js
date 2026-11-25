export function parseTaskDate(value) {
  let parts;
  if (Array.isArray(value)) {
    parts = value.slice(0, 3).map(Number);
  } else if (typeof value === 'string') {
    const match = /^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/.exec(value);
    if (match) parts = match.slice(1).map(Number);
  } else if (value instanceof Date && !Number.isNaN(value.getTime())) {
    parts = [value.getFullYear(), value.getMonth() + 1, value.getDate()];
  }

  if (!parts || parts.length !== 3 || parts.some((part) => !Number.isInteger(part))) return null;
  const [year, month, day] = parts;
  if (year < 100 || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

export function formatTaskDate(value) {
  const date = parseTaskDate(value);
  if (!date) return value == null || value === '' ? 'Date unavailable' : 'Invalid date';
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

export function compareTaskDatesDescending(first, second) {
  const firstDate = parseTaskDate(first);
  const secondDate = parseTaskDate(second);
  if (!firstDate) return secondDate ? 1 : 0;
  if (!secondDate) return -1;
  return secondDate.getTime() - firstDate.getTime();
}

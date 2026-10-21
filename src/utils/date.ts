// Format a Date as 'YYYY-MM-DD' using LOCAL time (not UTC)
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const todayKey = (): string => toDateKey(new Date());

export const daysFromToday = (offset = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return toDateKey(date);
};

// Parse 'YYYY-MM-DD' as a local date (new Date('2026-10-21') would be read as UTC)
export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function daysBetween(fromKey: string, toKey: string): number {
  const ms = parseDateKey(toKey).getTime() - parseDateKey(fromKey).getTime();
  return Math.round(ms / 86_400_000);
}

export const formatDateKey = (key: string): string =>
  parseDateKey(key).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

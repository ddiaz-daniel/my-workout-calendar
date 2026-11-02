const pad = (n: number) => String(n).padStart(2, '0');

/** Local-time 'YYYY-MM-DD' (not UTC). */
export function toLocalDateKey(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

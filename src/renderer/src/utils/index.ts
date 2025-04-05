export function formatDuring(mss: number): string {
  const minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor((mss % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, '0')
  return `${minutes}:${seconds}`
}

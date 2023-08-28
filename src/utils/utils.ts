export function wait(): Promise<void> {
  return new Promise((res) => setTimeout(res, 1000))
}

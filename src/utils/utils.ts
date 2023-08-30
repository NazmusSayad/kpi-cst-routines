export function wait(): Promise<void> {
  return new Promise((res) => setTimeout(res, 1000))
}

export function download(link: string, name: string) {
  const a = document.createElement('a')
  a.href = link
  a.download = name
  a.click()
}

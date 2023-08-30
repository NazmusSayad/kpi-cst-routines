import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import getHTML from '@/src/utils/getHTML'
import { fonts } from '@/src/config'

export default async (req: any, res: any) => {
  for (let font of fonts) {
    await chromium.font(font)
  }

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath:
      process.env.NODE_ENV === 'development'
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        : await chromium.executablePath(),
    headless: true,
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setContent(getHTML(req.body || {}))

  const element = await page.$('main')
  const output =
    element && (await element.screenshot({ encoding: 'base64', type: 'png' }))

  res.send('data:image/png;base64,' + output)
  await browser.close()
}

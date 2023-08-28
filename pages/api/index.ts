import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import getHTML from '@/src/utils/getHTML'
import { wait } from '@/src/utils/utils'

chromium.setHeadlessMode = true
chromium.setGraphicsMode = false

export default async (req: any, res: any) => {
  const html = getHTML(req.body)
  console.log(html)

  await chromium.font(
    'https://github.com/hmoazzem/bangla-fonts/raw/master/kalpurush%20ANSI.ttf'
  )

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: true,
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setContent(html)
  await wait()

  const element = await page.$('main')
  const output =
    element && (await element.screenshot({ encoding: 'base64', type: 'png' }))

  res.send('data:image/png;base64,' + output)
  await browser.close()
}

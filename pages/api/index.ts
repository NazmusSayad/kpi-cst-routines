import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import getHTML from '@/src/utils/getHTML'

import rubikNormal from '!!file-loader!@/src/fonts/rubik/Rubik-Regular.ttf'
import rubikMedium from '!!file-loader!@/src/fonts/rubik/Rubik-Medium.ttf'
import rubikBold from '!!file-loader!@/src/fonts/rubik/Rubik-Bold.ttf'

import notoNormal from '!!file-loader!@/src/fonts/noto-sans-bangla/NotoSansBengali-Regular.ttf'
import notoMedium from '!!file-loader!@/src/fonts/noto-sans-bangla/NotoSansBengali-Medium.ttf'
import notoBold from '!!file-loader!@/src/fonts/noto-sans-bangla/NotoSansBengali-Bold.ttf'

export default async (req: any, res: any) => {
  await chromium.font(rubikNormal)
  await chromium.font(rubikMedium)
  await chromium.font(rubikBold)

  await chromium.font(notoNormal)
  await chromium.font(notoMedium)
  await chromium.font(notoBold)

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

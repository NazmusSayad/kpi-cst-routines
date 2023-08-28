import { Data } from '@/src/features/Input'
import getTemplate from '@/src/utils/getTemplate'

import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

chromium.setHeadlessMode = true
chromium.setGraphicsMode = false

export default async (req: any, res: any) => {
  const template = getTemplate()
  const html = template.replace(
    '<!-- CONTENT -->',
    Object.entries(req.body as Data)
      .map(([name, subjects]) =>
        subjects.length
          ? `
        <section>
          <h3>${name}</h3>

          <table>
            <tbody>
              <tr>
                <th>সময়</th>
                <th>বিষয়</th>
                <th>রুম</th>
              </tr>
              ${subjects
                .map(
                  ({ startTime, name, room }) => `
                    <tr>
                      <td>${startTime}</td>
                      <td>${name}</td>
                      <td>${room}</td>
                    </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </section>`
          : ''
      )
      .join('')
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

  const element = await page.$('main')
  const output =
    element && (await element.screenshot({ encoding: 'base64', type: 'png' }))

  res.send('data:image/png;base64,' + output)
  await browser.close()
}

import { Data } from '@/src/features/Input'
import getTemplate from '@/src/utils/getTemplate'
import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

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

  /*   const stats = await PCR()
  const browser = await stats.puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
    executablePath: stats.executablePath,
  }) */

  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
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

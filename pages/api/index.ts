import puppeteer from 'puppeteer'
import { Data } from '@/src/features/Input'
import getTemplate from '@/src/utils/getTemplate'

export default async function (req: Request, res: any) {
  const template = getTemplate()
  const html = template.replace(/<script>(.|\s)*<\/script>/, '').replace(
    '<!-- CONTENT -->',
    Object.entries(req.body as unknown as Data)
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

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.setContent(html)

  const element = await page.$('main')
  const output =
    element && (await element.screenshot({ encoding: 'base64', type: 'png' }))

  res.send('data:image/png;base64,' + output)
  await browser.close()
}

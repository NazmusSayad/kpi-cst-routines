import * as fs from 'fs'
import { Data } from '../features/Input'

export default function (data: Data) {
  const template = fs.readFileSync('./template.html', 'utf-8')

  return template.replace(
    '<!-- CONTENT -->',
    Object.entries(data)
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
}

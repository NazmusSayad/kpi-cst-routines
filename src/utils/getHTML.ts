import { Data, days } from '../config'
import template from '!!raw-loader!@/src/template.html'

export default function (data: Data) {
  const sections = days.map((day) => {
    const subjects = data[day]
    if (!(subjects && subjects.length)) return ''

    return `
    <section>
      <h3>${day}</h3>

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
  })

  return template.replace(
    /(<!--START-->)(.|\s)*?(<!--END-->)/,
    sections.join('')
  )
}

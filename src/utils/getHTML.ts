import { Data } from '../config'

export default function (data: Data) {
  const template = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
  
      <style>
        html {
          font-size: 500%;
        }
  
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600&display=swap');
  
        body {
          font-family: 'Rubik', sans-serif;
          text-align: center;
          margin: 0;
        }
  
        main {
          padding: 0.5rem;
          font-size: 0.8rem;
        }
  
        section {
          --clr-base: black;
          border-block: solid 0.05rem black;
          padding-bottom: 0.3rem;
        }
  
        section:first-child {
          border-top: none;
        }
        section:last-child {
          border-bottom: none;
        }
  
        h3,
        th {
          font-family: 'Noto Sans Bengali', sans-serif;
        }
  
        h3 {
          margin-block: 0.33rem;
        }
  
        table {
          width: 100%;
          border-spacing: 0;
          text-align: center;
          color: white;
        }
  
        table,
        tr,
        td {
          border: solid 0.01rem var(--clr-base);
        }
  
        td,
        th {
          padding: 0.2em;
        }
  
        tr th:nth-child(1),
        tr td:nth-child(1),
        tr th:nth-child(3),
        tr td:nth-child(3) {
          width: 6rem;
        }
  
        th {
          font-weight: 600;
        }
  
        tr:first-child {
          background-color: var(--clr-base);
        }
  
        tr:not(:first-child):nth-child(even) {
          background-color: color-mix(
            in srgb,
            var(--clr-base) 25%,
            #00000000 100%
          );
        }
  
        tr:not(:first-child) {
          color: black;
        }
  
        tr td:first-child {
          font-weight: 500;
        }
  
        section:nth-child(1) {
          --clr-base: #4574c6;
        }
        section:nth-child(2) {
          --clr-base: #ef7d34;
        }
        section:nth-child(3) {
          --clr-base: #70ad46;
        }
        section:nth-child(4) {
          --clr-base: #ffc000;
        }
        section:nth-child(5) {
          --clr-base: #010101;
        }
      </style>
    </head>
    <body>
      <main>
        <!-- CONTENT -->
      </main>
    </body>
  </html>`

  return template.replace(
    '<!-- CONTENT -->',
    Object.entries(data)
      .map(([name, subjects]) =>
        subjects.length
          ? `
        <section>
          <h3>${name || 'Boom'}</h3>

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
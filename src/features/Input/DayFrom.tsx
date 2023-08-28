import { Button } from '@/src/components/Button'
import css from './DayFrom.module.scss'
import { SubjectData } from '@/src/config'

const DayFrom = ({
  name,
  subjects,
  setModal,
  deleteSubject,
  getPicture,
}: {
  name: string
  subjects: SubjectData[]
  deleteSubject: Function
  setModal: Function
  getPicture: Function
}) => {
  return (
    <div className={css.dayForm}>
      <h2 className={css.heading}>{name}</h2>

      <table className={css.table}>
        <tbody>
          <tr>
            <th>Start</th>
            <th>Name</th>
            <th>Room</th>
            <th>-</th>
          </tr>

          {subjects.map((subject, ind) => (
            <tr key={subject.startTime + Math.random()}>
              <td>{subject.startTime}</td>
              <td>{subject.name}</td>
              <td>{subject.room}</td>
              <td>
                <button onClick={() => deleteSubject(name, ind)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={css.actions}>
        <Button onClick={() => setModal(name)}>Add</Button>
        <Button onClick={() => getPicture()}>Preview</Button>
      </div>
    </div>
  )
}

export default DayFrom

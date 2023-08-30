import { Button } from '@/src/components/Button'
import css from './DayFrom.module.scss'
import { SubjectData } from '@/src/config'
import Trash from '@/src/icons/Trash'
import Copy from '@/src/icons/Copy'

const DayFrom = ({
  name,
  subjects,
  setModal,
  deleteSubject,
  getPicture,
  addSubject,
}: {
  name: string
  subjects: SubjectData[]
  deleteSubject: Function
  setModal: Function
  getPicture: Function
  addSubject: Function
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
              <td className={css.buttons}>
                <Button onClick={() => addSubject(name, subject)}>
                  <Copy />
                </Button>
                <Button
                  className={css.red}
                  onClick={() => deleteSubject(name, ind)}
                >
                  <Trash />
                </Button>
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

import Dialog from '@/src/components/Dialog'
import css from './AddSubjectForm.module.scss'
import { Button } from '@/src/components/Button'

const AddSubjectForm = ({
  name,
  close,
  addSubject,
}: {
  name: string
  close: any
  addSubject: Function
}) => {
  function handleForm(e: any) {
    addSubject(name, {
      name: e.target.name.value,
      startTime: e.target.startTime.value,
      room: e.target.room.value,
    })
  }

  return (
    <Dialog
      open
      className={css.dialog}
      backdropClassName={css.backdrop}
      rootClassName={css.root}
    >
      <header className={css.header}>
        <div className={css.wrapper}>
          <h2>{name}</h2>

          <button type="button" onClick={close}>
            Close me
          </button>
        </div>
      </header>

      <form
        className={css.form}
        onSubmit={(e) => (e.preventDefault(), handleForm(e))}
      >
        <div className={css.wrapper}>
          <div className={css.group}>
            <p>Subject Name:</p>
            <input required type="text" name="name" placeholder="eg: Physics" />
          </div>

          <div className={css.group}>
            <p>Starting Time:</p>
            <input
              required
              type="time"
              name="startTime"
              placeholder="eg: 10:00"
            />
          </div>

          <div className={css.group}>
            <p>Room no:</p>
            <input required type="text" name="room" placeholder="3005" />
          </div>

          <Button className={css.button}>Save</Button>
        </div>
      </form>
    </Dialog>
  )
}

export default AddSubjectForm

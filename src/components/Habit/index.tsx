import { IDataFromDb } from '../../interfaces/datafromdb'
import './styles.scss'

interface IProps {
  data: IDataFromDb
  handleRemoveHabit: (key: string) => Promise<void>
}

export function Habit({ handleRemoveHabit, data }: IProps) {
  const { icone, name, key }: IDataFromDb = data

  return (
    <div className="habit" title={name} data-name={name}>
      <span className="remove" onClick={() => handleRemoveHabit(key)}>
        x
      </span>
      {icone}
    </div>
  )
}

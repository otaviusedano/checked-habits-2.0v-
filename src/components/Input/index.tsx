import { IHabitSimple } from '../../interfaces/habitSimple'
import './styles.scss'

interface IProps {
  setHabit: (habit: IHabitSimple) => void
  placeholder: string
  isMenuActive?: string
}

export function Input({ setHabit, placeholder, isMenuActive }: IProps) {
  return (
    <input
      className={`input ${isMenuActive}`}
      type="text"
      placeholder={placeholder}
      onChange={(e) => setHabit({ name: e.target.value })}
    />
  )
}

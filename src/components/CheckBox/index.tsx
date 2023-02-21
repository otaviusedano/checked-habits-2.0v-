import './styles.scss'

interface IProps {
  daysCheckeds: string[]
  today: string
  handleUpdateDay: () => Promise<void>
}

export function CheckBox({ handleUpdateDay, daysCheckeds, today }: IProps) {
  return (
    <input
      className="checkBox"
      type="checkbox"
      checked={daysCheckeds.indexOf(today) !== -1 ? true : false}
      onChange={() => handleUpdateDay()}
    ></input>
  )
}

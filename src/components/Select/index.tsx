import './styles.scss'

export function Select ({children, setIconeSelected}: any) {

  return (
    <select onChange={(e) => setIconeSelected(e.target.value)}>
      {children}
    </select>
  )
}
import './styles.scss'

export function Habit ({children, name}: any) {  

  return (
    <div className='habit' title={name} data-name={name}>
      {children}
    </div>
  )
}
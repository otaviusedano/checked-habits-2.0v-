import './styles.scss'

export function ContainerHabits ({children}: any) {
  return (
    <div className='habits'>
      {children}
    </div>
  )
}
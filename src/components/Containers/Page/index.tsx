import './styles.scss'

export function ContainerPage ({children}: any) {
  return (
    <div className='page'>
      {children}
    </div>
  )
}
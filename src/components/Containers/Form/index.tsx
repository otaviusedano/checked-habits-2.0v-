import './styles.scss'

export function Form ({children}: any) {


  
  return (
    <form className='form'>
      {children}
    </form>
  )
}
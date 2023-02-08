import './styles.scss'

export function Button ({children, onClick, icone}: any) {
  return (
    <button className='button' data-testid="button" onClick={onClick}>
      {icone ? <img src={icone} alt="icone" /> : ''}
      {
        children 
        ?
          <span>{children}</span>
        : 
          ''
      }
    </button>
  )
}
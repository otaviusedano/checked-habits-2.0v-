import { PropsWithChildren } from 'react'
import './styles.scss'

interface IProps {
  children?: PropsWithChildren | any
  onClick: () => void
  icone?: string
  isMenuActive?: string
}

export function Button({ children, onClick, icone, isMenuActive }: IProps) {
  return (
    <button
      className={`button ${isMenuActive}`}
      data-testid="button"
      onClick={onClick}
    >
      {icone ? <img src={icone} alt="icone" /> : ''}
      {children ? <span>{children}</span> : ''}
    </button>
  )
}

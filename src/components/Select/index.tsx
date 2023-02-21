import { PropsWithChildren, ReactNode } from 'react'
import './styles.scss'

interface IProps {
  children?: PropsWithChildren | any
  setIconeSelected: (iconeSelected: string) => void
  isMenuActive?: string
}

export function Select({ children, setIconeSelected, isMenuActive }: IProps) {
  return (
    <select
      className={isMenuActive}
      onChange={(e) => setIconeSelected(e.target.value)}
    >
      {children}
    </select>
  )
}

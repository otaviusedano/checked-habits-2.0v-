import { PropsWithChildren } from 'react'
import './styles.scss'

interface IProps {
  children?: PropsWithChildren | any
  isMenuActive?: string
}

export function ContainerAddHabit({ children, isMenuActive }: IProps) {
  return <div className={`addHabit ${isMenuActive}`}>{children}</div>
}

import { PropsWithChildren } from 'react'
import './styles.scss'

export function ContainerDays({ children }: PropsWithChildren) {
  return <div className="days">{children}</div>
}

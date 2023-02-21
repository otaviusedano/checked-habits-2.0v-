import { PropsWithChildren } from 'react'
import './styles.scss'

export function ContainerDay({ children }: PropsWithChildren) {
  return <div className="day">{children}</div>
}

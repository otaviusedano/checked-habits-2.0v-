import { PropsWithChildren } from 'react'
import './styles.scss'

export function ContainerHabits({ children }: PropsWithChildren) {
  return <div className="habits">{children}</div>
}

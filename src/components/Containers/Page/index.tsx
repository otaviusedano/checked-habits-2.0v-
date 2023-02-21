import { PropsWithChildren } from 'react'
import './styles.scss'

export function ContainerPage({ children }: PropsWithChildren) {
  return <div className="page">{children}</div>
}

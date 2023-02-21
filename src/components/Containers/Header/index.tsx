import { PropsWithChildren } from 'react'
import './styles.scss'

export function ContainerHeader({ children }: PropsWithChildren) {
  return <header>{children}</header>
}

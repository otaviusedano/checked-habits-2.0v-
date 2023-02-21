import { PropsWithChildren } from 'react'
import './styles.scss'

export function Option({ children }: PropsWithChildren) {
  return <option>{children}</option>
}

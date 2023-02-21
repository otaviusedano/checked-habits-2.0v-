import { PropsWithChildren } from 'react'
import './styles.scss'

export function Form({ children }: PropsWithChildren) {
  return <form className="form">{children}</form>
}

import {
  PropsWithChildren,
  ReactElement,
  ValidationMap,
  WeakValidationMap,
} from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/authProvider'

export const ProtectedRoute = ({
  children,
}: PropsWithChildren | JSX.Element | any) => {
  const { user }: any = UserAuth()

  if (!user) {
    return <Navigate to="/signIn" />
  }

  return children
}

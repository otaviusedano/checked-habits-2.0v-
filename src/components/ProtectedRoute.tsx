import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/authProvider';

export const ProtectedRoute = ({ children }:any) => {
  const { user }: any = UserAuth();

  console.log(user);

  if (!user) {
    return <Navigate to='/signIn' />;
  }

  return children;
};

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { setDoc, doc } from 'firebase/firestore';

import { auth, db } from '../services/firebase'

export const AuthContext = createContext({})

export function AuthProvider({children}: any) {
  const [user, setUser] = useState(null)
  const [msgError, setMsgError] = useState('')
  let isEmailExist = false
  let isUserExist = false

  function signIn(email: string, pwd: string) {
    signInWithEmailAndPassword(auth, email, pwd).catch(() => {
      isUserExist = true
      setMsgError('Email ou senha invalido')
    })
  }

  const createUser = async (user: string,email: string, password: string) => {

    return createUserWithEmailAndPassword(auth, email, password).then(async cred => {
      await setDoc(doc(db, "users", cred.user.uid), {
        name: user,
        email: email,
        pwd: password
      })
    }).catch((e) => isEmailExist === true)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{auth, signIn, logout, user, createUser, isEmailExist, msgError, isUserExist}}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}


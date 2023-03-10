import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'

import { ContainerHeader } from '../Containers/Header'
import { ContainerAddHabit } from '../Containers/addHabit'
import { UserAuth } from '../../context/authProvider'
import { Button } from '../Button'
import { Logo } from '../Logo'
import { db } from '../../services/firebase'
import { Select } from '../Select'
import { Option } from '../Option'
import { Input } from '../Input'
import plus from '../../assets/plus.svg'

import './styles.scss'
import { MenuIcon } from '../MenuIcon'
import { Menu } from '../Menu'
import { IHabitSimple } from '../../interfaces/habitSimple'

interface IProps {
  setRecordedDays: (recordedDays: string[]) => void
  setVeryfied: (veryfied: boolean) => void
}

interface IUserAuth {
  logout: () => Promise<void>
}

export function Header({ setRecordedDays, setVeryfied }: IProps) {
  const icones = [' ', '👽', '🕴️', '🎻', '🧘', '📕', '✍️', '🗣️']

  const [iconeSelected, setIconeSelected] = useState<string>('')

  const [habit, setHabit] = useState<IHabitSimple>({
    name: '',
  })

  const [logOut, setLogOut] = useState(false)

  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
    return
  }

  const { logout, user }: any = UserAuth()
  const today = new Date().toLocaleDateString('pt-br').slice(0, -5)

  async function handleRegisterDay() {
    let daysFromDB: string[] = []

    const qForRecordedDays = query(
      collection(db, 'recordedDays'),
      where('uid', '==', user.uid)
    )

    const querySnapshot = await getDocs(qForRecordedDays)
    querySnapshot.forEach((data) => {
      daysFromDB.push(...data.data().days)
    })

    const todayAlreadyRegistered = daysFromDB.includes(today)

    if (!todayAlreadyRegistered) {
      await addDoc(collection(db, 'recordedDays'), {
        days: [today],
        createdAt: serverTimestamp(),
        uid: user.uid,
      })
      setRecordedDays([today])
      setVeryfied(true)
      return
    }

    return
  }

  async function handleAddHabit() {
    if (!iconeSelected || !habit.name) {
      return
    }

    await addDoc(collection(db, 'habits'), {
      habit: habit.name,
      dayCreated: today,
      daysCheckeds: [],
      icone: iconeSelected,
      uid: user.uid,
    })

    setVeryfied(true)
    return
  }

  const handleLogOut = () => {
    logout()
    setLogOut(true)
    return
  }

  return (
    <ContainerHeader>
      {logOut && <Navigate to="/signIn" replace={true} />}
      <Logo />
      <MenuIcon handleOpenMenu={handleOpenMenu} />
      {openMenu ? (
        <Menu
          onClick={handleOpenMenu}
          icones={icones}
          plus={plus}
          handleLogOut={handleLogOut}
          handleRegisterDay={handleRegisterDay}
          handleAddHabit={handleAddHabit}
          setHabit={setHabit}
          setIconeSelected={setIconeSelected}
        />
      ) : (
        ''
      )}
      <ContainerAddHabit>
        <Select setIconeSelected={setIconeSelected}>
          {icones.map((i: string) => (
            <Option key={i}>{i}</Option>
          ))}
        </Select>
        <Input setHabit={setHabit} placeholder="Add Name" />
        <Button icone={plus} onClick={handleAddHabit}></Button>
      </ContainerAddHabit>
      <Button icone={plus} onClick={handleRegisterDay}>
        Registrar o meu dia
      </Button>
      <Button onClick={handleLogOut}>LogOut</Button>
    </ContainerHeader>
  )
}

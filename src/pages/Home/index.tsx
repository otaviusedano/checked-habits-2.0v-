import { SetStateAction, useEffect, useState } from 'react'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'

import { UserAuth } from '../../context/authProvider'
import { db } from '../../services/firebase'
import { ContainerPage } from '../../components/Containers/Page'
import { Habit } from '../../components/Habit'
import { ContainerDay } from '../../components/Containers/Day'
import { ContainerDays } from '../../components/Containers/Days'
import { CheckBox } from '../../components/CheckBox'
import { ContainerHabits } from '../../components/Containers/Habits'
import { Header } from '../../components/Header'
import { Form } from '../../components/Containers/Form'
import { DateCheck } from '../../components/DateCheck'
import { IDataFromDb } from '../../interfaces/datafromdb'

import './styles.scss'

export default function Home() {
  const [dataFromDB, setDataFromDB] = useState<IDataFromDb[]>([])
  const [veryfied, setVeryfied] = useState<boolean>()
  const [recordedDays, setRecordedDays] = useState<string[]>()

  const { user }: any = UserAuth()

  const getDocsFromDB = async () => {
    let days: string[] = []
    let datas: IDataFromDb[] | any = []

    const qForHabits = query(
      collection(db, 'habits'),
      where('uid', '==', user.uid)
    )

    const qForRecordedDays = query(
      collection(db, 'recordedDays'),
      where('uid', '==', user.uid),
      orderBy('createdAt')
    )

    const querySnapshotForHabits = await getDocs(qForHabits)
    const querySnapshotForRecordedDays = await getDocs(qForRecordedDays)

    querySnapshotForHabits.forEach((doc) => {
      return datas.push({
        ...doc.data(),
        key: doc.id,
      })
    })

    querySnapshotForRecordedDays.forEach((doc) => {
      doc.data().days.map((day: string) => {
        days.push(day)
      })
    })

    setRecordedDays(days)

    setDataFromDB(datas)

    return
  }

  const handleUpdateDay = async (data: IDataFromDb, today: string) => {
    const habitsRef = doc(db, 'habits', data.key)
    const isDayChecked = data.daysCheckeds.includes(today)

    let days: string[] = data.daysCheckeds

    if (!isDayChecked) {
      days.push(today)
    } else {
      days = days.filter((day: string) => day != today)
    }

    await updateDoc(habitsRef, {
      daysCheckeds: days,
    })

    setDataFromDB((current: IDataFromDb[]) => {
      let indexToChange = current.indexOf(data)

      current[indexToChange].daysCheckeds = days

      return [...current]
    })

    return
  }

  const handleRemoveHabit = async (key: string) => {
    await deleteDoc(doc(db, 'habits', key))

    setVeryfied(true)
    return
  }

  useEffect(() => {
    getDocsFromDB()
    setVeryfied(false)

    return
  }, [veryfied === true])

  return (
    <ContainerPage>
      <Header setRecordedDays={setRecordedDays} setVeryfied={setVeryfied} />
      <Form>
        <ContainerHabits>
          {dataFromDB?.length > 0
            ? dataFromDB?.map((data: IDataFromDb) => (
                <Habit
                  data={data}
                  handleRemoveHabit={handleRemoveHabit}
                  key={data.key}
                ></Habit>
              ))
            : ''}
        </ContainerHabits>
        <ContainerDays>
          {dataFromDB?.length > 0
            ? recordedDays?.map((day: string) => (
                <ContainerDay key={day}>
                  <DateCheck key={day} date={day} />
                  {dataFromDB?.map((data: IDataFromDb) => (
                    <CheckBox
                      key={data.key}
                      handleUpdateDay={() => handleUpdateDay(data, day)}
                      daysCheckeds={data.daysCheckeds}
                      today={day}
                    />
                  ))}
                </ContainerDay>
              ))
            : ''}
        </ContainerDays>
      </Form>
    </ContainerPage>
  )
}

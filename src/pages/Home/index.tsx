import { SetStateAction, useEffect, useState } from "react"
import { collection, doc, getDocs, query, updateDoc, where, orderBy } from "firebase/firestore"

import { UserAuth } from "../../context/authProvider"
import { db } from "../../services/firebase"
import { ContainerPage } from "../../components/Containers/Page"
import { Habit } from "../../components/Habit"
import { ContainerDay } from "../../components/Containers/Day"
import { ContainerDays } from "../../components/Containers/Days"
import { CheckBox } from "../../components/CheckBox"
import { ContainerHabits } from "../../components/Containers/Habits"
import { Header } from "../../components/Header"
import { Form } from "../../components/Containers/Form"
import { DateCheck } from "../../components/DateCheck"

import './styles.scss'

export default function Home() {
  const [ dataFromDB, setDataFromDB ] = useState<any>()
  const [ veryfied, setVeryfied ] = useState<boolean>()
  const [ recordedDays, setRecordedDays ] = useState <SetStateAction<any>>()

  const { user }: any = UserAuth()

  const getDocsFromDB = async () => {

    let days: any[] = []
    let datas: any[] = []

    const qForHabits = query(collection(db, "habits"), where("uid", "==", user.uid));
    const qForRecordedDays = query(collection(db, "recordedDays"), where("uid", "==", user.uid), orderBy('createdAt'))

    const querySnapshotForHabits = await getDocs(qForHabits)
    const querySnapshotForRecordedDays = await getDocs(qForRecordedDays)

    querySnapshotForHabits.forEach((doc) => {
      datas.push({
        ...doc.data(),
        key: doc.id
      })
    })

    querySnapshotForRecordedDays.forEach((doc) => {
      doc.data().days.map((day: any) => {
        days.push(day)
      })
    })

    setRecordedDays(days)

    setDataFromDB(datas)

    return
  }

  const onChange = async (data: any, today: any) => {
    const habitsRef = doc(db, "habits", data.key);
    const isDayChecked = data.daysCheckeds.includes(today)

    let days: any[] = data.daysCheckeds

    if (!isDayChecked) {
      days.push(today)
    } else {
      days = days.filter((day: any) => day != today)
    }

    await updateDoc(habitsRef, {
      daysCheckeds: days
    })

    setDataFromDB((current: any) => {
      let indexToChange = current.indexOf(data)

      current[indexToChange].daysCheckeds = days

      return [...current]
    })

    return
  }

  useEffect(() => {
    getDocsFromDB()
    setVeryfied(false)

    return
  }, [veryfied === true])

  return (
    <ContainerPage>
      <Header setRecordedDays={setRecordedDays} setVeryfied={setVeryfied}/>
      <Form>
        <ContainerHabits>
          {
            dataFromDB?.length > 0
            ?
              dataFromDB.map((data: any) => <Habit key={data.key} name={data.habit}>{data.icone}</Habit>)
            :
              ''
          }
        </ContainerHabits>
        <ContainerDays>
            {
              dataFromDB?.length > 0
              ?
                recordedDays?.map((day: any) =>
                  <ContainerDay key={day}>
                    <DateCheck key={day} date={day} />
                    {dataFromDB.map((data: any) =>
                      <CheckBox
                          key={data.key}
                          onChange={() => onChange(data, day)}
                          daysCheckeds={data.daysCheckeds}
                          today={day}
                        />
                    )}
                  </ContainerDay>)
              :
                ''
            }
        </ContainerDays>
      </Form>
    </ContainerPage>
  )
}


import { IoIosClose } from 'react-icons/io'
import { Button } from '../Button'
import { ContainerAddHabit } from '../Containers/addHabit'
import { Input } from '../Input'
import { Select } from '../Select'
import { Option } from '../Option'
import './styles.scss'
import { IHabitSimple } from '../../interfaces/habitSimple'

interface IMenu {
  onClick: () => void
  icones: string[]
  setIconeSelected: (iconeSelected: string) => void
  setHabit: (habit: IHabitSimple) => void
  handleAddHabit: () => void
  plus: string
  handleRegisterDay: () => void
  handleLogOut: () => void
}

export function Menu({
  onClick,
  icones,
  setIconeSelected,
  setHabit,
  handleAddHabit,
  plus,
  handleRegisterDay,
  handleLogOut,
}: IMenu) {
  return (
    <div className="overlay">
      <div className="menu">
        <div className="container__header-menu">
          <h1>Menu</h1>
          <IoIosClose
            onClick={() => onClick()}
            fontSize={50}
            color={'cd2424'}
          />
        </div>
        <div className="container__options">
          <ContainerAddHabit isMenuActive="isMenuActive">
            <Select
              isMenuActive="isMenuActive"
              setIconeSelected={setIconeSelected}
            >
              {icones.map((i: string) => (
                <Option key={i}>{i}</Option>
              ))}
            </Select>
            <Input
              isMenuActive="isMenuActive"
              setHabit={setHabit}
              placeholder="Add Name"
            />
            <Button
              isMenuActive="isMenuActive"
              icone={plus}
              onClick={handleAddHabit}
            ></Button>
          </ContainerAddHabit>
          <Button
            isMenuActive="isMenuActive"
            icone={plus}
            onClick={handleRegisterDay}
          >
            Registrar o meu dia
          </Button>
          <Button isMenuActive="isMenuActive" onClick={handleLogOut}>
            LogOut
          </Button>
        </div>
      </div>
    </div>
  )
}

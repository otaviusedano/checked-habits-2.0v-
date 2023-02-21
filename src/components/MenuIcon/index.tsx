import { IoIosMenu } from 'react-icons/io'

import './styles.scss'

interface IProps {
  handleOpenMenu: () => void
}

export function MenuIcon({ handleOpenMenu }: IProps) {
  return (
    <div onClick={() => handleOpenMenu()} className="menuIcon">
      <IoIosMenu color="#f1f1f1f1" fontSize={40} />
    </div>
  )
}

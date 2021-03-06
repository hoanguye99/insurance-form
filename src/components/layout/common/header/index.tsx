import PopUp from 'components/common/pop-up'
import Portal from 'components/common/portal'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from 'styles/components/layout/header.module.scss'

interface HeaderProps {
  data: {
    link: string
    icon: JSX.Element
    text: string
  }[]
  handleLogoutButton: () => void
}

const Header = (props: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  return (
    <div className="lg:hidden">
      {showMenu && (
        <Portal className="top-[70px]">
          <PopUp
            onClickOutside={() => setShowMenu(false)}
            optionalRef={menuRef}
          >
            <div className="fixed top-20 inset-x-3 bg-white animate-popup rounded-xl">
              <MobileMenu setShowMenu={setShowMenu} {...props}></MobileMenu>
            </div>
          </PopUp>
        </Portal>
      )}
      <div
        ref={menuRef}
        className="fixed inset-x-0 top-0 w-full h-[70px] bg-white lg:hidden"
      >
        <div className="container flex items-center justify-between">
          <div className="w-[230px] h-[70px] flex items-center">
            <button className=" w-[120px] h-[40px] bg-left-top bg-no-repeat bg-contain bg-[url('../utils/assets/images/FPT_logo_2010.svg.png')]">
              <p className='font-["Muli-ExtraBold"] text-blue-500 text-xl ml-12'>
                BH
              </p>
            </button>
          </div>
          <div
            onClick={() => setShowMenu((prev) => !prev)}
            className={showMenu ? styles['open'] : styles['toggle']}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MobileMenuProps extends HeaderProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileMenu = (props: MobileMenuProps) => {
  return (
    <div className="p-8 bg-white rounded-lg flex flex-col items-center gap-6">
      {props.data.map((item, index) => (
        <MenuItem key={index} setShowMenu={props.setShowMenu} {...item}></MenuItem>
      ))}
      <button
        className="py-3 text-gray-500 hover:text-black text-sm"
        onClick={props.handleLogoutButton}
      >
        ????ng xu???t
      </button>
    </div>
  )
}

interface MenuItemProps {
  link: string
  icon: JSX.Element
  text: string
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <button onClick={() => props.setShowMenu(false)} className="block group">
      <Link className="inline-block w-full py-3 " to={props.link}>
        <div className="flex items-center text-gray-500 group-hover:text-black text-sm ">
          {/* {props.icon} */}
          <span className="ml-2 text-link-tab">{props.text}</span>
        </div>
      </Link>
    </button>
  )
}

export default Header

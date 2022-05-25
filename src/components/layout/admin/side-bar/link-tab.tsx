import React from 'react'
import { Link } from 'react-router-dom'

interface LinkTabProps {
  link: string
  icon: React.ReactNode
  text: string
  selected: boolean
}

const LinkTab = (props: LinkTabProps) => {
  return (
    <li
      className={`block group ${
        props.selected ? 'bg-[#f3f4f6] border-l-[3px] border-l-blue-500 border-r' : ''
      }`}
    >
      <Link className="inline-block w-full py-3 px-[25px]" to={props.link}>
        <div className={`flex items-center text-gray-500 group-hover:text-black text-sm ${props.selected ? '!text-black' : ''}`}>
          {props.icon}
          <span className="ml-2 text-link-tab">{props.text}</span>
        </div>
      </Link>
    </li>
  )
}

export default LinkTab

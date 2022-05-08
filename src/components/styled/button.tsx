import React from 'react'

interface ButtonProps {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={` w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${props.className}`}
    >
      {props.children}
    </button>
  )
}

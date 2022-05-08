import React from 'react'

interface InputProps {
  type?: string
  name?: string
  id?: string
  placeholder?: string
  className?: string
}

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={` block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${props.className}`}
    />
  )
}

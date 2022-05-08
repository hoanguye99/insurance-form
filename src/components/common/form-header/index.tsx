import React from 'react'

interface FormHeaderProps {
  header: string
  extra: string
}

const FormHeader = (props: FormHeaderProps) => {
  return (
    <>
      <h3 className="text-lg md:text-2xl font-['Muli-ExtraBold'] leading-6 text-gray-900">
        {props.header}
      </h3>
      <p className="mt-3 text-sm text-gray-600">{props.extra}</p>
    </>
  )
}

export default FormHeader

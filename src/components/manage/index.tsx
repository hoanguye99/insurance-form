import React from 'react'

const Manage = () => {
  return <div className="container mx-auto">
    <div className="grid grid-cols-9">
      <TableHeader></TableHeader>
    </div>
  </div>
}

const TableHeader= () => {
  return (
    <>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
    </>
  )
}

export default Manage

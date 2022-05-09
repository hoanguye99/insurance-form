import { Input, Label } from 'components/styled'
import React from 'react'

const VehicleInfoForm = () => {
  return (
    <form action="#" method="POST">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6 gap-y-8">

            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="fromDate">Ngày bắt đầu</Label>
              <Input type="date" name="fromDate" id="fromDate" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="toDate">Ngày kết thúc</Label>
              <Input type="date" name="toDate" id="toDate" />
            </div>

          </div>
        </div>
      </div>
    </form>
  )
}

export default VehicleInfoForm

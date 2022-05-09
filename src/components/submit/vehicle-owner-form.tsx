import { Input, Label } from 'components/styled'
import React from 'react'

const VehicleOwnerForm = () => {
  return (
    <form action="#" method="POST">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6 gap-y-8">
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="employee-name">Tên nhân viên</Label>
              <Input type="text" name="employee-name" id="employee-name" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="account-mail">Account Mail</Label>
              <Input type="email" name="account-mail" id="account-mail" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="vehicle-owner-name">Tên chủ xe</Label>
              <Input type="text" name="vehicle-owner-name" id="vehicle-owner-name" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="vehicle-license-plate">Số biển kiểm soát</Label>
              <Input type="text" name="vehicle-license-plate" id="vehicle-license-plate" />
            </div>

          </div>
        </div>
      </div>
    </form>
  )
}

export default VehicleOwnerForm

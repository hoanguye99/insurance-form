import { Input, Label } from 'components/styled'
import { CreateOrderFormData } from 'models/api/order-api'
import React from 'react'
import { useForm } from 'react-hook-form'
import { UseFormRegister } from 'react-hook-form'

interface VehicleOwnerFormProps {
  register: UseFormRegister<CreateOrderFormData>
}

const VehicleOwnerForm = (props: VehicleOwnerFormProps) => {
  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6 gap-y-4">

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="vehicle-owner-name">Tên chủ xe</Label>
            <Input<CreateOrderFormData>
              type="text"
              name="vehicle-owner-name"
              id="vehicle-owner-name"
              register={props.register}
              label="ownerName"
              required={true}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input<CreateOrderFormData>
              type="text"
              name="address"
              id="address"
              register={props.register}
              label="address"
              required={true}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="vehicle-license-plate">Số biển kiểm soát</Label>
            <Input<CreateOrderFormData>
              type="text"
              name="vehicle-license-plate"
              id="vehicle-license-plate"
              register={props.register}
              label="plate"
              required={true}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="vehicle-engine-number">Số máy</Label>
            <Input<CreateOrderFormData>
              type="text"
              name="vehicle-engine-number"
              id="vehicle-engine-number"
              register={props.register}
              label="engineNo"
              required={true}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="vehicle-chassis-number">Số khung</Label>
            <Input<CreateOrderFormData>
              type="text"
              name="vehicle-chassis-number"
              id="vehicle-chassis-number"
              register={props.register}
              label="chassisNo"
              required={true}
            />
          </div>



        </div>
      </div>
    </div>
  )
}

export default VehicleOwnerForm

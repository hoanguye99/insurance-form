import { Input, Label } from 'components/styled'
import { CreateOrderFormData } from 'models/api/order-api'
import { UseFormRegister } from 'react-hook-form'

export type VehicleInfoFormData = {
  fromDate: string
  toDate: string
}

interface VehicleInfoFormProps {
  register: UseFormRegister<CreateOrderFormData>
}

const VehicleInfoForm = (props: VehicleInfoFormProps) => {
  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 bg-white sm:p-6">
        
        <p className="text-base font-['Muli-ExtraBold'] text-gray-900 mb-6">
          Thời hạn hiệu lực
        </p>

        <div className="grid grid-cols-6 gap-6 gap-y-8">
          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="fromDate">Ngày bắt đầu</Label>
            <Input<CreateOrderFormData>
              type="date"
              name="fromDate"
              id="fromDate"
              register={props.register}
              label="startDate"
              required={true}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="toDate">Ngày kết thúc</Label>
            <Input<CreateOrderFormData>
              type="date"
              name="toDate"
              id="toDate"
              register={props.register}
              label="endDate"
              required={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleInfoForm

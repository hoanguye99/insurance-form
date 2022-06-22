import orderApi from 'api/order-api'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { getAllOrdersAsync } from 'features/order/order-list-slice'
import { selectProductList } from 'features/product/product-list-slice'
import { InsuranceOrder } from 'models/api'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  ActionButtons,
  EditFormHeader,
  ItemSection,
} from '../common/pure-functions'

interface OrderEditModalProps extends InsuranceOrder {
  onExit: () => void
}

const OrderEditModal = (props: OrderEditModalProps) => {
  const dispatch = useAppDispatch()
  const userDetail = useAppSelector(selectUserDetail)
  const productList = useAppSelector(selectProductList)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InsuranceOrder>({
    defaultValues: {
      typeCode: props.typeCode,
      ownerName: props.ownerName,
      address: props.address,
      plate: props.plate,
      startDate: props.startDate,
      endDate: props.endDate,
      engineNo: props.engineNo,
      chassisNo: props.chassisNo,
    },
  })

  const handleFormSubmit: SubmitHandler<InsuranceOrder> = async (data) => {
    try {
      props.onExit()
      if ('insTypes' in productList) {
        productList.insTypes.forEach((item) => {
          if (item.name === data.typeCode) {
            data.typeCode = item.code
          }
        })
      }
      const response = await orderApi.updateInsuranceOrder(
        props.id,
        data,
        userDetail
      )
      dispatch(getAllOrdersAsync())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="p-6 flex flex-col">
        <EditFormHeader />
        <div className="flex justify-between gap-5">
          <div className="flex flex-col gap-3">
            <ItemSection<InsuranceOrder>
              label="Chủ xe"
              register={register}
              formLabel="ownerName"
            ></ItemSection>
            <ItemSection<InsuranceOrder>
              type="date"
              label="Ngày bắt đầu CNBH"
              register={register}
              formLabel="startDate"
            ></ItemSection>

            {/* <div className="flex flex-col gap-0 w-full">
              <label className="uppercase text-gray-700 opacity-70 font-['Muli-ExtraBold'] text-xs">
                Loại bảo hiểm
              </label>
              <select
                className="h-[48px] block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                {...register('typeCode', { required: true })}
              >
                {productList.insTypes.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            */}
            <ItemSection<InsuranceOrder>
              label="Biển số"
              register={register}
              formLabel="plate"
            ></ItemSection>
            <ItemSection<InsuranceOrder>
              label="Số khung"
              register={register}
              formLabel="chassisNo"
            ></ItemSection>
          </div>
          <div className="flex flex-col gap-3 items-end text-right">
            <ItemSection<InsuranceOrder>
              label="Địa chỉ"
              register={register}
              formLabel="address"
            ></ItemSection>

            <ItemSection<InsuranceOrder>
              type="date"
              label="Ngày kết thúc CNBH"
              register={register}
              formLabel="endDate"
            ></ItemSection>

            <ItemSection<InsuranceOrder>
              label="Số máy"
              register={register}
              formLabel="engineNo"
            ></ItemSection>
          </div>
        </div>
        <ActionButtons {...props}></ActionButtons>
      </div>
    </form>
  )
}

export default OrderEditModal

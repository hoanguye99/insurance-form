import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Button } from 'components/styled'
import { updateOrderGroup } from 'features/order/order-group-slice'
import { selectProductList } from 'features/product/product-list-slice'
import { CreateOrderFormData, GetAllProductTypeResponse } from 'models/api'
import { Path, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface OrderEditModalProps extends CreateOrderFormData {
  onExit: () => void
}

const OrderEditModal = (props: OrderEditModalProps) => {
  const productList = useAppSelector(
    selectProductList
  ) as GetAllProductTypeResponse
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrderFormData>({
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


  const handleFormSubmit: SubmitHandler<CreateOrderFormData> = async (data) => {
    dispatch(updateOrderGroup(data))
    props.onExit()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="p-6 flex flex-col">
        <div className="pt-1 pb-14 flex justify-center items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <div className="font-['Muli-ExtraBold'] font-thin text-2xl">
            Chỉnh sửa
          </div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex flex-col gap-3">
            <ItemSection<CreateOrderFormData>
              label="Chủ xe"
              register={register}
              formLabel="ownerName"
            ></ItemSection>
            <ItemSection<CreateOrderFormData>
              label="Địa chỉ"
              register={register}
              formLabel="address"
            ></ItemSection>

            <div className="flex flex-col gap-0 w-full">
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

            <ItemSection<CreateOrderFormData>
              label="Biển số"
              register={register}
              formLabel="plate"
            ></ItemSection>
          </div>
          <div className="flex flex-col gap-3 items-end text-right">
            <ItemSection<CreateOrderFormData>
              type="date"
              label="Ngày bắt đầu CNBH"
              register={register}
              formLabel="startDate"
            ></ItemSection>
            <ItemSection<CreateOrderFormData>
              type="date"
              label="Ngày kết thúc CNBH"
              register={register}
              formLabel="endDate"
            ></ItemSection>
            <ItemSection<CreateOrderFormData>
              label="Số khung"
              register={register}
              formLabel="chassisNo"
            ></ItemSection>
            <ItemSection<CreateOrderFormData>
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

interface ItemSectionProps<T> {
  type?: string
  label: string
  register: UseFormRegister<T>
  formLabel: Path<T>
}

function ItemSection<T>(props: ItemSectionProps<T>) {
  return (
    <div className="flex flex-col gap-0 w-full">
      <label className="uppercase text-gray-700 opacity-70 font-['Muli-ExtraBold'] text-xs">
        {props.label}
      </label>
      <input
        type={props.type}
        {...props.register(props.formLabel, { required: true })}
        className="h-[48px] block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
      />
    </div>
  )
}

interface ActionButtonsProps extends OrderEditModalProps {}
const ActionButtons = (props: ActionButtonsProps) => {
  let navigate = useNavigate()

  function handleBackButtonClick() {
    props.onExit()
  }

  return (
    <div className="mt-12 flex justify-between items-center">
      <Button
        onClick={handleBackButtonClick}
        className="w-fit bg-gray-600 hover:bg-gray-500 focus:bg-gray-400 focus:ring-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
      </Button>
      <Button>Sửa</Button>
    </div>
  )
}

export default OrderEditModal

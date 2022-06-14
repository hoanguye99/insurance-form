import { Button } from 'components/styled'
import { CreateOrderFormData } from 'models/api'
import { useNavigate } from 'react-router-dom'

interface OrderEditModalProps extends CreateOrderFormData {
  onExit: () => void
}

const OrderEditModal = (props: OrderEditModalProps) => {
  return (
    <div className="p-6 flex flex-col">
      <div className="pt-4 pb-10 flex flex-col items-center">
        <div className="font-['Muli-ExtraBold'] font-thin text-2xl">
          Bảo hiểm {props.typeCode}
        </div>
        <div className="text-xl">{props.plate}</div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <ItemSection label="Chủ xe" value={props.ownerName}></ItemSection>
          <ItemSection label="Địa chỉ" value={props.address}></ItemSection>
          <ItemSection label="Tổng tiền" value="25.000đ"></ItemSection>
        </div>
        <div className="flex flex-col gap-3 items-end text-right">
          <ItemSection
            label="Ngày bắt đầu CNBH"
            value={props.startDate}
          ></ItemSection>
          <ItemSection
            label="Ngày kết thúc CNBH"
            value={props.endDate}
          ></ItemSection>
          <ItemSection label="Số khung" value={props.chassisNo}></ItemSection>
          <ItemSection label="Số máy" value={props.engineNo}></ItemSection>
        </div>
      </div>
      <ActionButtons {...props}></ActionButtons>
    </div>
  )
}

interface ItemSectionProps {
  label: string
  value: string | number
}

const ItemSection = (props: ItemSectionProps) => {
  return (
    <div className="flex flex-col gap-0">
      <label className="uppercase text-gray-400 opacity-70 font-['Muli-ExtraBold'] text-xs">
        {props.label}
      </label>
      <div className="font-extrabold">{props.value}</div>
    </div>
  )
}

interface ActionButtonsProps extends OrderEditModalProps {}
const ActionButtons = (props: ActionButtonsProps) => {
  let navigate = useNavigate()

  function handleBackButtonClick() {
    props.onExit()
    navigate('/submit/individual')
  }

  function handleOrdersButtonClick() {
    props.onExit()
    navigate('/orders')
  }

  return (
    <div className="mt-12 flex justify-between items-center">
      <Button onClick={handleBackButtonClick}>Quay lại</Button>
      <Button onClick={handleOrdersButtonClick}>Đơn hàng</Button>
    </div>
  )
}

export default OrderEditModal

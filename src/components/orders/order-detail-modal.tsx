import { Button } from 'components/styled'
import { InsuranceOrder } from 'models/api'
import { OrderStatus } from 'models/components/common'
import React from 'react'

interface OrderDetailModalProps extends InsuranceOrder {
  onExit: () => void
}

const OrderDetailModal = (props: OrderDetailModalProps) => {
  return (
    <div className="p-6 flex flex-col">
      <div className="pt-4 pb-10 flex flex-col items-center">
        <Status status={props.status}></Status>
        <div className="font-['Muli-ExtraBold'] font-thin text-2xl">Bảo hiểm {props.typeCode}</div>
        <div className="text-xl">{props.plate}</div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <ItemSection label="Account Mail" value="HoangND25"></ItemSection>
          <ItemSection label="Chủ xe" value={props.ownerName}></ItemSection>
          <ItemSection label="Địa chỉ" value={props.address}></ItemSection>
          <ItemSection label="Tổng tiền" value="25.000đ"></ItemSection>
        </div>
        <div className="flex flex-col gap-3 items-end text-right">
          <ItemSection label="Ngày bắt đầu CNBH" value={props.startDate}></ItemSection>
          <ItemSection label="Ngày kết thúc CNBH" value={props.endDate}></ItemSection>
          <ItemSection label="Số khung" value={props.chassisNo}></ItemSection>
          <ItemSection label="Số máy" value={props.engineNo}></ItemSection>
        </div>
      </div>
      <div className='mt-12 flex justify-end items-center'>
        <Button onClick={props.onExit} className="w-fit">Xong</Button>
      </div>
    </div>
  )
}

interface ItemSectionProps {
  label: string
  value: string | number
}

const ItemSection = (props: ItemSectionProps) => {
  return (
    <div className='flex flex-col gap-0'>
      <label className="uppercase text-gray-400 opacity-70 font-['Muli-ExtraBold'] text-xs">{props.label}</label>
      <div className="font-extrabold">{props.value}</div>
    </div>
  )
}

interface StatusProps {
  status: number
}

const Status = (props: StatusProps) => {
  switch (props.status) {
    case OrderStatus.APPROVED:
      return (
        <div className="w-fit mx-auto font-['Muli-ExtraBold'] p-3 text-xl rounded mb-4 text-green-500 bg-green-200">
          Approved
        </div>
      )
    case OrderStatus.PENDING:
      return (
        <div className="w-fit mx-auto font-['Muli-ExtraBold'] p-3 text-xl rounded mb-4 text-yellow-500 bg-yellow-50">
          Pending
        </div>
      )
    case OrderStatus.REJECTED:
      return (
        <div className="w-fit mx-auto font-['Muli-ExtraBold'] p-3 text-xl rounded mb-4 text-red-500 bg-red-50">
          Rejected
        </div>
      )
  }
  return <></>
}

export default OrderDetailModal

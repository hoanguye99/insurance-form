import { useAppDispatch, useAppSelector } from 'app/hooks'
import FormHeader from 'components/common/form-header'
import {
  getAllProductTypesAsync,
  selectProductList,
} from 'features/product/product-list-slice'
import React, { useEffect, useState } from 'react'
import OptionForm from './option-form'
import VehicleInfoForm from './vehicle-info-form'
import VehicleOwnerForm from './vehicle-owner-form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CreateOrderFormData } from 'models/api/order-api'
import { selectUserDetail } from 'features/auth/user-login-slice'
import orderApi from 'api/order-api'
import { Button } from 'components/styled'
import { Section, Separator } from '../common'

type IndividualProps = {}

const Individual = (props: IndividualProps) => {
  const productList = useAppSelector(selectProductList)
  const userDetail = useAppSelector(selectUserDetail)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrderFormData>()

  useEffect(() => {
    if (Object.keys(productList).length === 0) {
      dispatch(getAllProductTypesAsync())
    }
  }, [productList])

  const handleFormSubmit: SubmitHandler<CreateOrderFormData> = async (data) => {
    data.startDate = data.startDate.split('-').join('')
    data.endDate = data.endDate.split('-').join('')
    try {
      const res = orderApi.createInsuranceOrder(data, userDetail)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-[#f3f4f6]">
      <div className=" container mx-auto pb-10">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Section
            className="pt-0"
            header={<FormHeader header="Thông tin xe và chủ xe" extra="" />}
          >
            <VehicleOwnerForm register={register} />
          </Section>

          <Separator />

          <Section
            header={
              <FormHeader
                header="Thời hạn hiệu lực của giấy CNBH"
                extra="(365 ngày bao gồm cả ngày bắt đầu và ngày kết thúc)"
              />
            }
          >
            <VehicleInfoForm register={register} />
          </Section>

          <Separator />

          <Section
            header={
              <FormHeader header="Loại hình bảo hiểm đăng ký và phí" extra="" />
            }
          >
            <OptionForm register={register} />
          </Section>

          <Separator />

          <Section className="pt-0" header={<></>}>
            <div className="flex justify-end">
              <Button className="w-fit">Gửi</Button>
            </div>
          </Section>
        </form>
      </div>
    </div>
  )
}

export default Individual

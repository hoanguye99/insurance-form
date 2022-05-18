import { useAppDispatch, useAppSelector } from 'app/hooks'
import FormHeader from 'components/common/form-header'
import {
  getAllProductTypesAsync,
  selectProductList,
} from 'features/product/product-list-slice'
import React, { useEffect } from 'react'
import OptionForm from './option-form'
import VehicleInfoForm from './vehicle-info-form'
import VehicleOwnerForm from './vehicle-owner-form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CreateOrderFormData } from 'models/api/order-api'
import { selectUserDetail } from 'features/auth/user-login-slice'
import orderApi from 'api/order-api'

const Submit = () => {
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
    data.startDate = data.startDate.split("-").join('')
    data.endDate = data.endDate.split("-").join('')
    try {
      const res = orderApi.createInsuranceOrder(data, userDetail)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-[#f3f4f6]">
      <div className=" container mx-auto sm:pt-10 pb-10">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Section
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
        </form>
      </div>
    </div>
  )
}

interface SectionProps {
  header: React.ReactNode
  children: React.ReactNode
}

const Section = (props: SectionProps) => {
  return (
    <div className="pt-10 sm:pt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">{props.header}</div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">{props.children}</div>
      </div>
    </div>
  )
}

const Separator = () => {
  return (
    <div className="hidden sm:block " aria-hidden="true">
      <div className="py-5">
        <div className="border-t border-gray-200" />
      </div>
    </div>
  )
}

export default Submit

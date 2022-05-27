import { useAppDispatch, useAppSelector } from 'app/hooks'
import OrderDetailModal from 'components/common/order-view-table/order-detail-modal'
import PopUp from 'components/common/pop-up'
import Portal from 'components/common/portal'
import { Button } from 'components/styled'
import FormHeader from 'components/submit/individual/form-header'
import { createOrderAsync } from 'features/order/order-create-slice'
import {
  getAllProductTypesAsync,
  selectProductList,
} from 'features/product/product-list-slice'
import { CreateOrderFormData, InsuranceOrder } from 'models/api'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Section, Separator } from '../common'
import { useCreateOrderState } from './hooks'
import OptionForm from './option-form'
import VehicleInfoForm from './vehicle-info-form'
import VehicleOwnerForm from './vehicle-owner-form'

type IndividualProps = {}

const Individual = (props: IndividualProps) => {
  const productList = useAppSelector(selectProductList)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateOrderFormData>()

  const {
    showDetailModal,
    closeDetailModal,
    orderCreateResponse,
    posting,
    showErrorModal,
    closeErrorModal,
    failureDescription,
  } = useCreateOrderState(reset)

  useEffect(() => {
    if (Object.keys(productList).length === 0) {
      dispatch(getAllProductTypesAsync())
    }
  }, [productList])

  const handleFormSubmit: SubmitHandler<CreateOrderFormData> = async (data) => {
    dispatch(createOrderAsync(data))
  }

  return (
    <>
      {showDetailModal && (
        <Portal>
          <div className="fixed inset-0 bg-black opacity-40 flex justify-center items-center animate-opacity "></div>
          <PopUp onClickOutside={() => {}}>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
              <OrderDetailModal
                onExit={() => closeDetailModal()}
                {...(orderCreateResponse as InsuranceOrder)}
              ></OrderDetailModal>
            </div>
          </PopUp>
        </Portal>
      )}

      {showErrorModal && (
        <Portal>
          <div className="fixed inset-0 bg-black opacity-40 flex justify-center items-center animate-opacity "></div>
          <PopUp onClickOutside={() => {}}>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
              <div className="flex flex-col p-6 gap-12">
                <p className="mx-auto text-red-600">{failureDescription}</p>
                <div className="flex justify-between items-center">
                  <Button onClick={() => closeErrorModal()}>Quay lại</Button>
                  <div></div>
                </div>
              </div>
            </div>
          </PopUp>
        </Portal>
      )}

      <div className="bg-[#f3f4f6]">
        <div className=" container mx-auto pb-10">
          <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
            Đăng kí cá nhân
          </p>
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
                <FormHeader
                  header="Loại hình bảo hiểm đăng ký và phí"
                  extra=""
                />
              }
            >
              <OptionForm register={register} />
            </Section>

            <Separator />

            <Section className="pt-0" header={<></>}>
              <div className="flex justify-end">
                <Button className="w-fit" posting={posting}>
                  Gửi
                </Button>
              </div>
            </Section>
          </form>
        </div>
      </div>
    </>
  )
}

export default Individual

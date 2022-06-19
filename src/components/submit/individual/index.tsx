import { useAppDispatch, useAppSelector } from 'app/hooks'
import OrderDetailModal from 'components/common/order-view-table/common/order-detail-modal'
import PopUp from 'components/common/pop-up'
import Portal from 'components/common/portal'
import { Button } from 'components/styled'
import { createOrderAsync } from 'features/order/order-create-slice'
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

  const handleFormSubmit: SubmitHandler<CreateOrderFormData> = async (data) => {
    dispatch(createOrderAsync(data))
  }

  return (
    <>
      {showDetailModal && (
        <DetailModal
          closeDetailModal={closeDetailModal}
          orderCreateResponse={orderCreateResponse}
        ></DetailModal>
      )}

      {showErrorModal && (
        <ErrorModal
          failureDescription={failureDescription}
          closeErrorModal={closeErrorModal}
        ></ErrorModal>
      )}

      <div className="bg-[#f3f4f6]">
        <div className=" container mx-auto pb-10">
          <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
            Đăng kí cá nhân
          </p>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Section className="pt-0">
              <VehicleOwnerForm register={register} />
            </Section>

            <Separator />

            <Section>
              <VehicleInfoForm register={register} />
            </Section>

            <Separator />

            <Section>
              <OptionForm register={register} />
            </Section>

            <Section>
              <div className="flex justify-end pt-7">
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

interface DetailModalProps {
  closeDetailModal: () => void
  orderCreateResponse: {} | InsuranceOrder
}

export const DetailModal = (props: DetailModalProps) => {
  return (
    <Portal>
      <PopUp onClickOutside={() => {}}>
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
          <OrderDetailModal
            onExit={() => props.closeDetailModal()}
            {...(props.orderCreateResponse as InsuranceOrder)}
          ></OrderDetailModal>
        </div>
      </PopUp>
    </Portal>
  )
}

interface ErrorModalProps {
  failureDescription: string
  closeErrorModal: () => void
}

export const ErrorModal = (props: ErrorModalProps) => {
  return (
    <Portal>
      <PopUp onClickOutside={() => {}}>
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
          <div className="flex flex-col p-6 gap-12">
            <p className="mx-auto text-red-600">{props.failureDescription}</p>
            <div className="flex justify-between items-center">
              <Button
                onClick={() => props.closeErrorModal()}
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
              <div></div>
            </div>
          </div>
        </div>
      </PopUp>
    </Portal>
  )
}

export default Individual

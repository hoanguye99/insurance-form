import { useAppDispatch } from 'app/hooks'
import { Button } from 'components/styled'
import { createOrderAsync } from 'features/order/order-create-slice'
import { CreateOrderFormData, ImageUploadResponse } from 'models/api'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Section, Separator } from '../common'
import { DetailModal, ErrorModal } from '../individual'
import { useCreateOrderState } from '../individual/hooks'
import OptionForm from '../individual/option-form'
import VehicleInfoForm from '../individual/vehicle-info-form'
import VehicleOwnerForm from '../individual/vehicle-owner-form'

interface ImageFormProps {
  data: ImageUploadResponse
}

const ImageForm = (props: ImageFormProps) => {
  if ('errorMessage' in props.data) {
    return <div className="">{props.data.errorMessage}</div>
  }
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateOrderFormData>({
    defaultValues: {
      ownerName: props.data.info.name,
      address: props.data.info.address,
      plate: props.data.info.plate_number,
      engineNo: props.data.info.engine_number,
      chassisNo: props.data.info.chassis_number,
    },
  })

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
    </>
  )
}

export default ImageForm

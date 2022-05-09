import FormHeader from 'components/common/form-header'
import React from 'react'
import OptionForm from './option-form'
import VehicleInfoForm from './vehicle-info-form'
import VehicleOwnerForm from './vehicle-owner-form'

const Submit = () => {
  return (
    <div className="bg-[#f3f4f6]">
      <div className=" container mx-auto sm:pt-10 pb-10">
        <Section
          header={<FormHeader header="Thông tin xe và chủ xe" extra="" />}
        >
          <VehicleOwnerForm />
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
          <VehicleInfoForm />
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
          <OptionForm />
        </Section>
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

import { useAppSelector } from 'app/hooks'
import { Button, Input, Label } from 'components/styled'
import { selectProductList } from 'features/product/product-list-slice'
import { GetAllProductTypeResponse, ProductType } from 'models/api'
import styles from 'styles/component/submit/option-form.module.scss'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CreateOrderFormData } from 'models/api/order-api'

interface OptionFormProps {
  register: UseFormRegister<CreateOrderFormData>
}

const OptionForm = (props: OptionFormProps) => {
  const productList = useAppSelector(
    selectProductList
  ) as GetAllProductTypeResponse
  return (
    productList.insTypes && (
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <legend className="text-base font-medium text-gray-900">
            Loại hình bảo hiểm
          </legend>

          <div className="mt-4 flex flex-col">
            {productList.insTypes.map((item) => (
              <Option key={item.id} {...item} register={props.register} />
            ))}
          </div>
        </div>

      </div>
    )
  )
}

interface OptionProps extends ProductType {
  register: UseFormRegister<CreateOrderFormData>
}

const Option = (props: OptionProps) => {
  return (
    <label
      htmlFor={props.code}
      className="flex hover:bg-gray-50 py-5 px-2 rounded-lg cursor-pointer"
    >
      <div className="flex items-center h-5">
        <input
          id={props.code}
          // name="insurance-option"
          type="radio"
          {...props.register('typeCode', { required:true })}
          value={props.code}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <div className="font-medium text-gray-700">{props.name}</div>
        <div
          className={styles.tempContainer}
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></div>
      </div>
    </label>
  )
}

export default OptionForm

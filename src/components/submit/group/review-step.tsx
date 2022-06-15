import { useAppDispatch } from 'app/hooks'
import OrderViewTable from 'components/common/order-view-table'
import ReviewTable from 'components/common/order-view-table/review-table'
import { Button } from 'components/styled'
import { resetOrderGroupCreate } from 'features/order/order-group-create-slice'
import { createOrderGroup, resetOrderGroup } from 'features/order/order-group-slice'
import { CreateGroupInsuranceOrderResponse } from 'models/api'

type ReviewStepProps = {
  orderGroupCreateResponse: CreateGroupInsuranceOrderResponse
}

const ReviewStep = (props: ReviewStepProps) => {
  const dispatch = useAppDispatch()
  return (
    <div>
      <div className="w-3/4 flex text-green-500 gap-3 mb-5 pb-5 border-b border-b-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p>Đơn Thành công</p>
      </div>
      <div className="overflow-x-auto">
        <OrderViewTable
          loadingStatus="idle"
          isTableEmpty={props.orderGroupCreateResponse.success.length === 0}
          TableEmpty={<TableEmpty />}
        >
          <ReviewTable data={props.orderGroupCreateResponse.success} />
        </OrderViewTable>
      </div>

      <div className=" w-3/4 flex text-red-500 gap-3 mt-5 mb-5 pb-5 border-b border-b-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <p>Đơn Thất bại</p>
      </div>

      <div className="overflow-x-auto">
        <OrderViewTable
          loadingStatus="idle"
          isTableEmpty={props.orderGroupCreateResponse.failed.length === 0}
          TableEmpty={<TableEmpty />}
        >
          <ReviewTable data={props.orderGroupCreateResponse.failed} />
        </OrderViewTable>
      </div>

      <div className="mt-12 mb-6 flex justify-between items-center">
        <Button
          onClick={() => {
            dispatch(resetOrderGroup())
            dispatch(resetOrderGroupCreate())
          }}
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

        {props.orderGroupCreateResponse.failed.length === 0 ? (
          <div></div>
        ) : (
          <Button
            onClick={() => {
              dispatch(resetOrderGroupCreate())
              dispatch(resetOrderGroup())
              dispatch(createOrderGroup(props.orderGroupCreateResponse.failed))
            }}
            className="w-fit"
          >
            Xem lại đơn lỗi
          </Button>
        )}
      </div>
    </div>
  )
}

const TableEmpty = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm w-fit m-auto flex flex-col items-center my-6 px-5 py-7">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-center font-thin text-base mt-4 mb-1 w-[8rem]">
        Trống
      </p>
    </div>
  )
}

export default ReviewStep

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Button } from 'components/styled'
import { createGroupOrderAsync } from 'features/order/order-group-create-slice'
import { createOrderGroup, selectOrderGroup } from 'features/order/order-group-slice'
import { CreateOrderFormData } from 'models/api'
import { FaFileCsv } from 'react-icons/fa'
import GroupOrderTable from './group-order-table'


type SubmitStepProps = {
  posting: boolean
}

const SubmitStep = (props: SubmitStepProps) => {

  const orderGroup = useAppSelector(selectOrderGroup)
  const dispatch = useAppDispatch()

  function showFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      if (e.target) {
        const text = e.target.result
        if (typeof text === 'string') {
          const [header, ...fileData] = text.split(/\r?\n/)
          const data = fileData.map((line) => {
            const selection = line.split(';')
            return {
              typeCode: selection[8],
              ownerName: selection[1],
              address: selection[7],
              plate: selection[2],
              startDate: selection[3],
              endDate: selection[4],
              engineNo: selection[5],
              chassisNo: selection[6],
            } as CreateOrderFormData
          })
          console.log(data)
          dispatch(createOrderGroup(data))
        }
        // alert(text)
      }
    }
    if (e && e.target && e.target.files) {
      reader.readAsText(e.target.files[0])
    }
  }

  return (
    <>
      <div className="flex gap-8 mb-6">
        <div className="flex flex-col items-center gap-2">
          <p className="mb-2 text-sm font-medium text-gray-900">
            Download file mẫu:
          </p>
          <a
            className="w-8 h-8 text-blue-500"
            href="/group-insurance-form.csv"
            download
          >
            <FaFileCsv size={32} />
          </a>
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="file_input"
          >
            Tải file CSV
          </label>
          <input
            className="block w-full text-sm px-3 py-1.5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={(e) => showFile(e)}
            accept=".csv"
          />
        </div>
      </div>

      <GroupOrderTable></GroupOrderTable>

      {orderGroup.length !== 0 && (
        <div className="mt-8 flex justify-end items-center gap-3">
          <p className="text-sm text-gray-500 text-opacity-60">
            Hãy kiểm tra lại thông tin trước khi gửi bạn nhé !
          </p>
          <Button
            onClick={() => dispatch(createGroupOrderAsync(orderGroup))}
            className="w-fit"
            posting={props.posting}
          >
            Gửi
          </Button>
        </div>
      )}
    </>
  )
}

export default SubmitStep

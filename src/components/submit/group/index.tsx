import { useAppDispatch } from 'app/hooks'
import { createOrderGroup } from 'features/order/order-group-slice'
import { CreateOrderFormData } from 'models/api'

type Props = {}

const Group = (props: Props) => {
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
          console.log(data);
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
    <div className="bg-[#f3f4f6]">
      <div className="container mx-auto">
        <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
          Đăng kí nhóm
        </p>
        <div>
          <p>This is the group form</p>
          <input type="file" onChange={(e) => showFile(e)} accept=".csv" />
        </div>
      </div>
    </div>
  )
}

export default Group

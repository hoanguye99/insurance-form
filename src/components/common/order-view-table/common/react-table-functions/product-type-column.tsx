import { useAppSelector } from 'app/hooks'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { selectProductList } from 'features/product/product-list-slice'
import { InsuranceOrder } from 'models/api'
import AdminActionButton from '../../admin-main-table/admin-action-button'
import UserActionButton from '../../user-main-table/user-action-button'

interface ProductTypeColumnProps {
  typeCode: string
}

const ProductTypeColumn = (props: ProductTypeColumnProps) => {
  const productList = useAppSelector(selectProductList)
  if ('insTypes' in productList) {
    const index = productList.insTypes.findIndex( prod => prod.name === props.typeCode)
    return (
      <div className="flex items-center gap-2">
        <img className="w-20 h-14" src={`${productList.insTypes[index].image}`} alt={`${props.typeCode} image`} />
        <p>{props.typeCode}</p>
      </div>
    )
  } else return <p>{props.typeCode}</p>
}

export default ProductTypeColumn

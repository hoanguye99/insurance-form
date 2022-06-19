import { useAppDispatch, useAppSelector } from "app/hooks"
import { getAllProductTypesAsync, selectProductList } from "features/product/product-list-slice"
import { useEffect } from "react"

export const useGetAllProductTypes = () => {
  const productList = useAppSelector(selectProductList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (Object.keys(productList).length === 0) {
      dispatch(getAllProductTypesAsync())
    }
  }, [productList])
}


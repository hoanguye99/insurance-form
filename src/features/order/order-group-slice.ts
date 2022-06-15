import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { CreateOrderFormData } from 'models/api'
import { OrderGroupState } from 'models/features/order-group-slice'

const initialState: OrderGroupState = {
  orderGroup: [],
}

const orderGroupSlice = createSlice({
  name: 'orderGroup',
  initialState,
  reducers: {
    resetOrderGroup: handleResetAction,
    createOrderGroup: handleCreateAction,
    updateOrderGroup: handleUpdateAction,
    deleteOrderGroup: handleDeleteAction,
  },
})

function handleResetAction(state: OrderGroupState) {
  state.orderGroup = []
}

function handleCreateAction(
  state: OrderGroupState,
  action: PayloadAction<CreateOrderFormData[]>
) {
  state.orderGroup = action.payload
}


function handleUpdateAction(
  state: OrderGroupState,
  action: PayloadAction<CreateOrderFormData>
) {
  const order = action.payload
  state.orderGroup = state.orderGroup.map((row) => {
    if (row.plate === order.plate) {
      return order
    }
    return row
  })
}

function handleDeleteAction(
  state: OrderGroupState,
  action: PayloadAction<string>
) {
  const plate = action.payload
  state.orderGroup = state.orderGroup.filter((row) => row.plate !== plate)
}

export const {
  resetOrderGroup,
  createOrderGroup,
  updateOrderGroup,
  deleteOrderGroup,
} = orderGroupSlice.actions

export const selectOrderGroup = (state: RootState) =>
  state.orderGroup.orderGroup

export const orderGroupReducer = orderGroupSlice.reducer

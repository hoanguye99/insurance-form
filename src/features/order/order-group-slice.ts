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

function handleCreateAction(state : OrderGroupState, action: PayloadAction<CreateOrderFormData[]>) {
  state.orderGroup = action.payload
}

interface GroupUpdateActionProp {
  index: number
  value: CreateOrderFormData
}

function handleUpdateAction(state : OrderGroupState, action: PayloadAction<GroupUpdateActionProp>) {
  const {index, value} = action.payload
  state.orderGroup[index] = value
}

function handleDeleteAction(state : OrderGroupState, action: PayloadAction<number>) {
  const index = action.payload
  state.orderGroup.splice(index, 1);
}

export const { resetOrderGroup, createOrderGroup, updateOrderGroup, deleteOrderGroup } = orderGroupSlice.actions

export const selectOrderGroup = (state: RootState) => state.orderGroup.orderGroup

export const orderGroupReducer = orderGroupSlice.reducer

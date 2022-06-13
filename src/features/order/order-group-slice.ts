import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { CreateOrderFormData } from 'models/api'
import { OrderGroupState } from 'models/features/order-group-slice'

const initialState: OrderGroupState = {
  orderGroup: [],
  status: 'idle',
  failureDescription: ''
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
  state.status = 'idle'
  state.failureDescription = ''
}

function handleCreateAction(state : OrderGroupState, action: PayloadAction<CreateOrderFormData[]>) {
  state.orderGroup = action.payload
  state.status = 'idle'
  state.failureDescription = ''
}

interface GroupUpdateActionProp {
  index: number
  value: CreateOrderFormData
}

function handleUpdateAction(state : OrderGroupState, action: PayloadAction<GroupUpdateActionProp>) {
  const {index, value} = action.payload
  state.orderGroup[index] = value
  state.status = 'idle'
  state.failureDescription = ''
}

function handleDeleteAction(state : OrderGroupState, action: PayloadAction<number>) {
  const index = action.payload
  state.orderGroup.splice(index, 1);
  state.status = 'idle'
  state.failureDescription = ''
}

export const { resetOrderGroup, createOrderGroup, updateOrderGroup, deleteOrderGroup } = orderGroupSlice.actions

export const selectOrderGroup = (state: RootState) => state.orderGroup.orderGroup
export const selectStatus = (state: RootState) => state.orderGroup.status
export const selectFailureDescription = (state: RootState) =>
  state.orderGroup.failureDescription

export const orderGroupReducer = orderGroupSlice.reducer

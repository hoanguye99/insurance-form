import { GetListBankResponse } from "models/api"

export interface ListBankState {
  listBank: undefined | GetListBankResponse
  status: 'idle' | 'loading' | 'failed' | 'init'
  failureDescription: string
}

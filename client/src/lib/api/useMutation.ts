import { useState } from 'react'
import { server } from './server'

interface State<TData> {
  data: TData | null
  loading: boolean
  error: boolean
}

export const useMutation = <TData = any, TVariables = any>(query: string) => {}

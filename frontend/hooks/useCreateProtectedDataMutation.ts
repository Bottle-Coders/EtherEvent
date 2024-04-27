import { useEffect, useState } from 'react'
import { useCreateProtectedDataMutation } from '../app/appSlice'

const useFetchProtectedData = (protectData: any) => {
  const [createProtectedData, result] = useCreateProtectedDataMutation()

  useEffect(() => {
    if (protectData) {
      createProtectedData(protectData)
    }
  }, [protectData, createProtectedData])
}

export default useFetchProtectedData

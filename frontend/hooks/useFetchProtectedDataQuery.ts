import { useEffect, useState } from 'react'
import { useFetchProtectedDataQuery } from '../app/appSlice'

const useFetchProtectedData = (owner: any) => {
  const { data, error, isLoading } = useFetchProtectedDataQuery(owner, {
    skip: !owner,
  })
  const [protectedData, setProtectedData] = useState([])

  useEffect(() => {
    if (data) {
      setProtectedData(data as any)
    }
  }, [data])

  return {
    protectedData,
    isLoading,
    error,
  }
}

export default useFetchProtectedData

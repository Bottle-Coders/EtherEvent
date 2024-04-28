import { useRouter } from 'next/router'
import { Checkin } from '../../components/Checkin'
import { Layout } from '../../components/Layout'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { initSDK } from '../../app/appSlice'
import { store } from '../../app/store'
import { useContracts } from '../../providers/contracts'
import { useReadContract } from 'wagmi'

export default function CheckinPage(): React.ReactElement {
  const router = useRouter()
  const { id } = router.query
  const { address, connector } = useAccount()

  useEffect(() => {
    console.log('connector', connector)
    if (!connector) {
      return
    }
    store.dispatch(initSDK({ connector }))
  }, [connector])

  const { data: contractsData } = useContracts()

  const eventManager = contractsData?.EventManager

  const {
    data: eventData,
    isLoading,
    isError,
  } = useReadContract({
    address: eventManager?.address,
    abi: eventManager?.abi,
    functionName: 'getEvent',
    args: [id as string],
  })

  return (
    <Layout>
      <main className="m-auto mt-8 flex min-h-screen w-full flex-col items-center justify-center">
        {!isLoading && !isError && (eventData as any) !== undefined && (
          <Checkin id={Number(id)} eventName={(eventData as any).name} />
        )}
      </main>
    </Layout>
  )
}

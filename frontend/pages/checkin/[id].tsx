import { useRouter } from 'next/router'
import { Checkin } from '../../components/Checkin'
import { Layout } from '../../components/Layout'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { initSDK } from '../../app/appSlice'
import { store } from '../../app/store'

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

  return (
    <Layout>
      <main className="m-auto mt-8 flex min-h-screen w-full flex-col items-center justify-center">
        <Checkin id={Number(id)} />
      </main>
    </Layout>
  )
}

import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Hero } from '../components/Hero'
import { PrimaryFeatures } from '../components/PrimaryFeatures'
import { SecondaryFeatures } from '../components/SecondaryFeatures'
import { CallToAction } from '../components/CallToAction'
import { UseCases } from '../components/UseCases'
import { Faqs } from '../components/Faqs'
import { initSDK } from '../app/appSlice'
import { useAccount } from 'wagmi'
import { store } from '../app/store'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const { connector } = useAccount()

  useEffect(() => {
    console.log('connector', connector)
    if (!connector) {
      return
    }
    store.dispatch(initSDK({ connector }))
  }, [connector])

  return (
    <Layout>
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <UseCases />
      <Faqs />
    </Layout>
  )
}

export default Home

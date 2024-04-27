import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import { type Chain } from 'wagmi'

import { ContractsProvider } from '../providers/contracts'

export const bellecour = {
  id: 0x86,
  name: 'iExec Sidechain',
  network: 'bellecour',
  nativeCurrency: {
    decimals: 18,
    name: 'xRLC',
    symbol: 'xRLC',
  },
  rpcUrls: {
    public: { http: ['https://bellecour.iex.ec'] },
    default: { http: ['https://bellecour.iex.ec'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Blockscout',
      url: 'https://blockscout-bellecour.iex.ec',
    },
    default: { name: 'Blockscout', url: 'https://blockscout-bellecour.iex.ec' },
  },
} as const satisfies Chain

const config = getDefaultConfig({
  appName: 'Airport Coders',
  projectId: 'YOUR_PROJECT_ID',
  chains: [bellecour],
  ssr: true,
})

const client = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider locale="en">
          <Toaster position="top-center" />
          <ChakraProvider>
            <ContractsProvider>
              <Component {...pageProps} />
            </ContractsProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App

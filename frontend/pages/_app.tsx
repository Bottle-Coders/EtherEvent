import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '../app/store'
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
}

const config = getDefaultConfig({
  appName: 'iPresence',
  appDescription: 'Project developed for iBuild Online Hackathon',
  projectId: 'iexec-presence',
  chains: [bellecour],
  ssr: true,
})

const client = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App

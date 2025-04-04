'use client'

import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { metaMask, walletConnect } from 'wagmi/connectors'

// 请替换为您从 https://cloud.walletconnect.com/ 获取的项目 ID
const projectId = '09737440391179ef606b5654435fe38c'

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    metaMask(),
    walletConnect({
      projectId,
      metadata: {
        name: 'Web3 App',
        description: 'Web3 App Example',
        url: 'https://localhost:3000',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      }
    })
  ],
  transports: {
    [mainnet.id]: http(),
  },
}) 
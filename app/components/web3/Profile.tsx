'use client'

import { useAccount, useEnsName } from 'wagmi'
import { ConnectButton } from './ConnectButton'

export function Profile() {
  const { address, isConnected } = useAccount()
  const { data: ensName, isLoading: isLoadingEns } = useEnsName({ address })

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg">请连接您的钱包</p>
        <ConnectButton />
      </div>
    )
  }

  if (isLoadingEns) {
    return <div className="text-lg">正在加载 ENS 名称...</div>
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">已连接的钱包</h2>
      <p className="font-mono bg-gray-100 px-4 py-2 rounded">
        {ensName ?? address}
      </p>
    </div>
  )
} 
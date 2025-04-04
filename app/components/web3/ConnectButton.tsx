'use client'

import { useEffect, useState, useCallback } from 'react'
import { useConnect } from 'wagmi'

export function ConnectButton() {
  const { connect, connectors, status, error } = useConnect()
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [pendingConnector, setPendingConnector] = useState<string | null>(null)
  const [showWalletPrompt, setShowWalletPrompt] = useState(false)

  useEffect(() => {
    // 检查是否安装了 MetaMask
    const checkMetaMask = () => {
      if (typeof window !== 'undefined') {
        setIsMetaMaskInstalled(!!window.ethereum?.isMetaMask)
      }
    }
    checkMetaMask()
  }, [])

  // 处理错误信息
  const getErrorMessage = useCallback((errorMsg: string) => {
    if (errorMsg.includes('wallet_requestPermissions')) {
      return '请在钱包中确认连接请求'
    }
    if (errorMsg.includes('Connector not found')) {
      return '请安装或启用相应的钱包插件'
    }
    return errorMsg
  }, [])

  // 处理错误时更新提示状态
  useEffect(() => {
    if (error?.message.includes('wallet_requestPermissions')) {
      setShowWalletPrompt(true)
    }
  }, [error])

  const handleConnect = useCallback((connector: any) => {
    setPendingConnector(connector.uid)
    setShowWalletPrompt(false)
    connect({ connector })
  }, [connect])

  return (
    <div className="flex flex-col gap-4">
      {connectors.map((connector) => {
        const isMetaMask = connector.name === 'MetaMask'
        const isReady = isMetaMask ? isMetaMaskInstalled : connector.ready
        const isPending = status === 'pending' && pendingConnector === connector.uid

        return (
          <button
            key={connector.uid}
            onClick={() => handleConnect(connector)}
            className={`
              px-4 py-2 rounded transition-colors
              ${isReady 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }
            `}
            disabled={!isReady || isPending}
          >
            {connector.name}
            {!isReady && (
              <span className="ml-2 text-sm">
                {isMetaMask ? '(请安装 MetaMask)' : '(未安装)'}
              </span>
            )}
            {isPending && (
              <span className="ml-2">连接中...</span>
            )}
          </button>
        )
      })}
      
      {error && (
        <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-700 text-sm">
            {getErrorMessage(error.message)}
          </p>
          {showWalletPrompt && (
            <div className="mt-2 text-sm text-gray-600">
              <p>👉 请检查以下内容：</p>
              <ul className="list-disc ml-5 mt-1">
                <li>查看钱包是否有待处理的连接请求</li>
                <li>确保钱包已解锁</li>
                <li>如果看不到请求，请点击钱包图标查看</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {isMetaMaskInstalled && !error && (
        <p className="text-sm text-gray-600 mt-2">
          提示：如果按钮显示未安装但您已安装 MetaMask，请尝试刷新页面或检查 MetaMask 是否已解锁。
        </p>
      )}
    </div>
  )
} 
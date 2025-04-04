'use client'

import { useState, useEffect } from 'react'
import { Web3Provider } from '../../providers/Web3Provider'

export default function Web3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Web3Provider>
      {children}
    </Web3Provider>
  )
} 
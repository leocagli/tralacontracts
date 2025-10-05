import { useState, useEffect, useCallback } from 'react'
import { WalletAccount } from '../types'

interface UsePolkadotReturn {
  isConnected: boolean
  account: WalletAccount | null
  accounts: WalletAccount[]
  connect: (walletId: string) => Promise<boolean>
  disconnect: () => void
  error: string | null
  isLoading: boolean
}

export const usePolkadot = (): UsePolkadotReturn => {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<WalletAccount | null>(null)
  const [accounts, setAccounts] = useState<WalletAccount[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const connect = useCallback(async (walletId: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // Importar dinámicamente las funciones de Polkadot
      const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp')
      
      // Habilitar extensiones
      const extensions = await web3Enable('Tralala Contracts')
      
      if (extensions.length === 0) {
        throw new Error('No se encontraron extensiones de wallet instaladas')
      }

      // Obtener cuentas disponibles
      const availableAccounts = await web3Accounts()
      
      if (availableAccounts.length === 0) {
        throw new Error('No se encontraron cuentas en el wallet')
      }

      setAccounts(availableAccounts)
      setAccount(availableAccounts[0]) // Seleccionar primera cuenta por defecto
      setIsConnected(true)
      
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al conectar'
      setError(errorMessage)
      setIsConnected(false)
      setAccount(null)
      setAccounts([])
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setIsConnected(false)
    setAccount(null)
    setAccounts([])
    setError(null)
  }, [])

  // Verificar conexión al cargar
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { web3Accounts } = await import('@polkadot/extension-dapp')
        const accounts = await web3Accounts()
        
        if (accounts.length > 0) {
          setAccounts(accounts)
          setAccount(accounts[0])
          setIsConnected(true)
        }
      } catch (err) {
        // No hay wallet conectado o no está disponible
        console.log('No hay wallet conectado')
      }
    }

    checkConnection()
  }, [])

  return {
    isConnected,
    account,
    accounts,
    connect,
    disconnect,
    error,
    isLoading,
  }
}

// Hook para manejar la API de Polkadot
export const usePolkadotApi = () => {
  const [api, setApi] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connect = useCallback(async () => {
    try {
      const { ApiPromise, WsProvider } = await import('@polkadot/api')
      
      // Conectar a Polkadot Hub TestNet
      const wsProvider = new WsProvider('wss://testnet-passet-hub-rpc.polkadot.io')
      const apiInstance = await ApiPromise.create({ provider: wsProvider })
      
      setApi(apiInstance)
      setIsConnected(true)
      setError(null)
      
      return apiInstance
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al conectar con la API'
      setError(errorMessage)
      setIsConnected(false)
      setApi(null)
      throw err
    }
  }, [])

  const disconnect = useCallback(async () => {
    if (api) {
      await api.disconnect()
      setApi(null)
      setIsConnected(false)
    }
  }, [api])

  // Conectar automáticamente al montar
  useEffect(() => {
    connect()
    
    return () => {
      if (api) {
        api.disconnect()
      }
    }
  }, [])

  return {
    api,
    isConnected,
    error,
    connect,
    disconnect,
  }
}

// Hook para manejar transacciones
export const useTransaction = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

  const sendTransaction = useCallback(async (
    api: any,
    account: WalletAccount,
    transaction: any
  ) => {
    setIsLoading(true)
    setError(null)
    setTxHash(null)

    try {
      // Importar funciones de firma
      const { web3FromSource } = await import('@polkadot/extension-dapp')
      
      // Obtener extensión del wallet
      const injector = await web3FromSource(account.meta.source)
      
      // Configurar firma
      const signer = injector.signer
      
      // Enviar transacción
      const tx = await transaction.signAndSend(
        account.address,
        { signer },
        ({ status, txHash }) => {
          if (status.isInBlock) {
            setTxHash(txHash.toString())
            setIsLoading(false)
          }
        }
      )
      
      return tx
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error en la transacción'
      setError(errorMessage)
      setIsLoading(false)
      throw err
    }
  }, [])

  const reset = useCallback(() => {
    setError(null)
    setTxHash(null)
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    txHash,
    sendTransaction,
    reset,
  }
}






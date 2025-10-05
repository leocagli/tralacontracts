export interface WalletAccount {
  address: string
  meta: {
    name: string
    source: string
  }
  type: string
}

export interface ContractFeature {
  id: string
  name: string
  description: string
  category: 'token' | 'nft' | 'dao' | 'defi' | 'utility'
  blocks: BlockDefinition[]
}

export interface BlockDefinition {
  type: string
  message: string
  args: any[]
  output?: string
  colour?: string
  tooltip?: string
  helpUrl?: string
}

export interface GeneratedContract {
  name: string
  code: string
  abi: any[]
  features: ContractFeature[]
}

export interface DeployedContract {
  address: string
  transactionHash: string
  blockNumber: number
  gasUsed: string
  explorerUrl: string
  contract: GeneratedContract
}

export interface PolkadotNetwork {
  name: string
  chainId: string
  rpcUrl: string
  explorerUrl: string
  faucetUrl?: string
  isTestnet: boolean
}

export interface ContractTemplate {
  id: string
  name: string
  description: string
  category: string
  features: string[]
  estimatedGas: string
  complexity: 'beginner' | 'intermediate' | 'advanced'
}






// Bubblemaps API response types
export interface BubblemapsNode {
  address: string
  transaction_count?: number
  volume?: number
  is_contract?: boolean
  is_exchange?: boolean
  [key: string]: any
}

export interface BubblemapsLink {
  source: string
  target: string
  forward?: number
  backward?: number
  [key: string]: any
}

export interface BubblemapsResponse {
  nodes: BubblemapsNode[]
  links: BubblemapsLink[]
  [key: string]: any
}

// Processed data types for visualization
export interface ProcessedNode {
  id: string
  label: string
  value: number
  color: string
  type: string
  transactions: number
  volume: number
}

export interface ProcessedLink {
  source: string
  target: string
  value: number
  forward: number
  backward: number
}

// Statistics type
export interface NetworkStats {
  totalTraders: number
  totalTransactions: number
  topTraderVolume: number
  connections: number
}

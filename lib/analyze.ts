import type { BubblemapsResponse, ProcessedNode, ProcessedLink, NetworkStats } from "./types"

/**
 * Processes raw Bubblemaps data to extract top traders and their relationships
 *
 * @param data - Raw data from Bubblemaps API
 * @param maxNodes - Maximum number of nodes to include (default: 100)
 * @returns Processed nodes and links ready for visualization
 */
export function processTraderData(
  data: BubblemapsResponse,
  maxNodes = 100,
): {
  processedNodes: ProcessedNode[]
  processedLinks: ProcessedLink[]
  stats: NetworkStats
} {
  // Extract nodes with transaction data
  const nodes = data.nodes || []
  const links = data.links || []

  if (nodes.length === 0) {
    throw new Error("No nodes found in the data")
  }

  // Sort nodes by transaction count (descending)
  const sortedNodes = [...nodes].sort((a, b) => (b.transaction_count || 0) - (a.transaction_count || 0))

  // Take top N traders
  const topTraders = sortedNodes.slice(0, maxNodes)

  // Create a set of top trader addresses for quick lookup
  const topTraderAddresses = new Set(topTraders.map((node) => node.address))

  // Process nodes for visualization
  const processedNodes: ProcessedNode[] = topTraders.map((node) => {
    // Determine node type based on properties
    let nodeType = "trader"
    if (node.is_contract) nodeType = "contract"
    else if (node.is_exchange) nodeType = "exchange"

    // Calculate node value (size) based on transaction count
    const txCount = node.transaction_count || 0
    const nodeValue = Math.max(1, Math.min(20, Math.log10(txCount + 1) * 5))

    // Assign color based on node type
    let color
    switch (nodeType) {
      case "contract":
        color = "#3b82f6" // blue
        break
      case "exchange":
        color = "#10b981" // green
        break
      default:
        color = "#f97316" // orange
    }

    return {
      id: node.address,
      label: node.address,
      value: nodeValue,
      color,
      type: nodeType,
      transactions: txCount,
      volume: node.volume || 0,
    }
  })

  // Filter links to only include connections between top traders
  const relevantLinks = links.filter(
    (link) => topTraderAddresses.has(link.source) && topTraderAddresses.has(link.target),
  )

  // Process links for visualization
  const processedLinks: ProcessedLink[] = relevantLinks.map((link) => {
    // Calculate link strength based on forward/backward values
    const value = Math.max(1, Math.log10((link.forward || 0) + (link.backward || 0) + 1))

    return {
      source: link.source,
      target: link.target,
      value,
      forward: link.forward || 0,
      backward: link.backward || 0,
    }
  })

  // Calculate network statistics
  const stats: NetworkStats = {
    totalTraders: nodes.length,
    totalTransactions: nodes.reduce((sum, node) => sum + (node.transaction_count || 0), 0),
    topTraderVolume: topTraders.length > 0 ? topTraders[0].volume || 0 : 0,
    connections: links.length,
  }

  return {
    processedNodes,
    processedLinks,
    stats,
  }
}

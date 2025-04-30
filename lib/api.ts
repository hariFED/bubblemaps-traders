import type { BubblemapsResponse } from "./types"

/**
 * Fetches map data from the Bubblemaps API for a given token contract and chain
 *
 * @param contract - The token contract address
 * @param chain - The blockchain (eth, bsc, etc.)
 * @returns Promise with the map data
 */
export async function fetchMapData(contract: string, chain: string): Promise<BubblemapsResponse> {
  // Validate inputs
  if (!contract || !chain) {
    throw new Error("Contract address and chain are required")
  }

  // Normalize contract address
  const normalizedContract = contract.toLowerCase()

  // Construct API URL
  const apiUrl = `https://api-legacy.bubblemaps.io/map-data?token=${normalizedContract}&chain=${chain}`

  try {
    // Fetch with a timeout of 15 seconds
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Validate the response data
    if (!data || !data.nodes) {
      throw new Error("Invalid data format received from API")
    }

    return data
  } catch (error) {
    console.error("Error fetching map data:", error)
    throw error
  }
}

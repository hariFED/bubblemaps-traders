import { Suspense } from "react"
import { NetworkGraph } from "@/components/network-graph"
import { NetworkStats } from "@/components/network-stats"
import { BackButton } from "@/components/back-button"
import { fetchMapData } from "@/lib/api"
import { processTraderData } from "@/lib/analyze"
import { LoadingSkeleton } from "@/components/loading-skeleton"

interface VisualizePageProps {
  params: {
    chain: string
    contract: string
  }
}

export default async function VisualizePage({ params }: VisualizePageProps) {
  return (
    <main className="flex min-h-screen flex-col p-4 bg-gradient-to-br from-slate-50 via-sky-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-7xl">
        <BackButton />

        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Trader Network</h1>
          <p className="text-slate-600 dark:text-slate-300">
            {params.contract} on {params.chain.toUpperCase()}
          </p>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <NetworkDataContainer chain={params.chain} contract={params.contract} />
        </Suspense>
      </div>
    </main>
  )
}

async function NetworkDataContainer({
  chain,
  contract,
}: {
  chain: string
  contract: string
}) {
  try {
    // Add validation for chain and contract
    if (!chain || !contract) {
      return (
        <div className="p-8 text-center">
          <p className="text-red-500">Invalid chain or contract address</p>
        </div>
      )
    }

    const data = await fetchMapData(contract, chain)

    if (!data || !data.nodes || data.nodes.length === 0) {
      return (
        <div className="p-8 text-center">
          <p>No data found for this token. Please try another contract address.</p>
        </div>
      )
    }

    const { processedNodes, processedLinks, stats } = processTraderData(data)

    // Ensure we have data to display
    if (processedNodes.length === 0) {
      return (
        <div className="p-8 text-center">
          <p>No trader data found for this token. Please try another contract address.</p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <NetworkStats stats={stats} />
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden h-[70vh]">
          <NetworkGraph nodes={processedNodes} links={processedLinks} />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching or processing data:", error)
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error loading data. Please try again later.</p>
      </div>
    )
  }
}

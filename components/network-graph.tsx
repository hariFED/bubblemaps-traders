"use client"

import { useRef, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { truncateAddress } from "@/lib/utils"
import type { ProcessedNode, ProcessedLink } from "@/lib/types"

// Dynamically import ForceGraph to avoid SSR issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d").then((mod) => mod.default), {
  ssr: false,
  loading: () => <GraphLoader />,
})

interface NetworkGraphProps {
  nodes: ProcessedNode[]
  links: ProcessedLink[]
}

export function NetworkGraph({ nodes, links }: NetworkGraphProps) {
  const graphRef = useRef<any>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredNode, setHoveredNode] = useState<ProcessedNode | null>(null)
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    // Initial dimensions
    updateDimensions()

    // Update dimensions on resize
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Zoom to fit when data changes
  useEffect(() => {
    if (graphRef.current && nodes.length > 0) {
      try {
        // Small delay to ensure the graph is rendered
        const timer = setTimeout(() => {
          if (graphRef.current && graphRef.current.zoomToFit) {
            graphRef.current.zoomToFit(400, 40)
          }
        }, 500)
        return () => clearTimeout(timer)
      } catch (error) {
        console.error("Error zooming graph:", error)
      }
    }
  }, [nodes])

  const isDarkTheme = theme === "dark"

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ForceGraph2D
          ref={graphRef}
          graphData={{ nodes, links }}
          width={dimensions.width}
          height={dimensions.height}
          nodeRelSize={6}
          nodeVal={(node) => (node as ProcessedNode).value}
          nodeLabel={null} // Disable default tooltip
          nodeColor={(node) => (node as ProcessedNode).color}
          linkColor={() => (isDarkTheme ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)")}
          linkWidth={(link) => (link as ProcessedLink).value / 10}
          onNodeHover={(node) => setHoveredNode(node as ProcessedNode | null)}
          cooldownTicks={100}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          linkDirectionalArrowLength={3}
          linkDirectionalArrowRelPos={0.8}
          backgroundColor="transparent"
        />
      )}

      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 z-10"
        >
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Address</h3>
                  <Badge variant="outline">{hoveredNode.type}</Badge>
                </div>
                <p className="text-sm font-mono">{truncateAddress(hoveredNode.id)}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Transactions</p>
                    <p className="font-medium">{hoveredNode.transactions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Volume</p>
                    <p className="font-medium">{hoveredNode.volume.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

function GraphLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
        <p>Loading graph visualization...</p>
      </div>
    </div>
  )
}

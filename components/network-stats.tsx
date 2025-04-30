import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { NetworkStats as StatsType } from "@/lib/types"

interface NetworkStatsProps {
  stats: StatsType
}

export function NetworkStats({ stats }: NetworkStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Total Traders"
        value={stats.totalTraders.toLocaleString()}
        description="Unique addresses trading this token"
        trend={stats.totalTraders > 1000 ? "high" : "medium"}
      />
      <StatsCard
        title="Total Transactions"
        value={stats.totalTransactions.toLocaleString()}
        description="Number of trades"
        trend={stats.totalTransactions > 10000 ? "high" : "medium"}
      />
      <StatsCard
        title="Top Trader Volume"
        value={stats.topTraderVolume.toLocaleString()}
        description="Highest trading volume"
        trend="high"
      />
      <StatsCard
        title="Connections"
        value={stats.connections.toLocaleString()}
        description="Trading relationships"
        trend={stats.connections > 500 ? "high" : "medium"}
      />
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  description: string
  trend: "low" | "medium" | "high"
}

function StatsCard({ title, value, description, trend }: StatsCardProps) {
  const trendColors = {
    low: "text-yellow-600 dark:text-yellow-400",
    medium: "text-blue-600 dark:text-blue-400",
    high: "text-emerald-600 dark:text-emerald-400",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${trendColors[trend]}`}>{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full text-center space-y-6">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto" />

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Data Not Found</h1>

        <p className="text-slate-600 dark:text-slate-300">
          We couldn't find the token data you're looking for. This could be due to an invalid contract address or the
          data is not available.
        </p>

        <Button asChild>
          <Link href="/">Return to Search</Link>
        </Button>
      </div>
    </div>
  )
}

import Navbar from "@/components/navbar"
import { SearchForm } from "@/components/search-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-sky-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">

      <div className="absolute top-4 right-0 left-0 w-[95%] mx-auto  ">
        <Navbar />
      </div>
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Token Trader Network
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Visualize the top traders and their relationships for any token
          </p>
        </div>

        <SearchForm />

        <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
          <p>Powered by <span className="bg-[#090015] text-white px-2 rounded-full">Bubblemaps API</span> </p>
        </div>
      </div>
    </main>
  )
}

import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-[#006f7f] animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">Loading SILICO SCREEN</h2>
        <p className="text-gray-500 mt-2">Please wait while we prepare your workspace...</p>
      </div>
    </div>
  )
}

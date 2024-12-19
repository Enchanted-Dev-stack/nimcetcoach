import { Suspense } from 'react'
import ReportsUI from './reports-ui'
import { getProgress } from './progress-data'

function LoadingState() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Reports</h1>
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default async function ReportsPage() {
  // Fetch data on the server
  const data = await getProgress()
  
  return (
    <Suspense fallback={<LoadingState />}>
      <ReportsUI initialData={data} />
    </Suspense>
  )
}
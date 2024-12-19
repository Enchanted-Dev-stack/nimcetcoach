import Image from "next/image";
import { ProgressForm } from '@/components/progress-form'
import { TodaysOverview } from '@/components/todays-overview'
import { QuickStats } from '@/components/quick-stats'

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">NIMCET Prep Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Daily Progress</h2>
            <ProgressForm />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Today's Overview</h2>
            <TodaysOverview />
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
            <QuickStats />
          </div>
        </div>
      </div>
    </div>
  )
}

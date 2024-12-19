'use client'

import { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Progress } from './ui/progress'

export function TodaysOverview() {
  const [todayData, setTodayData] = useState(null)
  
  useEffect(() => {
    async function fetchTodayData() {
      try {
        const res = await fetch('/api/progress')
        const data = await res.json()
        
        if (data.success && data.data.length > 0) {
          // Get today's data (most recent entry)
          setTodayData(data.data[0])
        }
      } catch (error) {
        console.error('Error fetching today\'s data:', error)
      }
    }
    
    fetchTodayData()
  }, [])
  
  if (!todayData) {
    return <div>Loading today's progress...</div>
  }
  
  const completedTasks = Object.values(todayData.tasks).filter(Boolean).length
  const totalTasks = Object.keys(todayData.tasks).length
  const progressPercentage = (completedTasks / totalTasks) * 100
  
  // Convert seconds to hours and minutes for each subject
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Daily Progress</span>
          <span className="text-sm font-medium">{completedTasks}/{totalTasks} tasks</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Study Time Today:</h3>
        {Object.entries(todayData.studyTime || {}).map(([subject, seconds]) => (
          <div key={subject} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {subject.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span>{formatTime(seconds)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

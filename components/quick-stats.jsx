'use client'

import { useEffect, useState } from 'react'

export function QuickStats() {
  const [stats, setStats] = useState(null)
  
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/progress')
        const data = await res.json()
        
        if (data.success && data.data.length > 0) {
          const progressData = data.data
          
          // Calculate total study time for each subject
          const totalStudyTime = progressData.reduce((acc, day) => {
            Object.entries(day.studyTime || {}).forEach(([subject, seconds]) => {
              acc[subject] = (acc[subject] || 0) + seconds
            })
            return acc
          }, {})
          
          // Calculate completion rate
          const totalTasks = progressData.length * 5 // 5 subjects per day
          const completedTasks = progressData.reduce((acc, day) => {
            return acc + Object.values(day.tasks).filter(Boolean).length
          }, 0)
          
          // Calculate streak
          let currentStreak = 0
          let i = 0
          while (i < progressData.length) {
            const day = progressData[i]
            const hasCompletedTasks = Object.values(day.tasks).some(Boolean)
            if (hasCompletedTasks) {
              currentStreak++
              i++
            } else {
              break
            }
          }
          
          setStats({
            totalStudyTime,
            completionRate: (completedTasks / totalTasks) * 100,
            currentStreak,
            daysTracked: progressData.length
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    
    fetchStats()
  }, [])
  
  if (!stats) {
    return <div>Loading stats...</div>
  }
  
  // Format total study time
  const formatTotalTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    return `${hours}h`
  }
  
  // Get total hours studied across all subjects
  const totalHours = Object.values(stats.totalStudyTime)
    .reduce((acc, seconds) => acc + seconds, 0)
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold">{Math.round(stats.completionRate)}%</div>
        <div className="text-sm text-muted-foreground">Completion Rate</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold">{formatTotalTime(totalHours)}</div>
        <div className="text-sm text-muted-foreground">Total Study Time</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold">{stats.currentStreak}</div>
        <div className="text-sm text-muted-foreground">Day Streak</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold">{stats.daysTracked}</div>
        <div className="text-sm text-muted-foreground">Days Tracked</div>
      </div>
    </div>
  )
}

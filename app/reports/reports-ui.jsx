"use client"

import { useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Progress } from '../../components/ui/progress'

function DaysGrid() {
  // Set start date to December 18, 2023 (or the first day you started)
  const startDate = new Date('2023-12-18')
  const endDate = new Date('2024-04-30')
  const today = new Date('2023-12-18') // Start from today's actual date
  
  // Calculate total days and days passed
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
  const daysPassed = Math.max(0, Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)))
  const daysLeft = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)))
  
  // Create array of day objects
  const days = Array.from({ length: totalDays }, (_, index) => ({
    date: new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000),
    passed: index < daysPassed
  }))
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Days Until NIMCET</span>
          <span className="text-2xl font-bold text-primary">{daysLeft} days left</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress 
            value={Math.min(100, (daysPassed / totalDays) * 100)} 
            className="h-2" 
          />
          <p className="text-sm text-muted-foreground">
            {Math.min(100, Math.round((daysPassed / totalDays) * 100))}% of preparation time used
          </p>
          
          <div className="flex flex-wrap gap-0.5">
            {days.map((day, index) => (
              <div
                key={index}
                className={`
                  w-2.5 h-2.5
                  ${day.passed 
                    ? 'bg-primary' 
                    : 'bg-gray-200'
                  }
                `}
                title={day.date.toLocaleDateString()}
              />
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Start: {startDate.toLocaleDateString()}</span>
            <span>End: {endDate.toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function calculateWeeklyStats(data) {
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data)
    return {}
  }
  
  // Group data by week
  const weeklyData = data.reduce((acc, day) => {
    const weekStart = new Date(day.date)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    const weekKey = weekStart.toISOString().split('T')[0]
    
    if (!acc[weekKey]) {
      acc[weekKey] = {
        totalTasks: 0,
        completedTasks: 0,
        subjects: {
          mathematics: 0,
          logicalReasoning: 0,
          computerAwareness: 0,
          english: 0,
          mockTests: 0,
        }
      }
    }
    
    acc[weekKey].totalTasks += 5
    Object.entries(day.tasks).forEach(([subject, completed]) => {
      if (completed) {
        acc[weekKey].completedTasks++
        acc[weekKey].subjects[subject]++
      }
    })
    
    return acc
  }, {})
  
  return weeklyData
}

function calculateMonthlyStats(data) {
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data)
    return {}
  }
  
  // Group data by month
  const monthlyData = data.reduce((acc, day) => {
    const monthKey = new Date(day.date).toISOString().slice(0, 7)
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        totalTasks: 0,
        completedTasks: 0,
        subjects: {
          mathematics: 0,
          logicalReasoning: 0,
          computerAwareness: 0,
          english: 0,
          mockTests: 0,
        }
      }
    }
    
    acc[monthKey].totalTasks += 5
    Object.entries(day.tasks).forEach(([subject, completed]) => {
      if (completed) {
        acc[monthKey].completedTasks++
        acc[monthKey].subjects[subject]++
      }
    })
    
    return acc
  }, {})
  
  return monthlyData
}

function StatCard({ title, value, total, className = '' }) {
  const percentage = total ? (value / total) * 100 : 0
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-2xl font-bold">
          {value}{total ? `/${total}` : ''}
        </span>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {percentage.toFixed(1)}% Complete
        </p>
      </CardContent>
    </Card>
  )
}

function SubjectProgressList({ subjects, className = '' }) {
  const maxValue = Math.max(...Object.values(subjects))
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Subject Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(subjects).map(([subject, count]) => (
          <div key={subject} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {subject.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="text-muted-foreground">{count} completed</span>
            </div>
            <Progress 
              value={(count / maxValue) * 100} 
              className="h-1.5" 
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function ReportsUI({ initialData }) {
  const [progressData] = useState(initialData)

  if (!progressData || !progressData.data) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Reports</h1>
        <p className="text-gray-600">No progress data available.</p>
      </div>
    )
  }

  const weeklyStats = calculateWeeklyStats(progressData.data)
  const monthlyStats = calculateMonthlyStats(progressData.data)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Reports</h1>
      
      {/* Days Grid */}
      <div className="mb-8">
        <DaysGrid />
      </div>

      <Tabs defaultValue="weekly" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="weekly">Weekly Report</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-8">
          {Object.entries(weeklyStats).map(([week, stats]) => (
            <div key={week} className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Week of {new Date(week).toLocaleDateString('default', { 
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <StatCard 
                  title="Tasks Completed" 
                  value={stats.completedTasks}
                  total={stats.totalTasks}
                />
                <SubjectProgressList subjects={stats.subjects} />
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="monthly" className="space-y-8">
          {Object.entries(monthlyStats).map(([month, stats]) => (
            <div key={month} className="space-y-6">
              <h2 className="text-2xl font-semibold">
                {new Date(month).toLocaleDateString('default', { 
                  month: 'long',
                  year: 'numeric'
                })}
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <StatCard 
                  title="Tasks Completed" 
                  value={stats.completedTasks}
                  total={stats.totalTasks}
                />
                <SubjectProgressList subjects={stats.subjects} />
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

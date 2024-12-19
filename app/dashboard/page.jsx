"use client"

import { Progress } from '../../components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'

async function getProgress() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/progress`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch progress data')
  }
  return res.json()
}

export default async function Dashboard() {
  const { data: progressData } = await getProgress()
  
  // Calculate statistics
  const totalTasks = progressData.length * 5 // 5 subjects per day
  const completedTasks = progressData.reduce((acc, day) => {
    return acc + Object.values(day.tasks).filter(Boolean).length
  }, 0)
  const completionRate = (completedTasks / totalTasks) * 100

  // Calculate subject-wise completion rates
  const subjectStats = {
    mathematics: 0,
    logicalReasoning: 0,
    computerAwareness: 0,
    english: 0,
    mockTests: 0,
  }

  progressData.forEach(day => {
    Object.entries(day.tasks).forEach(([subject, completed]) => {
      if (completed) {
        subjectStats[subject]++
      }
    })
  })

  const totalDays = progressData.length
  Object.keys(subjectStats).forEach(subject => {
    subjectStats[subject] = (subjectStats[subject] / totalDays) * 100
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{completionRate.toFixed(1)}%</div>
            <Progress value={completionRate} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedTasks}</div>
            <p className="text-sm text-muted-foreground">out of {totalTasks} tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {/* We'll implement streak calculation later */}
              0 days
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 grid-cols-1 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(subjectStats).map(([subject, rate]) => (
              <div key={subject}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    {subject.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-medium">{rate.toFixed(1)}%</span>
                </div>
                <Progress value={rate} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Completed Tasks</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progressData.slice(0, 5).map((day) => (
                <TableRow key={day._id}>
                  <TableCell>
                    {new Date(day.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {Object.values(day.tasks).filter(Boolean).length}/5
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {day.notes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

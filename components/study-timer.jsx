'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'

export function StudyTimer({ subject, onTimeUpdate }) {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1
          onTimeUpdate(subject, newTime)
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, subject, onTimeUpdate])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(0)
    onTimeUpdate(subject, 0)
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="font-mono text-lg w-24">{formatTime(time)}</div>
      <Button 
        variant={isRunning ? "destructive" : "default"}
        size="sm"
        onClick={toggleTimer}
      >
        {isRunning ? 'Stop' : 'Start'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={resetTimer}
      >
        Reset
      </Button>
    </div>
  )
}

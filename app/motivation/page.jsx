"use client"

import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

const motivationalQuotes = [
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    quote: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    quote: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier"
  }
]

const studyTips = [
  "Break down complex topics into smaller, manageable chunks",
  "Use active recall techniques instead of passive reading",
  "Take regular breaks to maintain focus and productivity",
  "Create a consistent study schedule and stick to it",
  "Practice with previous year questions regularly",
  "Teach concepts to others to reinforce your understanding",
  "Stay hydrated and maintain a healthy sleep schedule",
  "Review your mistakes and learn from them"
]

export default function Motivation() {
  // Get a random quote
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Stay Motivated</h1>

      <div className="grid gap-8">
        <Alert>
          <AlertTitle>Quote of the Day</AlertTitle>
          <AlertDescription className="mt-2">
            "{randomQuote.quote}"
            <div className="mt-2 font-medium">- {randomQuote.author}</div>
          </AlertDescription>
        </Alert>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Study Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {studyTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Short-term Goals</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Complete daily practice problems</li>
                    <li>Review weak topics from last mock test</li>
                    <li>Maintain study streak</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Long-term Goals</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Master all NIMCET topics</li>
                    <li>Achieve consistent scores in mock tests</li>
                    <li>Build strong problem-solving speed</li>
                  </ul>
                </div>

                <Button className="w-full mt-4">
                  Update Goals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Progress Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">First Week Completed</h3>
                  <p className="text-sm text-muted-foreground">
                    Consistently tracked progress for 7 days
                  </p>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Mathematics Master</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete all mathematics topics
                  </p>
                </div>
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Mock Test Champion</h3>
                  <p className="text-sm text-muted-foreground">
                    Score above 90% in 3 consecutive mock tests
                  </p>
                </div>
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

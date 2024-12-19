"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { CalendarIcon } from '@radix-ui/react-icons'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Checkbox } from './ui/checkbox'
import { Textarea } from './ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover'
import { StudyTimer } from './study-timer'

const subjects = [
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'logicalReasoning', label: 'Logical Reasoning & Analytical Ability' },
  { id: 'computerAwareness', label: 'Computer Awareness' },
  { id: 'english', label: 'English' },
  { id: 'mockTests', label: 'Mock Tests' },
]

export function ProgressForm() {
  const form = useForm({
    defaultValues: {
      date: new Date(),
      tasks: {},
      studyTime: {},
      notes: '',
    },
  })

  async function onSubmit(data) {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit progress')
      }

      form.reset()
      // Add success notification here
    } catch (error) {
      console.error('Error submitting progress:', error)
      // Add error notification here
    }
  }

  const handleTimeUpdate = (subject, time) => {
    form.setValue(`studyTime.${subject}`, time)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('2024-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Completed Tasks</FormLabel>
          {subjects.map((subject) => (
            <div key={subject.id} className="flex items-center justify-between space-x-4 p-4 border rounded-lg">
              <FormField
                control={form.control}
                name={`tasks.${subject.id}`}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel className="font-normal">
                      {subject.label}
                    </FormLabel>
                  </div>
                )}
              />
              <StudyTimer 
                subject={subject.id}
                onTimeUpdate={handleTimeUpdate}
              />
            </div>
          ))}
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any notes about today's progress..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can add any additional thoughts or reflections here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Progress</Button>
      </form>
    </Form>
  )
}

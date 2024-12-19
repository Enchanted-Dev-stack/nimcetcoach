import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Progress } from '@/lib/db/models/Progress';

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    
    // Convert the date string to start of day to ensure consistent comparison
    const startOfDay = new Date(data.date);
    startOfDay.setHours(0, 0, 0, 0);
    
    // Try to find an existing record for this date
    const existingProgress = await Progress.findOne({
      date: {
        $gte: startOfDay,
        $lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    let progress;
    
    if (existingProgress) {
      // Update existing record with normalized tasks and study time
      progress = await Progress.findByIdAndUpdate(
        existingProgress._id,
        {
          $set: {
            tasks: {
              mathematics: false,
              logicalReasoning: false,
              computerAwareness: false,
              english: false,
              mockTests: false,
              ...data.tasks
            },
            studyTime: {
              mathematics: data.studyTime?.mathematics || existingProgress.studyTime?.mathematics || 0,
              logicalReasoning: data.studyTime?.logicalReasoning || existingProgress.studyTime?.logicalReasoning || 0,
              computerAwareness: data.studyTime?.computerAwareness || existingProgress.studyTime?.computerAwareness || 0,
              english: data.studyTime?.english || existingProgress.studyTime?.english || 0,
              mockTests: data.studyTime?.mockTests || existingProgress.studyTime?.mockTests || 0,
            },
            notes: data.notes,
          }
        },
        { new: true }
      );
    } else {
      // Create new record with normalized tasks and study time
      progress = await Progress.create({
        date: startOfDay,
        tasks: {
          mathematics: false,
          logicalReasoning: false,
          computerAwareness: false,
          english: false,
          mockTests: false,
          ...data.tasks
        },
        studyTime: {
          mathematics: data.studyTime?.mathematics || 0,
          logicalReasoning: data.studyTime?.logicalReasoning || 0,
          computerAwareness: data.studyTime?.computerAwareness || 0,
          english: data.studyTime?.english || 0,
          mockTests: data.studyTime?.mockTests || 0,
        },
        notes: data.notes
      });
    }
    
    return NextResponse.json({ success: true, data: progress });
  } catch (error) {
    console.error('Error saving progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save progress' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const progress = await Progress.find().sort({ date: -1 });
    
    return NextResponse.json({ success: true, data: progress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

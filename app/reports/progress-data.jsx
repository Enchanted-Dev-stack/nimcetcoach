import { headers } from 'next/headers'

async function getProgress() {
  try {
    const res = await fetch('http://localhost:3000/api/progress', {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      return { data: [] }
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching progress:', error)
    return { data: [] }
  }
}

export { getProgress }

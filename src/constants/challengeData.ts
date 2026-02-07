import type { Day } from '@/types/challenge'

export function createInitialDays(): Day[] {
  return [
    {
      index: 0,
      title: 'Getting Started',
      status: 'in-progress',
      tasks: [
        { id: 'd0-t0', dayIndex: 0, label: 'Connect your exchange account', type: 'exchange', completed: false },
        { id: 'd0-t1', dayIndex: 0, label: "Watch today's lesson", type: 'standard', completed: false },
        { id: 'd0-t2', dayIndex: 0, label: 'Post your trade screenshot', type: 'standard', completed: false },
      ],
    },
    {
      index: 1,
      title: 'Your First Trade',
      status: 'locked',
      tasks: [
        { id: 'd1-t0', dayIndex: 1, label: "Watch today's lesson", type: 'standard', completed: false },
        { id: 'd1-t1', dayIndex: 1, label: 'Place 1 practice trade', type: 'standard', completed: false },
      ],
    },
    {
      index: 2,
      title: 'Chart Reading',
      status: 'locked',
      tasks: [
        { id: 'd2-t0', dayIndex: 2, label: 'Study candlestick patterns', type: 'standard', completed: false },
        { id: 'd2-t1', dayIndex: 2, label: 'Identify 3 patterns on a live chart', type: 'standard', completed: false },
        { id: 'd2-t2', dayIndex: 2, label: 'Post your chart analysis', type: 'standard', completed: false },
      ],
    },
    {
      index: 3,
      title: 'Risk Management',
      status: 'locked',
      tasks: [
        { id: 'd3-t0', dayIndex: 3, label: "Watch today's lesson", type: 'standard', completed: false },
        { id: 'd3-t1', dayIndex: 3, label: 'Set up a stop-loss on a practice trade', type: 'standard', completed: false },
      ],
    },
    {
      index: 4,
      title: 'Strategy & Review',
      status: 'locked',
      tasks: [
        { id: 'd4-t0', dayIndex: 4, label: 'Write your trading plan', type: 'standard', completed: false },
        { id: 'd4-t1', dayIndex: 4, label: 'Review and journal your week', type: 'standard', completed: false },
        { id: 'd4-t2', dayIndex: 4, label: 'Submit your final trade', type: 'standard', completed: false },
      ],
    },
  ]
}

export const TOTAL_DAYS = 5

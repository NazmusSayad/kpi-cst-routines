export const days = [
  'Sunday',
  'Monday',
  'Thursday',
  'Wednesday',
  'Tuesday',
] as const

export type Data = Record<(typeof days)[number], SubjectData[]>
export type SubjectData = {
  name: string
  startTime: string
  room: string
}

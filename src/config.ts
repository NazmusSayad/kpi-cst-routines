export const days = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
] as const

export const fonts = [
  'https://cdn.discordapp.com/attachments/1146470043677380739/1146470366567485450/Rubik-Regular.ttf',
  'https://cdn.discordapp.com/attachments/1146470043677380739/1146470357407109171/Rubik-Medium.ttf',
  'https://cdn.discordapp.com/attachments/1146470043677380739/1146470366911410226/Rubik-SemiBold.ttf',
  'https://cdn.discordapp.com/attachments/1146470043677380739/1146470358501818378/Rubik-Bold.ttf',
  'https://cdn.discordapp.com/attachments/1146470043677380739/1146470168013316186/NotoSansBengali-Medium.ttf',
  'https://cdn.discordapp.com/attachments/1146470043677380739/1146470168533418014/NotoSansBengali-Regular.ttf',
  'https://cdn.discordapp.com/attachments/1146470043677380739/1146470168856383498/NotoSansBengali-SemiBold.ttf',
  'https://cdn.discordapp.com/attachments/1146470043677380739/1146470170051760298/NotoSansBengali-Bold.ttf',
]

export type Data = Record<(typeof days)[number], SubjectData[]>
export type SubjectData = {
  name: string
  startTime: string
  room: string
}

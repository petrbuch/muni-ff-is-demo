import type { Expert, Lab, Reservation, TimeSlot } from './types'

export const EXPERTS: Expert[] = [
  {
    id: 'lucie-vrbova',
    name: 'Lucie Vrbová',
    role: 'Specialistka na virtuální realitu',
    labId: 'vr',
    avatarInitials: 'LV',
  },
  {
    id: 'eva-novakova',
    name: 'Eva Nováková',
    role: 'Expertka na digitální multimédia',
    labId: 'multimedia',
    avatarInitials: 'EN',
  },
  {
    id: 'jakub-horak',
    name: 'Jakub Horák',
    role: 'Vedoucí Makerspace',
    labId: 'makerspace',
    avatarInitials: 'JH',
  },
]

export const LABS: Lab[] = [
  {
    id: 'vr',
    name: 'Laboratoř virtuální reality',
    shortName: 'VR Lab',
    description:
      'Prozkoumejte VR pro vzdělávání, zábavu nebo profesní rozvoj. Vybaveno high-end headséty a rozsáhlou knihovnou interaktivních zážitků.',
    equipment: ['8× VR headséty', 'Virtuální procházky', 'Vzdělávací moduly', 'Vývojové stanice'],
    expert: EXPERTS[0],
    gradient: 'from-violet-600 to-purple-700',
    accent: 'bg-violet-100 text-violet-700',
    badge: 'bg-violet-600',
  },
  {
    id: 'multimedia',
    name: 'Digitální multimediální laboratoř',
    shortName: 'Multimedia',
    description:
      'Profesionální produkce zvuku a videa, grafický design a postprodukce. Zvukotěsná nahrávací kabinka a výkonné pracovní stanice.',
    equipment: ['Zvukotěsná kabinka', 'Střihový software', 'Grafický design', 'Profesionální mikrofony'],
    expert: EXPERTS[1],
    gradient: 'from-teal-500 to-cyan-700',
    accent: 'bg-teal-100 text-teal-700',
    badge: 'bg-teal-600',
  },
  {
    id: 'makerspace',
    name: 'Dílna pro tvůrce',
    shortName: 'Makerspace',
    description:
      'Pro nadšence do „udělej si sám", vynálezce a kreativce všech věkových kategorií. 3D tiskárny, laserové řezačky a elektronické vybavení.',
    equipment: ['3D tiskárny', 'Laserové řezačky', 'Elektronická vybavení', 'Řemeslné materiály'],
    expert: EXPERTS[2],
    gradient: 'from-orange-500 to-amber-600',
    accent: 'bg-orange-100 text-orange-700',
    badge: 'bg-orange-500',
  },
]

const SLOT_TIMES = [
  { start: '09:00', end: '11:00' },
  { start: '11:00', end: '13:00' },
  { start: '13:00', end: '15:00' },
  { start: '15:00', end: '17:00' },
]

// Returns YYYY-MM-DD strings for the next `count` weekdays from today
export function getNextWeekdays(count: number): string[] {
  const days: string[] = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  while (days.length < count) {
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) {
      days.push(d.toISOString().slice(0, 10))
    }
    d.setDate(d.getDate() + 1)
  }
  return days
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export function formatDayName(iso: string): string {
  const names = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']
  return names[new Date(iso).getDay()]
}

export function generateInitialReservations(): Reservation[] {
  const days = getNextWeekdays(10)
  return [
    {
      id: 'res-001',
      labId: 'vr',
      labName: 'Laboratoř virtuální reality',
      date: days[0],
      startTime: '09:00',
      endTime: '11:00',
      userName: 'ZŠ Brno-Královo Pole',
      userType: 'group',
      organizationName: 'ZŠ Brno-Královo Pole',
      groupSize: 20,
      plannedActivity: 'Virtuální exkurze — historické centrum Brna pro žáky 5. třídy',
      expertId: 'lucie-vrbova',
      expertName: 'Lucie Vrbová',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res-002',
      labId: 'multimedia',
      labName: 'Digitální multimediální laboratoř',
      date: days[0],
      startTime: '13:00',
      endTime: '15:00',
      userName: 'Martin Kovář',
      userType: 'individual',
      groupSize: 1,
      plannedActivity: 'Nahrávání podcastu — rozhovor s místními umělci',
      expertId: 'eva-novakova',
      expertName: 'Eva Nováková',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res-003',
      labId: 'makerspace',
      labName: 'Dílna pro tvůrce',
      date: days[1],
      startTime: '11:00',
      endTime: '13:00',
      userName: 'Kroužek robotiky SŠ Technická',
      userType: 'group',
      organizationName: 'SŠ Technická Brno',
      groupSize: 12,
      plannedActivity: '3D tisk komponent pro školní robotický projekt',
      expertId: 'jakub-horak',
      expertName: 'Jakub Horák',
      status: 'pending_expert',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res-004',
      labId: 'vr',
      labName: 'Laboratoř virtuální reality',
      date: days[2],
      startTime: '13:00',
      endTime: '15:00',
      userName: 'Jana Procházková',
      userType: 'individual',
      groupSize: 1,
      plannedActivity: 'Průzkum VR aplikací pro diplomovou práci (HCI)',
      expertId: 'lucie-vrbova',
      expertName: 'Lucie Vrbová',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res-005',
      labId: 'multimedia',
      labName: 'Digitální multimediální laboratoř',
      date: days[3],
      startTime: '09:00',
      endTime: '11:00',
      userName: 'Filmový kroužek DDM',
      userType: 'group',
      organizationName: 'Dům dětí a mládeže Brno',
      groupSize: 8,
      plannedActivity: 'Střih školního dokumentárního filmu',
      expertId: 'eva-novakova',
      expertName: 'Eva Nováková',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res-006',
      labId: 'makerspace',
      labName: 'Dílna pro tvůrce',
      date: days[4],
      startTime: '15:00',
      endTime: '17:00',
      userName: 'Tomáš Nový',
      userType: 'individual',
      groupSize: 1,
      plannedActivity: 'Prototypování obalu pro start-up projekt',
      expertId: 'jakub-horak',
      expertName: 'Jakub Horák',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
  ]
}

export function buildSlots(reservations: Reservation[]): TimeSlot[] {
  const labIds: Array<'vr' | 'multimedia' | 'makerspace'> = ['vr', 'multimedia', 'makerspace']
  const days = getNextWeekdays(14)
  const slots: TimeSlot[] = []

  labIds.forEach((labId) => {
    days.forEach((date) => {
      SLOT_TIMES.forEach((t, i) => {
        const id = `${labId}-${date}-${i}`
        const hit = reservations.find(
          (r) => r.labId === labId && r.date === date && r.startTime === t.start,
        )
        slots.push({
          id,
          labId,
          date,
          startTime: t.start,
          endTime: t.end,
          status: hit ? 'booked' : 'available',
          reservationId: hit?.id,
        })
      })
    })
  })

  return slots
}

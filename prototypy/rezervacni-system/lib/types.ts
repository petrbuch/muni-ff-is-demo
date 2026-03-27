export type LabId = 'vr' | 'multimedia' | 'makerspace'
export type UserRole = 'user' | 'expert' | 'staff'
export type ReservationStatus = 'confirmed' | 'pending_expert' | 'cancelled'
export type SlotStatus = 'available' | 'booked'
export type UserType = 'individual' | 'group'

export interface Expert {
  id: string
  name: string
  role: string
  labId: LabId
  avatarInitials: string
}

export interface Lab {
  id: LabId
  name: string
  shortName: string
  description: string
  equipment: string[]
  expert: Expert
  gradient: string
  accent: string
  badge: string
}

export interface TimeSlot {
  id: string
  labId: LabId
  date: string
  startTime: string
  endTime: string
  status: SlotStatus
  reservationId?: string
}

export interface Reservation {
  id: string
  labId: LabId
  labName: string
  date: string
  startTime: string
  endTime: string
  userName: string
  userType: UserType
  organizationName?: string
  groupSize: number
  plannedActivity: string
  expertId: string
  expertName: string
  status: ReservationStatus
  createdAt: string
}

export interface BookingFormData {
  userName: string
  userType: UserType
  organizationName: string
  groupSize: number
  plannedActivity: string
}

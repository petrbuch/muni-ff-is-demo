'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Reservation, TimeSlot, UserRole } from './types'
import { generateInitialReservations, buildSlots } from './mockData'

interface AppState {
  role: UserRole
  setRole: (r: UserRole) => void
  reservations: Reservation[]
  slots: TimeSlot[]
  addReservation: (r: Reservation) => void
  confirmReservation: (id: string) => void
  cancelReservation: (id: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('user')
  const [reservations, setReservations] = useState<Reservation[]>(() =>
    generateInitialReservations(),
  )
  const [slots, setSlots] = useState<TimeSlot[]>(() =>
    buildSlots(generateInitialReservations()),
  )

  const addReservation = useCallback((r: Reservation) => {
    setReservations((prev) => {
      const next = [...prev, r]
      setSlots(buildSlots(next))
      return next
    })
  }, [])

  const confirmReservation = useCallback((id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'confirmed' } : r)),
    )
  }, [])

  const cancelReservation = useCallback((id: string) => {
    setReservations((prev) => {
      const next: Reservation[] = prev.map((r) =>
        r.id === id ? { ...r, status: 'cancelled' as const } : r,
      )
      setSlots(buildSlots(next.filter((r) => r.status !== 'cancelled')))
      return next
    })
  }, [])

  return (
    <AppContext.Provider
      value={{ role, setRole, reservations, slots, addReservation, confirmReservation, cancelReservation }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

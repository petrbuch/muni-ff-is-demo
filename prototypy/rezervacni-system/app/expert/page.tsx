'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Clock, Users, User, AlertCircle, CalendarDays } from 'lucide-react'
import clsx from 'clsx'
import { useApp } from '@/lib/context'
import { LABS, formatDate, formatDayName, getNextWeekdays } from '@/lib/mockData'
import type { Reservation } from '@/lib/types'

const EXPERT_LAB_ID = 'vr' // Lucie Vrbová — VR lab

export default function ExpertPage() {
  const { reservations, confirmReservation, cancelReservation, role } = useApp()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'availability'>('upcoming')
  const [availability, setAvailability] = useState<Record<string, boolean>>({})

  const lab = LABS.find((l) => l.id === EXPERT_LAB_ID)!

  const myReservations = reservations
    .filter((r) => r.labId === EXPERT_LAB_ID && r.status !== 'cancelled')
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))

  const pending = myReservations.filter((r) => r.status === 'pending_expert')
  const confirmed = myReservations.filter((r) => r.status === 'confirmed')

  if (role !== 'expert') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Přepněte roli</h2>
        <p className="text-gray-500 text-sm">
          Pro zobrazení tohoto pohledu přepněte roli na <strong>Expert</strong> pomocí přepínače vpravo nahoře.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className={`bg-gradient-to-r ${lab.gradient} rounded-2xl p-6 text-white mb-8`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
            {lab.expert.avatarInitials}
          </div>
          <div>
            <div className="text-sm opacity-75">Vítejte zpět</div>
            <div className="text-2xl font-bold">{lab.expert.name}</div>
            <div className="text-sm opacity-90">{lab.expert.role} · {lab.shortName}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-3xl font-bold">{myReservations.length}</div>
            <div className="text-sm opacity-75">nadcházejících</div>
          </div>
        </div>

        {pending.length > 0 && (
          <div className="mt-4 bg-white/20 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span><strong>{pending.length}</strong> {pending.length === 1 ? 'rezervace čeká' : 'rezervace čekají'} na vaše potvrzení</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {([['upcoming', 'Nadcházející rezervace'], ['availability', 'Moje dostupnost']] as const).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {/* Pending first */}
          {pending.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Čeká na potvrzení
              </h3>
              {pending.map((r) => (
                <ReservationCard
                  key={r.id}
                  reservation={r}
                  onConfirm={() => confirmReservation(r.id)}
                  onCancel={() => cancelReservation(r.id)}
                  showActions
                />
              ))}
            </div>
          )}

          {confirmed.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Potvrzené
              </h3>
              {confirmed.map((r) => (
                <ReservationCard
                  key={r.id}
                  reservation={r}
                  onCancel={() => cancelReservation(r.id)}
                  showActions={false}
                />
              ))}
            </div>
          )}

          {myReservations.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <CalendarDays className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Žádné nadcházející rezervace</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'availability' && (
        <AvailabilityEditor availability={availability} setAvailability={setAvailability} />
      )}
    </div>
  )
}

function ReservationCard({
  reservation: r,
  onConfirm,
  onCancel,
  showActions,
}: {
  reservation: Reservation
  onConfirm?: () => void
  onCancel: () => void
  showActions: boolean
}) {
  const statusConfig = {
    confirmed: { label: 'Potvrzeno', cls: 'bg-green-100 text-green-700' },
    pending_expert: { label: 'Čeká na potvrzení', cls: 'bg-amber-100 text-amber-700' },
    cancelled: { label: 'Zrušeno', cls: 'bg-gray-100 text-gray-500' },
  }
  const sc = statusConfig[r.status]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-3">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="font-semibold text-gray-900">
            {formatDayName(r.date)} {formatDate(r.date)}
          </div>
          <div className="text-sm text-gray-500">{r.startTime}–{r.endTime}</div>
        </div>
        <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full shrink-0', sc.cls)}>
          {sc.label}
        </span>
      </div>

      <div className="space-y-1.5 text-sm mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          {r.userType === 'group' ? <Users className="w-4 h-4 text-gray-400" /> : <User className="w-4 h-4 text-gray-400" />}
          <span className="font-medium">{r.organizationName || r.userName}</span>
          <span className="text-gray-400">· {r.groupSize} {r.groupSize === 1 ? 'osoba' : 'osob'}</span>
        </div>
        <div className="text-gray-500 pl-6 leading-snug">{r.plannedActivity}</div>
      </div>

      {showActions && r.status === 'pending_expert' && (
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="w-4 h-4" /> Potvrdit účast
          </button>
          <button
            onClick={onCancel}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {!showActions && r.status === 'confirmed' && (
        <div className="pt-3 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Zrušit rezervaci
          </button>
        </div>
      )}
    </div>
  )
}

function AvailabilityEditor({
  availability,
  setAvailability,
}: {
  availability: Record<string, boolean>
  setAvailability: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}) {
  const days: string[] = getNextWeekdays(10)
  const times = ['09:00–11:00', '11:00–13:00', '13:00–15:00', '15:00–17:00']

  function toggle(key: string) {
    setAvailability((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Označte časy, kdy jste k dispozici. Uživatelé si mohou rezervovat pouze termíny, kdy jste přítomna.
      </p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-5 border-b border-gray-100">
          <div className="p-3 text-xs text-gray-400 font-semibold uppercase" />
          {days.slice(0, 4).map((d) => (
            <div key={d} className="p-3 text-center border-l border-gray-100">
              <div className="text-xs text-gray-500 font-semibold">{formatDayName(d)}</div>
              <div className="text-sm font-bold text-gray-800">{d.slice(8)}.{d.slice(5, 7)}.</div>
            </div>
          ))}
        </div>
        {times.map((t) => (
          <div key={t} className="grid grid-cols-5 border-b border-gray-50 last:border-b-0">
            <div className="p-3 text-xs text-gray-400 flex items-center">{t}</div>
            {days.slice(0, 4).map((d) => {
              const key = `${d}-${t}`
              const on = availability[key] ?? false
              return (
                <div key={d} className="p-2 border-l border-gray-50 flex items-center justify-center">
                  <button
                    onClick={() => toggle(key)}
                    className={clsx(
                      'w-full py-1.5 rounded-lg text-xs font-medium transition-colors',
                      on ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200',
                    )}
                  >
                    {on ? 'Dostupná' : 'Nedost.'}
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <button className="mt-4 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors">
        Uložit dostupnost
      </button>
    </div>
  )
}

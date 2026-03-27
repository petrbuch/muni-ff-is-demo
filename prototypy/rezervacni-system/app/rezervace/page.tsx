'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Check, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'
import { LABS, formatDate, formatDayName, getNextWeekdays } from '@/lib/mockData'
import { useApp } from '@/lib/context'
import type { LabId, BookingFormData, TimeSlot, Lab } from '@/lib/types'

type Step = 'pick' | 'form' | 'success'

function ReservacePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { slots, addReservation, role } = useApp()

  const initialLab = (searchParams.get('lab') as LabId) || 'vr'
  const [activeLab, setActiveLab] = useState<LabId>(initialLab)
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [step, setStep] = useState<Step>('pick')
  const [newResId, setNewResId] = useState('')

  const [form, setForm] = useState<BookingFormData>({
    userName: '',
    userType: 'individual',
    organizationName: '',
    groupSize: 1,
    plannedActivity: '',
  })

  const days = getNextWeekdays(14)
  const weekDays = days.slice(weekOffset * 5, weekOffset * 5 + 5)
  const lab = LABS.find((l) => l.id === activeLab)!

  const labSlots = (date: string, startTime: string) =>
    slots.find((s) => s.labId === activeLab && s.date === date && s.startTime === startTime)

  const TIMES = ['09:00', '11:00', '13:00', '15:00']
  const TIME_LABELS: Record<string, string> = {
    '09:00': '9:00–11:00',
    '11:00': '11:00–13:00',
    '13:00': '13:00–15:00',
    '15:00': '15:00–17:00',
  }
  const TIME_END: Record<string, string> = {
    '09:00': '11:00',
    '11:00': '13:00',
    '13:00': '15:00',
    '15:00': '17:00',
  }

  // Individual users: only first 7 weekdays are bookable
  const maxBookableDayIndex = role === 'user' ? 6 : 13
  const isBlockedByRole = (dateIndex: number) => dateIndex > maxBookableDayIndex

  function handleSlotClick(slot: TimeSlot, dateIndex: number) {
    if (slot.status === 'booked') return
    if (isBlockedByRole(days.indexOf(slot.date))) return
    setSelectedSlot(slot)
    setStep('form')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedSlot) return
    const id = `res-${Date.now()}`
    setNewResId(id)
    addReservation({
      id,
      labId: activeLab,
      labName: lab.name,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: TIME_END[selectedSlot.startTime],
      userName: form.userName,
      userType: form.userType,
      organizationName: form.organizationName || undefined,
      groupSize: form.groupSize,
      plannedActivity: form.plannedActivity,
      expertId: lab.expert.id,
      expertName: lab.expert.name,
      status: 'pending_expert',
      createdAt: new Date().toISOString(),
    })
    setStep('success')
  }

  if (step === 'success' && selectedSlot) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Rezervace potvrzena!</h1>
          <p className="text-gray-500 mb-6">
            Na váš e-mail jsme odeslali potvrzení. Expertka/expert se s vámi spojí před termínem.
          </p>

          <div className="text-left bg-gray-50 rounded-xl p-4 space-y-2 text-sm mb-6">
            <Row label="Laboratoř" value={lab.name} />
            <Row label="Datum" value={formatDate(selectedSlot.date)} />
            <Row label="Čas" value={TIME_LABELS[selectedSlot.startTime]} />
            <Row label="Expert/ka" value={lab.expert.name} />
            <Row label="Jméno / org." value={form.organizationName || form.userName} />
            <Row label="Aktivita" value={form.plannedActivity} />
            <Row
              label="Stav"
              value={
                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                  Čeká na potvrzení experta
                </span>
              }
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setStep('pick'); setSelectedSlot(null); setForm({ userName: '', userType: 'individual', organizationName: '', groupSize: 1, plannedActivity: '' }) }}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Další rezervace
            </button>
            <Link href="/" className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold text-center hover:bg-violet-700 transition-colors">
              Zpět domů
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'form' && selectedSlot) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10">
        <button onClick={() => setStep('pick')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Zpět na výběr termínu
        </button>

        <div className={`bg-gradient-to-r ${lab.gradient} rounded-2xl p-5 text-white mb-6`}>
          <div className="text-xs font-semibold uppercase tracking-widest opacity-75 mb-1">{lab.shortName}</div>
          <div className="font-bold text-lg">{formatDayName(selectedSlot.date)} {formatDate(selectedSlot.date)}</div>
          <div className="text-sm opacity-90">{TIME_LABELS[selectedSlot.startTime]} · Expert: {lab.expert.name}</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="font-bold text-gray-900 text-lg">Detaily rezervace</h2>

          {/* User type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Typ rezervace</label>
            <div className="flex gap-3">
              {([['individual', 'Jednotlivec'], ['group', 'Skupina / škola / org.']] as const).map(([val, lbl]) => (
                <label key={val} className={clsx('flex-1 flex items-center gap-2 border rounded-xl px-3 py-2.5 cursor-pointer text-sm transition-colors', form.userType === val ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-gray-200 text-gray-600')}>
                  <input type="radio" name="userType" value={val} checked={form.userType === val} onChange={() => setForm((f) => ({ ...f, userType: val }))} className="hidden" />
                  <span className={clsx('w-3.5 h-3.5 rounded-full border-2 shrink-0', form.userType === val ? 'border-violet-500 bg-violet-500' : 'border-gray-300')} />
                  {lbl}
                </label>
              ))}
            </div>
          </div>

          {form.userType === 'group' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Název organizace / školy <Required /></label>
              <input required value={form.organizationName} onChange={(e) => setForm((f) => ({ ...f, organizationName: e.target.value }))} placeholder="ZŠ Brno-Královo Pole" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jméno a příjmení <Required /></label>
              <input required value={form.userName} onChange={(e) => setForm((f) => ({ ...f, userName: e.target.value }))} placeholder="Jana Procházková" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Počet účastníků <Required /></label>
            <input required type="number" min={1} max={30} value={form.groupSize} onChange={(e) => setForm((f) => ({ ...f, groupSize: Number(e.target.value) }))} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plánovaná aktivita <Required /></label>
            <textarea required rows={3} value={form.plannedActivity} onChange={(e) => setForm((f) => ({ ...f, plannedActivity: e.target.value }))} placeholder="Popište, co plánujete dělat. Expert se tak může připravit." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none" />
            <p className="text-xs text-gray-400 mt-1">Expert uvidí tuto informaci při přijmutí rezervace.</p>
          </div>

          <button type="submit" className={`w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r ${lab.gradient} hover:opacity-90 transition-opacity`}>
            Potvrdit rezervaci
          </button>
        </form>
      </div>
    )
  }

  // Step: pick slot
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Zpět na přehled laboratoří
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Výběr termínu</h1>

      {/* Lab tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {LABS.map((l) => (
          <button
            key={l.id}
            onClick={() => { setActiveLab(l.id); setSelectedSlot(null) }}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
              activeLab === l.id
                ? `text-white bg-gradient-to-r ${l.gradient}`
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50',
            )}
          >
            {l.shortName}
          </button>
        ))}
      </div>

      {/* Expert info */}
      <div className="flex items-center gap-3 mb-5 p-3 bg-white rounded-xl border border-gray-100 shadow-sm w-fit">
        <div className={`w-9 h-9 rounded-full ${lab.badge} flex items-center justify-center text-white text-sm font-bold`}>
          {lab.expert.avatarInitials}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">{lab.expert.name}</div>
          <div className="text-xs text-gray-400">{lab.expert.role}</div>
        </div>
      </div>

      {/* Role notice for individual users */}
      {role === 'user' && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-sm text-amber-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
          <span>Jako individuální uživatel lze rezervovat pouze termíny v nejbližších 7 dnech. Pro delší horizont rezervujte jako škola nebo organizace.</span>
        </div>
      )}

      {/* Week navigation */}
      <div className="flex items-center gap-3 mb-4">
        <button disabled={weekOffset === 0} onClick={() => setWeekOffset((w) => w - 1)} className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-medium text-gray-700">
          {formatDate(weekDays[0])} — {formatDate(weekDays[weekDays.length - 1])}
        </span>
        <button disabled={weekOffset === 1} onClick={() => setWeekOffset((w) => w + 1)} className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slot grid */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-6 border-b border-gray-100">
          <div className="p-3 text-xs font-semibold text-gray-400 uppercase" />
          {weekDays.map((d) => {
            const idx = days.indexOf(d)
            const blocked = isBlockedByRole(idx)
            return (
              <div key={d} className={clsx('p-3 text-center border-l border-gray-100', blocked && 'opacity-40')}>
                <div className="text-xs font-semibold text-gray-500">{formatDayName(d)}</div>
                <div className="text-sm font-bold text-gray-800">{d.slice(8)}.{d.slice(5, 7)}.</div>
              </div>
            )
          })}
        </div>

        {/* Slot rows */}
        {TIMES.map((time) => (
          <div key={time} className="grid grid-cols-6 border-b border-gray-50 last:border-b-0">
            <div className="p-3 text-xs text-gray-400 font-medium flex items-center">{TIME_LABELS[time]}</div>
            {weekDays.map((d) => {
              const slot = labSlots(d, time)
              const dayIdx = days.indexOf(d)
              const blocked = isBlockedByRole(dayIdx)
              const booked = slot?.status === 'booked'
              return (
                <div key={d} className="p-2 border-l border-gray-50 flex items-center justify-center">
                  {booked ? (
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-lg px-2 py-1.5 w-full text-center">Obsazeno</span>
                  ) : blocked ? (
                    <span className="text-xs text-gray-300 bg-gray-50 rounded-lg px-2 py-1.5 w-full text-center">—</span>
                  ) : (
                    <button
                      onClick={() => slot && handleSlotClick(slot, dayIdx)}
                      className={`text-xs font-medium rounded-lg px-2 py-1.5 w-full text-center transition-colors bg-green-50 text-green-700 hover:bg-green-100`}
                    >
                      Volný
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-5 mt-3 text-xs text-gray-400">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-100" />Volný</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-100" />Obsazeno</span>
        {role === 'user' && <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-50" />Nedostupné (individuální horizon)</span>}
      </div>
    </div>
  )
}

function Required() {
  return <span className="text-red-400">*</span>
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-800 font-medium text-right">{value}</span>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense>
      <ReservacePage />
    </Suspense>
  )
}

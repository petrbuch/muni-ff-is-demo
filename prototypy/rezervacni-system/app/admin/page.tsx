'use client'

import { useState } from 'react'
import { LayoutDashboard, Filter, Users, User, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import clsx from 'clsx'
import { useApp } from '@/lib/context'
import { LABS, formatDate, formatDayName } from '@/lib/mockData'
import type { LabId, ReservationStatus } from '@/lib/types'

const STATUS_CONFIG: Record<ReservationStatus, { label: string; icon: React.ReactNode; cls: string }> = {
  confirmed: {
    label: 'Potvrzeno',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    cls: 'bg-green-100 text-green-700',
  },
  pending_expert: {
    label: 'Čeká na experta',
    icon: <Clock className="w-3.5 h-3.5" />,
    cls: 'bg-amber-100 text-amber-700',
  },
  cancelled: {
    label: 'Zrušeno',
    icon: <XCircle className="w-3.5 h-3.5" />,
    cls: 'bg-gray-100 text-gray-500',
  },
}

export default function AdminPage() {
  const { reservations, role } = useApp()
  const [labFilter, setLabFilter] = useState<LabId | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'all'>('all')

  if (role !== 'staff') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Přepněte roli</h2>
        <p className="text-gray-500 text-sm">
          Pro zobrazení správy přepněte roli na <strong>Zaměstnanec</strong> pomocí přepínače vpravo nahoře.
        </p>
      </div>
    )
  }

  const today = new Date().toISOString().slice(0, 10)

  const active = reservations.filter((r) => r.status !== 'cancelled')
  const todayRes = active.filter((r) => r.date === today)
  const pendingRes = active.filter((r) => r.status === 'pending_expert')

  const labCounts = LABS.map((l) => ({
    lab: l,
    count: active.filter((r) => r.labId === l.id).length,
  }))

  const filtered = reservations
    .filter((r) => labFilter === 'all' || r.labId === labFilter)
    .filter((r) => statusFilter === 'all' || r.status === statusFilter)
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Přehled rezervací</h1>
          <p className="text-sm text-gray-500">Správa · Marek Dvořák</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Dnes" value={todayRes.length} sub="rezervací" accent="violet" />
        <StatCard label="Celkem aktivní" value={active.length} sub="rezervací" accent="teal" />
        <StatCard label="Čeká na experta" value={pendingRes.length} sub="nevyřízených" accent="amber" />
        <StatCard label="Zrušeno" value={reservations.filter((r) => r.status === 'cancelled').length} sub="celkem" accent="gray" />
      </div>

      {/* Lab breakdown */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {labCounts.map(({ lab, count }) => (
          <div key={lab.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lab.gradient} flex items-center justify-center text-white font-bold text-sm`}>
              {lab.expert.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">{lab.shortName}</div>
              <div className="text-xs text-gray-400">{lab.expert.name}</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{count}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-gray-400 shrink-0" />
        <span className="text-sm font-medium text-gray-600">Filtr:</span>

        <div className="flex gap-1.5 flex-wrap">
          <FilterChip active={labFilter === 'all'} onClick={() => setLabFilter('all')}>Všechny laboratoře</FilterChip>
          {LABS.map((l) => (
            <FilterChip key={l.id} active={labFilter === l.id} onClick={() => setLabFilter(l.id)}>
              {l.shortName}
            </FilterChip>
          ))}
        </div>

        <div className="w-px h-5 bg-gray-200 hidden sm:block" />

        <div className="flex gap-1.5 flex-wrap">
          <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>Všechny stavy</FilterChip>
          <FilterChip active={statusFilter === 'confirmed'} onClick={() => setStatusFilter('confirmed')}>Potvrzené</FilterChip>
          <FilterChip active={statusFilter === 'pending_expert'} onClick={() => setStatusFilter('pending_expert')}>Čeká na experta</FilterChip>
          <FilterChip active={statusFilter === 'cancelled'} onClick={() => setStatusFilter('cancelled')}>Zrušené</FilterChip>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <th className="text-left px-4 py-3">Datum</th>
                <th className="text-left px-4 py-3">Čas</th>
                <th className="text-left px-4 py-3">Laboratoř</th>
                <th className="text-left px-4 py-3">Uživatel / Organizace</th>
                <th className="text-left px-4 py-3">Aktivita</th>
                <th className="text-left px-4 py-3">Expert</th>
                <th className="text-left px-4 py-3">Stav</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    Žádné záznamy
                  </td>
                </tr>
              ) : (
                filtered.map((r) => {
                  const lab = LABS.find((l) => l.id === r.labId)!
                  const sc = STATUS_CONFIG[r.status]
                  return (
                    <tr key={r.id} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                        {formatDayName(r.date)} {formatDate(r.date)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {r.startTime}–{r.endTime}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${lab.accent}`}>
                          {lab.shortName}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-gray-800">
                          {r.userType === 'group'
                            ? <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            : <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          }
                          <span className="font-medium">{r.organizationName || r.userName}</span>
                          <span className="text-gray-400 text-xs">({r.groupSize})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">
                        {r.plannedActivity}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {r.expertName}
                      </td>
                      <td className="px-4 py-3">
                        <span className={clsx('inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full', sc.cls)}>
                          {sc.icon}
                          {sc.label}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">Celkem: {filtered.length} záznamů</p>
    </div>
  )
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: number
  sub: string
  accent: 'violet' | 'teal' | 'amber' | 'gray'
}) {
  const colors = {
    violet: 'text-violet-600 bg-violet-50',
    teal: 'text-teal-600 bg-teal-50',
    amber: 'text-amber-600 bg-amber-50',
    gray: 'text-gray-500 bg-gray-100',
  }
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className={clsx('text-3xl font-bold mb-0.5', colors[accent].split(' ')[0])}>{value}</div>
      <div className="text-sm font-semibold text-gray-800">{label}</div>
      <div className="text-xs text-gray-400">{sub}</div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-3 py-1 rounded-full text-xs font-medium transition-colors',
        active
          ? 'bg-violet-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      )}
    >
      {children}
    </button>
  )
}

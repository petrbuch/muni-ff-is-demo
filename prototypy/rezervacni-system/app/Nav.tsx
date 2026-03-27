'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import type { UserRole } from '@/lib/types'
import clsx from 'clsx'

const ROLES: { value: UserRole; label: string; hint: string }[] = [
  { value: 'user', label: 'Uživatel', hint: 'Jana Procházková' },
  { value: 'expert', label: 'Expert', hint: 'Lucie Vrbová (VR)' },
  { value: 'staff', label: 'Zaměstnanec', hint: 'Marek Dvořák' },
]

export default function Nav() {
  const { role, setRole } = useApp()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const current = ROLES.find((r) => r.value === role)!

  const navLinks = [
    { href: '/', label: 'Laboratoře' },
    { href: '/rezervace', label: 'Rezervace' },
    ...(role === 'expert' ? [{ href: '/expert', label: 'Můj přehled' }] : []),
    ...(role === 'staff' ? [{ href: '/admin', label: 'Správa' }] : []),
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 shrink-0">
          <BookOpen className="w-5 h-5 text-violet-600" />
          <span className="hidden sm:inline">Knihovna Budoucnost</span>
          <span className="sm:hidden">Budoucnost</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                pathname === l.href
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Role switcher */}
        <div className="relative shrink-0">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="hidden sm:inline text-gray-400 text-xs">Demo:</span>
            <span className="font-medium">{current.label}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100 font-medium uppercase tracking-wide">
                Přepnout pohled
              </div>
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => { setRole(r.value); setOpen(false) }}
                  className={clsx(
                    'w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 transition-colors',
                    role === r.value && 'bg-violet-50',
                  )}
                >
                  <div className={clsx('font-medium', role === r.value ? 'text-violet-700' : 'text-gray-900')}>
                    {r.label}
                  </div>
                  <div className="text-xs text-gray-400">{r.hint}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

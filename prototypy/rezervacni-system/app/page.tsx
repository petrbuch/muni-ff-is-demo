'use client'

import Link from 'next/link'
import { ArrowRight, Users, User, Clock } from 'lucide-react'
import { LABS } from '@/lib/mockData'
import { useApp } from '@/lib/context'

export default function Home() {
  const { reservations } = useApp()
  const today = new Date().toISOString().slice(0, 10)
  const todayCount = reservations.filter((r) => r.date === today && r.status !== 'cancelled').length

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Technologické laboratoře
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Rezervujte si čas<br />v laboratořích Budoucnosti
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Školy, neziskové organizace i jednotlivci. Každá rezervace zahrnuje odborného průvodce z řad našich technologických expertů.
        </p>

        {/* Quick stats */}
        <div className="flex justify-center gap-8 mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-violet-400" />
            <span>Dnes: <strong className="text-gray-900">{todayCount} rezervací</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-violet-400" />
            <span>Priority: <strong className="text-gray-900">školy &amp; organizace</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-violet-400" />
            <span>Jednotlivci: <strong className="text-gray-900">7 dní dopředu</strong></span>
          </div>
        </div>
      </div>

      {/* Lab cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {LABS.map((lab) => (
          <div
            key={lab.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
          >
            {/* Gradient header */}
            <div className={`bg-gradient-to-br ${lab.gradient} p-6 text-white`}>
              <div className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">
                {lab.shortName}
              </div>
              <h2 className="text-xl font-bold leading-tight">{lab.name}</h2>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{lab.description}</p>

              {/* Equipment */}
              <ul className="space-y-1 mb-5">
                {lab.equipment.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className={`w-1.5 h-1.5 rounded-full ${lab.badge} shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Expert */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-3 mb-5">
                <div className={`w-8 h-8 rounded-full ${lab.badge} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {lab.expert.avatarInitials}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{lab.expert.name}</div>
                  <div className="text-xs text-gray-400">{lab.expert.role}</div>
                </div>
              </div>

              <Link
                href={`/rezervace?lab=${lab.id}`}
                className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${lab.gradient} hover:opacity-90 transition-opacity`}
              >
                Rezervovat termín
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Info strip */}
      <div className="mt-12 grid sm:grid-cols-3 gap-4 text-sm">
        {[
          {
            title: 'Školy a organizace',
            body: 'Rezervace s předstihem, možnost opakujících se termínů na celý semestr. Expert je součástí každé rezervace.',
          },
          {
            title: 'Individuální uživatelé',
            body: 'Přístup k volným termínům maximálně 7 dní dopředu po skupinových rezervacích. Nutná registrace v knihovním IS.',
          },
          {
            title: 'Technologičtí experti',
            body: 'Každá laboratoř má svého specialistu. Sdělte nám předem, co plánujete — expert se na vás připraví.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

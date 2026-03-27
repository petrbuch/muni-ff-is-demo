import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '@/lib/context'
import Nav from './Nav'

export const metadata: Metadata = {
  title: 'Knihovna Budoucnost — Rezervační systém',
  description: 'Rezervace technologických laboratoří Komunitní knihovny Budoucnost',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className="bg-gray-50 min-h-screen">
        <AppProvider>
          <Nav />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  )
}

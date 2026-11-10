import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'IA Tutors — Tutos & Configs IA',
  description: 'Tutoriels, configurations de modèles et applications interactives sur l\'IA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-8">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
            IA Tutors — Construit avec Next.js + Supabase + Vercel
          </div>
        </footer>
      </body>
    </html>
  )
}

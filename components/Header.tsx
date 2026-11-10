'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const nav = [
    { href: '/', label: 'Accueil' },
    { href: '/tuto', label: 'Tutos' },
    { href: '/config', label: 'Configs' },
    { href: '/apps', label: 'Apps' },
  ]
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">IA Tutors</Link>
          <nav className="flex items-center gap-6 text-sm">
            {nav.map(item => (
              <Link key={item.href} href={item.href} className={`transition-colors hover:text-primary ${
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item.label}
              </Link>
            ))}
            <Link href="/login" className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Connexion
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

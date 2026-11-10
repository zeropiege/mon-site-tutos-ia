import { getSession } from '@/lib/auth'
import { getAllTutorials, getAllConfigs } from '@/lib/content'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login?redirectTo=/dashboard')

  const tutorials = getAllTutorials().filter(t => t.author_id === session.user.id)
  const configs = getAllConfigs().filter(c => c.author_id === session.user.id)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">Gérez vos tutoriels et configurations</p>
        </div>
        <Link href="/dashboard/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          + Nouveau contenu
        </Link>
      </div>

      <div className="grid gap-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Mes tutoriels ({tutorials.length})</h2>
          </div>
          {tutorials.length === 0 ? (
            <div className="card p-8 text-center text-muted-foreground">
              Aucun tutoriel. <Link href="/dashboard/new" className="text-primary hover:underline">Créer le premier</Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tutorials.map(t => (
                <article key={t.slug} className="card p-4">
                  <h3 className="font-semibold mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t.category}</p>
                  <div className="flex gap-2">
                    <Link href={`/tuto/${t.slug}`} className="text-sm text-primary hover:underline">Voir</Link>
                    <Link href={`/dashboard/edit/${t.slug}`} className="text-sm text-muted-foreground hover:underline">Éditer</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Mes configurations ({configs.length})</h2>
          </div>
          {configs.length === 0 ? (
            <div className="card p-8 text-center text-muted-foreground">
              Aucune configuration. <Link href="/dashboard/new" className="text-primary hover:underline">Créer la première</Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {configs.map(c => (
                <article key={c.slug} className="card p-4">
                  <h3 className="font-semibold mb-1">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{c.model}</p>
                  <div className="flex gap-2">
                    <Link href={`/config/${c.slug}`} className="text-sm text-primary hover:underline">Voir</Link>
                    <Link href={`/dashboard/edit/${c.slug}`} className="text-sm text-muted-foreground hover:underline">Éditer</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

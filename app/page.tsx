import Link from 'next/link'
import { getAllTutorials, getAllConfigs } from '@/lib/content'

export default function Home() {
  const tutorials = getAllTutorials().slice(0, 3)
  const configs = getAllConfigs().slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Tutos, configs & apps <span className="text-primary">pour l'IA</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Apprenez à faire tourner l'IA localement, configurez vos modèles et testez des applications interactives — le tout gratuitement et en toute confidentialité.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/tuto" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
            Explorer les tutos
          </Link>
          <Link href="/config" className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors">
            Voir les configs
          </Link>
        </div>
      </section>

      {/* Featured Tutorials */}
      {tutorials.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Tutoriels récents</h2>
            <Link href="/tuto" className="text-sm text-primary hover:underline">Voir tous →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutorials.map(tuto => (
              <article key={tuto.slug} className="card group">
                <div className="p-6">
                  {tuto.category && (
                    <span className="mb-2 inline-block text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {tuto.category}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/tuto/${tuto.slug}`}>{tuto.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{tuto.content.slice(0, 150)}</p>
                  <div className="flex flex-wrap gap-1">
                    {tuto.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Featured Configs */}
      {configs.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Configurations populaires</h2>
            <Link href="/config" className="text-sm text-primary hover:underline">Voir toutes →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {configs.map(config => (
              <article key={config.slug} className="card group">
                <div className="p-6">
                  {config.model && (
                    <span className="mb-2 inline-block text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {config.model}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/config/${config.slug}`}>{config.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{config.content.slice(0, 150)}</p>
                  <div className="flex flex-wrap gap-1">
                    {config.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Apps CTA */}
      <section className="text-center">
        <div className="card p-8 sm:p-12">
          <h2 className="text-2xl font-bold mb-4">Applications interactives</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Testez vos modèles, comparez les performances et expérimentez avec le RAG — le tout dans votre navigateur.
          </p>
          <Link href="/apps" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            <span>→</span> Découvrir les Apps
          </Link>
        </div>
      </section>
    </div>
  )
}

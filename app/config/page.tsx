import { getAllConfigs } from '@/lib/content'
import { ContentCard } from '@/components/ContentCard'
import Link from 'next/link'

export default function ConfigsPage() {
  const configs = getAllConfigs()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Configurations</h1>
        <p className="text-muted-foreground mt-2">Configurations de modèles, serveurs d'inférence et APIs</p>
      </div>

      {configs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Aucune configuration pour l'instant.</p>
          <Link href="/dashboard/new" className="text-primary hover:underline mt-4 inline-block">
            Créer la première config
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {configs.map(config => (
            <ContentCard
              key={config.slug}
              title={config.title}
              slug={config.slug}
              category={config.model}
              tags={config.tags}
              excerpt={config.content.slice(0, 150)}
              type="config"
            />
          ))}
        </div>
      )}
    </div>
  )
}

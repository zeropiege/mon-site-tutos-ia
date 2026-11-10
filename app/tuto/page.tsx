import { getAllTutorials } from '@/lib/content'
import { ContentCard } from '@/components/ContentCard'
import Link from 'next/link'

export default function TutorialsPage() {
  const tutorials = getAllTutorials()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tutoriels</h1>
        <p className="text-muted-foreground mt-2">Apprenez l'IA locale, RAG, fine-tuning et plus encore</p>
      </div>

      {tutorials.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Aucun tutoriel pour l'instant.</p>
          <Link href="/dashboard/new" className="text-primary hover:underline mt-4 inline-block">
            Créer le premier tutoriel
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map(tuto => (
            <ContentCard
              key={tuto.slug}
              title={tuto.title}
              slug={tuto.slug}
              category={tuto.category}
              tags={tuto.tags}
              excerpt={tuto.content.slice(0, 150)}
              type="tuto"
            />
          ))}
        </div>
      )}
    </div>
  )
}

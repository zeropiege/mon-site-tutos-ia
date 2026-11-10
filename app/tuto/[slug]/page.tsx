import { getTutorialBySlug, getAllTutorials } from '@/lib/content'
import { MarkdownRenderer } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const tutorials = getAllTutorials()
  return tutorials.map(t => ({ slug: t.slug }))
}

export default async function TutorialDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tutorial = getTutorialBySlug(slug)

  if (!tutorial) notFound()

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/tuto" className="text-sm text-primary hover:underline mb-6 inline-block">
        ← Retour aux tutos
      </Link>

      <header className="mb-8">
        {tutorial.category && (
          <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block">
            {tutorial.category}
          </span>
        )}
        <h1 className="text-3xl font-bold tracking-tight mb-4">{tutorial.title}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <time dateTime={tutorial.created_at}>
            {new Date(tutorial.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          {tutorial.tags?.map(tag => (
            <span key={tag} className="bg-muted px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert max-w-none">
        <MarkdownRenderer content={tutorial.content} />
      </div>
    </article>
  )
}

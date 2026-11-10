import { getConfigBySlug, getAllConfigs } from '@/lib/content'
import { MarkdownRenderer } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const configs = getAllConfigs()
  return configs.map(c => ({ slug: c.slug }))
}

export default async function ConfigDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = getConfigBySlug(slug)

  if (!config) notFound()

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/config" className="text-sm text-primary hover:underline mb-6 inline-block">
        ← Retour aux configs
      </Link>

      <header className="mb-8">
        {config.model && (
          <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block">
            {config.model}
          </span>
        )}
        <h1 className="text-3xl font-bold tracking-tight mb-4">{config.title}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <time dateTime={config.created_at}>
            {new Date(config.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          {config.tags?.map(tag => (
            <span key={tag} className="bg-muted px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert max-w-none">
        <MarkdownRenderer content={config.content} />
      </div>
    </article>
  )
}

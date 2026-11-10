import Link from 'next/link'

interface ContentCardProps {
  title: string
  slug: string
  category?: string
  tags?: string[]
  excerpt?: string
  type: 'tuto' | 'config'
}

export function ContentCard({ title, slug, category, tags = [], excerpt, type }: ContentCardProps) {
  const basePath = type === 'tuto' ? '/tuto' : '/config'
  return (
    <article className="card group">
      <div className="p-6">
        {category && (
          <span className="mb-2 inline-block text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
            {category}
          </span>
        )}
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          <Link href={`${basePath}/${slug}`}>{title}</Link>
        </h3>
        {excerpt && <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{excerpt}</p>}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

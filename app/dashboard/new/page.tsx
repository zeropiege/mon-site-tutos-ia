'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewContentPage() {
  const router = useRouter()
  const [type, setType] = useState<'tuto' | 'config'>('tuto')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [model, setModel] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const frontmatter = {
      title,
      category: type === 'tuto' ? category : undefined,
      model: type === 'config' ? model : undefined,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      published,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const fmLines = Object.entries(frontmatter)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? JSON.stringify(v) : v}`)
    const markdown = `---\n${fmLines.join('\n')}\n---\n\n${content}`

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, slug, markdown }),
      })
      if (!res.ok) throw new Error('Erreur lors de la création')
      router.push(type === 'tuto' ? `/tuto/${slug}` : `/config/${slug}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Nouveau {type === 'tuto' ? 'tutoriel' : 'configuration'}</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-lg text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="tuto"
                checked={type === 'tuto'}
                onChange={e => setType(e.target.value as 'tuto' | 'config')}
                className="text-primary focus:ring-primary"
              />
              Tutoriel
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="config"
                checked={type === 'config'}
                onChange={e => setType(e.target.value as 'tuto' | 'config')}
                className="text-primary focus:ring-primary"
              />
              Configuration
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Titre *</label>
          <input
            id="title"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {type === 'tuto' && (
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">Catégorie</label>
            <input
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Démarrage, Avancé, RAG, Fine-tuning..."
            />
          </div>
        )}

        {type === 'config' && (
          <div>
            <label htmlFor="model" className="block text-sm font-medium mb-1">Modèle</label>
            <input
              id="model"
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="llama3.2, mistral, codellama..."
            />
          </div>
        )}

        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags (séparés par des virgules)</label>
          <input
            id="tags"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="ollama, local, débutant"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Contenu (Markdown) *</label>
          <textarea
            id="content"
            required
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={20}
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            placeholder="# Titre\n\nContenu en **Markdown**..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
            className="text-primary focus:ring-primary"
          />
          <label htmlFor="published" className="text-sm">Publié</label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Création...' : 'Publier'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}

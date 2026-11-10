'use client'

import Link from 'next/link'

const apps = [
  {
    name: 'Chat Local',
    description: 'Interface de chat avec vos modèles Ollama locaux',
    status: 'Bientôt disponible',
    icon: '💬'
  },
  {
    name: 'RAG Playground',
    description: 'Testez la recherche vectorielle sur vos documents',
    status: 'Bientôt disponible',
    icon: '🔍'
  },
  {
    name: 'Model Benchmark',
    description: 'Comparez les performances de vos modèles',
    status: 'Bientôt disponible',
    icon: '⚡'
  },
  {
    name: 'Prompt Lab',
    description: 'Expérimentez et partagez vos prompts',
    status: 'Bientôt disponible',
    icon: '🧪'
  },
]

export default function AppsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Applications interactives</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Outils pour tester, comparer et expérimenter avec vos modèles d'IA locaux.
          Disponibles prochainement.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {apps.map(app => (
          <article key={app.name} className="card p-6 text-center group">
            <div className="text-4xl mb-4">{app.icon}</div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {app.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">{app.description}</p>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
              {app.status}
            </span>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/dashboard/new" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          <span>+</span> Proposer une application
        </Link>
      </div>
    </div>
  )
}

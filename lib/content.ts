import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export interface ContentItem {
  slug: string
  title: string
  content: string
  category?: string
  tags?: string[]
  model?: string
  published: boolean
  author_id?: string
  created_at: string
  updated_at: string
}

function getContentFiles(type: 'tuto' | 'config'): string[] {
  const dir = path.join(contentDir, type)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(f => f.endsWith('.md'))
}

function parseFile(type: 'tuto' | 'config', file: string): ContentItem {
  const fullPath = path.join(contentDir, type, file)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug: file.replace('.md', ''),
    title: data.title || file.replace('.md', ''),
    content,
    category: data.category,
    tags: data.tags || [],
    model: data.model,
    published: data.published ?? true,
    author_id: data.author_id,
    created_at: data.created_at || new Date().toISOString(),
    updated_at: data.updated_at || new Date().toISOString(),
  }
}

export function getAllTutorials(): ContentItem[] {
  return getContentFiles('tuto').map(f => parseFile('tuto', f)).filter(t => t.published)
}

export function getAllConfigs(): ContentItem[] {
  return getContentFiles('config').map(f => parseFile('config', f)).filter(t => t.published)
}

export function getTutorialBySlug(slug: string): ContentItem | null {
  const files = getContentFiles('tuto')
  const file = files.find(f => f.replace('.md', '') === slug)
  if (!file) return null
  return parseFile('tuto', file)
}

export function getConfigBySlug(slug: string): ContentItem | null {
  const files = getContentFiles('config')
  const file = files.find(f => f.replace('.md', '') === slug)
  if (!file) return null
  return parseFile('config', file)
}

import { createSupabaseServer } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { type, slug, markdown } = await request.json()

    if (!type || !slug || !markdown) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    const contentDir = path.join(process.cwd(), 'content', type === 'tuto' ? 'tuto' : 'config')
    const filePath = path.join(contentDir, `${slug}.md`)

    // Ensure directory exists
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true })
    }

    // Write the markdown file
    fs.writeFileSync(filePath, markdown)

    return NextResponse.json({ success: true, slug })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

import { createClient } from '@supabase/supabase-js'

describe('supabase client', () => {
  it('should create a supabase client with proper config', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'

    const { supabase } = require('./supabase')
    expect(supabase).toBeDefined()
  })
})
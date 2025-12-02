import { createClient } from '@supabase/supabase-js';

// Variáveis de ambiente - devem ser configuradas no .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase URL ou Key não configurados. Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


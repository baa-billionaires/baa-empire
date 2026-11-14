-- =========================================================================
-- BAA UA-AIDC MODULE 5 — NOVA PROTOCOL V16
-- THE LIVING INTERNET — SUPABASE SCHEMA & RLS POLICIES
-- =========================================================================

-- 1. LIVING APPS (No static HTML - living organisms)
CREATE TABLE IF NOT EXISTS public.living_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id TEXT NOT NULL,
  creator_email TEXT NOT NULL,
  creator_wallet TEXT NOT NULL,
  idea_coin_id TEXT NOT NULL,
  app_name TEXT NOT NULL,
  prompt TEXT NOT NULL,
  nova_url TEXT UNIQUE NOT NULL, -- e.g. nova://yoruba-route
  origin_dna JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'alive' CHECK (status IN ('alive', 'mutated', 'dead_copy_detected')),
  heartbeat_last TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  mutation_count INTEGER NOT NULL DEFAULT 0,
  current_endpoint TEXT NOT NULL DEFAULT '/api/v16/root',
  total_clicks INTEGER NOT NULL DEFAULT 0,
  total_royalties_paid NUMERIC(14, 4) NOT NULL DEFAULT 0.0000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. ORIGIN PIXELS (Every pixel has a father)
CREATE TABLE IF NOT EXISTS public.origin_pixels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  living_app_id UUID REFERENCES public.living_apps(id) ON DELETE CASCADE,
  element_id TEXT NOT NULL,
  element_type TEXT NOT NULL CHECK (element_type IN ('button', 'input', 'card', 'function', 'badge', 'stream')),
  origin_dna JSONB NOT NULL DEFAULT '{}'::jsonb,
  clicks INTEGER NOT NULL DEFAULT 0,
  royalties_generated NUMERIC(14, 4) NOT NULL DEFAULT 0.0000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. HEARTBEATS (Proof of Life across 100 CE nodes & 10 Mind Hive agents)
CREATE TABLE IF NOT EXISTS public.heartbeats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  living_app_id UUID REFERENCES public.living_apps(id) ON DELETE CASCADE,
  nova_url TEXT NOT NULL,
  node_count INTEGER NOT NULL DEFAULT 100,
  agent_count INTEGER NOT NULL DEFAULT 10,
  child_coin_id TEXT NOT NULL,
  signature TEXT NOT NULL,
  latency_ms INTEGER NOT NULL DEFAULT 45,
  is_valid BOOLEAN NOT NULL DEFAULT true,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. MUTATIONS (App rewrites itself every 60 seconds)
CREATE TABLE IF NOT EXISTS public.mutations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  living_app_id UUID REFERENCES public.living_apps(id) ON DELETE CASCADE,
  mutation_version INTEGER NOT NULL,
  old_endpoint TEXT NOT NULL,
  new_endpoint TEXT NOT NULL,
  breeder_agent_id TEXT NOT NULL,
  child_coin_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. COPY DETECTIONS (REA becomes marketing & royalty funnel)
CREATE TABLE IF NOT EXISTS public.copy_detections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_app_id UUID REFERENCES public.living_apps(id) ON DELETE CASCADE,
  suspected_copy_url TEXT NOT NULL,
  similarity_score NUMERIC(5, 2) NOT NULL DEFAULT 85.00,
  detected_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  royalty_redirected NUMERIC(14, 4) NOT NULL DEFAULT 0.0000,
  clicks_diverted INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active_redirect'
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.living_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.origin_pixels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heartbeats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mutations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_detections ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ & AUTHENTICATED INSERT/UPDATE POLICIES
CREATE POLICY "Public can view living apps" ON public.living_apps FOR SELECT USING (true);
CREATE POLICY "Public can view heartbeats" ON public.heartbeats FOR SELECT USING (true);
CREATE POLICY "Public can view mutations" ON public.mutations FOR SELECT USING (true);
CREATE POLICY "Public can view origin pixels" ON public.origin_pixels FOR SELECT USING (true);
CREATE POLICY "Public can view copy detections" ON public.copy_detections FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create living apps" ON public.living_apps FOR INSERT WITH CHECK (true);
CREATE POLICY "System can record heartbeats" ON public.heartbeats FOR INSERT WITH CHECK (true);
CREATE POLICY "System can record mutations" ON public.mutations FOR INSERT WITH CHECK (true);

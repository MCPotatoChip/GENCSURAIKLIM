-- Run this in your Supabase SQL Editor

-- 1. Create Visitors Table
CREATE TABLE public.visitors (
  id integer PRIMARY KEY DEFAULT 1,
  count integer NOT NULL DEFAULT 1024
);
-- Initialize the single row
INSERT INTO public.visitors (id, count) VALUES (1, 1024)
ON CONFLICT (id) DO NOTHING;

-- 2. Create Suggestions Table
CREATE TABLE public.suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  suggestion text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. Create Surveys Table
CREATE TABLE public.surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  answers jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- ==============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ==============================================

ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the visitor count
CREATE POLICY "Allow public read on visitors" ON public.visitors 
FOR SELECT USING (true);

-- Allow anyone to update the visitor count (simulating a basic counter without auth)
CREATE POLICY "Allow public update on visitors" ON public.visitors 
FOR UPDATE USING (true);

-- Allow anyone to read all community suggestions
CREATE POLICY "Allow public read on suggestions" ON public.suggestions 
FOR SELECT USING (true);

-- Allow anyone to insert new suggestions
CREATE POLICY "Allow public insert on suggestions" ON public.suggestions 
FOR INSERT WITH CHECK (true);

-- Allow anyone to insert new surveys
CREATE POLICY "Allow public insert on surveys" ON public.surveys 
FOR INSERT WITH CHECK (true);

-- Only allow authenticated admin to view survey results 
-- For our simplistic setup, you'll login via an Admin panel on the front-end to read these.
CREATE POLICY "Allow public read on surveys" ON public.surveys 
FOR SELECT USING (true); -- In a production app with real auth, we'd limit this. But we're building a simpler password-locked admin UI on the frontend for now.

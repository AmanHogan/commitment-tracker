-- updates.sql
-- Run this against any existing commitment-tracker database to bring it to current schema.
-- All statements are idempotent (safe to re-run multiple times).

-- ─── NEW TABLES (not in init.sql) ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.accomplishments (
  id        SERIAL PRIMARY KEY,
  accomplishment TEXT NOT NULL,
  category  TEXT,
  due_date  DATE,
  status    TEXT DEFAULT 'In Progress',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.events (
  id         SERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,
  type       TEXT,
  done       BOOLEAN DEFAULT false,
  started    DATE,
  finished   DATE,
  required   BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.subevents (
  id           SERIAL PRIMARY KEY,
  event_id     INTEGER NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  subevent_name TEXT NOT NULL,
  done         BOOLEAN DEFAULT false,
  started      DATE,
  finished     DATE,
  description  TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.innovation_subevents (
  id            SERIAL PRIMARY KEY,
  event_id      INTEGER NOT NULL REFERENCES public.innovation_events(id) ON DELETE CASCADE,
  subevent_name TEXT NOT NULL,
  done          BOOLEAN DEFAULT false,
  started       DATE,
  finished      DATE,
  description   TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── MISSING COLUMNS ON EXISTING TABLES ─────────────────────────────────────

ALTER TABLE IF EXISTS public.learning_items
  ADD COLUMN IF NOT EXISTS item_date DATE;

ALTER TABLE IF EXISTS public.action_items
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS criticality  TEXT,
  ADD COLUMN IF NOT EXISTS date_started DATE,
  ADD COLUMN IF NOT EXISTS date_finished DATE,
  ADD COLUMN IF NOT EXISTS completed    BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE IF EXISTS public.skills
  ADD COLUMN IF NOT EXISTS date DATE;

-- ─── TYPE CONVERSIONS (safe no-op if already TEXT) ───────────────────────────

ALTER TABLE IF EXISTS public.learning_items
  ALTER COLUMN item_name TYPE TEXT USING item_name::text;

ALTER TABLE IF EXISTS public.one_on_one_documents
  ALTER COLUMN utilization_percentage TYPE TEXT USING utilization_percentage::text;

ALTER TABLE IF EXISTS public.action_items
  ALTER COLUMN name        TYPE TEXT USING name::text,
  ALTER COLUMN criticality TYPE TEXT USING criticality::text;

ALTER TABLE IF EXISTS public.skills
  ALTER COLUMN name TYPE TEXT USING name::text;

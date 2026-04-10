-- Action items migration
-- Run this against your existing database to add completed status and description support.

ALTER TABLE public.action_items
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS completed boolean NOT NULL DEFAULT false;

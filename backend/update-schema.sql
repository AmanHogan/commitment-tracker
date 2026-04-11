-- Canonical existing-database migration for Commitment Tracker.
-- Run this one file against an existing database to update it to the current schema.
-- It creates missing tables, adds missing columns, and converts known long-text fields to TEXT.
-- Use this file for an existing database; use init.sql only for a clean new database.

-- Current model tables. If a table is missing, it will be created.
-- If columns are missing, they will be added.

CREATE TABLE IF NOT EXISTS leadership_events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  done BOOLEAN,
  started DATE,
  finished DATE,
  required BOOLEAN,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leadership_subevents (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES leadership_events(id) ON DELETE CASCADE,
  subevent_name VARCHAR(255) NOT NULL,
  done BOOLEAN,
  started DATE,
  finished DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS business_commitments (
  id SERIAL PRIMARY KEY,
  work_item TEXT NOT NULL,
  started DATE,
  date_completed DATE,
  application_context TEXT,
  description TEXT,
  problem_opportunity TEXT,
  who_benefited TEXT,
  impact TEXT,
  value_categories TEXT[],
  improved_outcomes BOOLEAN DEFAULT false,
  improved_outcomes_text TEXT,
  increased_efficiency BOOLEAN DEFAULT false,
  increased_efficiency_text TEXT,
  reduced_risk_cost BOOLEAN DEFAULT false,
  reduced_risk_cost_text TEXT,
  enhanced_customer_experience BOOLEAN DEFAULT false,
  enhanced_customer_experience_text TEXT,
  enhanced_employee_experience BOOLEAN DEFAULT false,
  enhanced_employee_experience_text TEXT,
  alignment TEXT,
  status_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS learning_items (
  id SERIAL PRIMARY KEY,
  item_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS learning_modules (
  id SERIAL PRIMARY KEY,
  item_id INTEGER NOT NULL REFERENCES learning_items(id) ON DELETE CASCADE,
  module_name TEXT NOT NULL,
  type TEXT,
  hours DECIMAL(10, 2),
  date_started DATE,
  date_finished DATE,
  finished BOOLEAN DEFAULT FALSE,
  required BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS innovation_events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  description TEXT,
  started DATE,
  finished DATE,
  done BOOLEAN NOT NULL,
  required BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS event_sub_items (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES innovation_events(id) ON DELETE CASCADE,
  sub_event_name TEXT NOT NULL,
  description TEXT,
  started DATE,
  finished DATE,
  done BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS action_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  criticality VARCHAR(50),
  date_started DATE,
  date_finished DATE,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS one_on_one_documents (
  id SERIAL PRIMARY KEY,
  document_date DATE NOT NULL,
  business_partner_work TEXT,
  workload_concerns TEXT,
  utilization_percentage TEXT,
  tdp_contributions TEXT,
  training_skills TEXT,
  pursuing_degrees TEXT,
  compliance_percentage TEXT,
  ehs_training_percentage TEXT,
  growth_hub_progress TEXT,
  success_pathways_updated TEXT,
  contingency_training_percentage TEXT,
  innovation_events TEXT,
  accomplishments TEXT,
  challenges TEXT,
  goals TEXT,
  questions TEXT,
  receiving_support TEXT,
  additional_items TEXT,
  out_of_office_plans TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  proficiency INTEGER NOT NULL CHECK (proficiency BETWEEN 1 AND 5),
  date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add missing columns to existing tables without dropping data.
ALTER TABLE IF EXISTS public.action_items
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS criticality VARCHAR(50),
  ADD COLUMN IF NOT EXISTS date_started DATE,
  ADD COLUMN IF NOT EXISTS date_finished DATE,
  ADD COLUMN IF NOT EXISTS completed BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE IF EXISTS public.leadership_events
  ADD COLUMN IF NOT EXISTS event_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS type VARCHAR(255),
  ADD COLUMN IF NOT EXISTS done BOOLEAN,
  ADD COLUMN IF NOT EXISTS started DATE,
  ADD COLUMN IF NOT EXISTS finished DATE,
  ADD COLUMN IF NOT EXISTS required BOOLEAN,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE IF EXISTS public.leadership_subevents
  ADD COLUMN IF NOT EXISTS event_id INTEGER,
  ADD COLUMN IF NOT EXISTS subevent_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS done BOOLEAN,
  ADD COLUMN IF NOT EXISTS started DATE,
  ADD COLUMN IF NOT EXISTS finished DATE,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE IF EXISTS public.business_commitments
  ADD COLUMN IF NOT EXISTS work_item TEXT,
  ADD COLUMN IF NOT EXISTS started DATE,
  ADD COLUMN IF NOT EXISTS date_completed DATE,
  ADD COLUMN IF NOT EXISTS application_context TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS problem_opportunity TEXT,
  ADD COLUMN IF NOT EXISTS who_benefited TEXT,
  ADD COLUMN IF NOT EXISTS impact TEXT,
  ADD COLUMN IF NOT EXISTS value_categories TEXT[],
  ADD COLUMN IF NOT EXISTS improved_outcomes BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS improved_outcomes_text TEXT,
  ADD COLUMN IF NOT EXISTS increased_efficiency BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS increased_efficiency_text TEXT,
  ADD COLUMN IF NOT EXISTS reduced_risk_cost BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS reduced_risk_cost_text TEXT,
  ADD COLUMN IF NOT EXISTS enhanced_customer_experience BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS enhanced_customer_experience_text TEXT,
  ADD COLUMN IF NOT EXISTS enhanced_employee_experience BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS enhanced_employee_experience_text TEXT,
  ADD COLUMN IF NOT EXISTS alignment TEXT,
  ADD COLUMN IF NOT EXISTS status_notes TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE IF EXISTS public.learning_items
  ADD COLUMN IF NOT EXISTS item_name TEXT,
  ADD COLUMN IF NOT EXISTS item_date DATE,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE IF EXISTS public.learning_modules
  ADD COLUMN IF NOT EXISTS item_id INTEGER,
  ADD COLUMN IF NOT EXISTS module_name TEXT,
  ADD COLUMN IF NOT EXISTS type TEXT,
  ADD COLUMN IF NOT EXISTS hours DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS date_started DATE,
  ADD COLUMN IF NOT EXISTS date_finished DATE,
  ADD COLUMN IF NOT EXISTS finished BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS required BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE IF EXISTS public.innovation_events
  ADD COLUMN IF NOT EXISTS event_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS type VARCHAR(255),
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS started DATE,
  ADD COLUMN IF NOT EXISTS finished DATE,
  ADD COLUMN IF NOT EXISTS done BOOLEAN,
  ADD COLUMN IF NOT EXISTS required BOOLEAN,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE IF EXISTS public.event_sub_items
  ADD COLUMN IF NOT EXISTS event_id INTEGER,
  ADD COLUMN IF NOT EXISTS sub_event_name TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS started DATE,
  ADD COLUMN IF NOT EXISTS finished DATE,
  ADD COLUMN IF NOT EXISTS done BOOLEAN,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE IF EXISTS public.one_on_one_documents
  ADD COLUMN IF NOT EXISTS document_date DATE,
  ADD COLUMN IF NOT EXISTS business_partner_work TEXT,
  ADD COLUMN IF NOT EXISTS workload_concerns TEXT,
  ADD COLUMN IF NOT EXISTS utilization_percentage TEXT,
  ADD COLUMN IF NOT EXISTS tdp_contributions TEXT,
  ADD COLUMN IF NOT EXISTS training_skills TEXT,
  ADD COLUMN IF NOT EXISTS pursuing_degrees TEXT,
  ADD COLUMN IF NOT EXISTS compliance_percentage TEXT,
  ADD COLUMN IF NOT EXISTS ehs_training_percentage TEXT,
  ADD COLUMN IF NOT EXISTS growth_hub_progress TEXT,
  ADD COLUMN IF NOT EXISTS success_pathways_updated TEXT,
  ADD COLUMN IF NOT EXISTS contingency_training_percentage TEXT,
  ADD COLUMN IF NOT EXISTS innovation_events TEXT,
  ADD COLUMN IF NOT EXISTS accomplishments TEXT,
  ADD COLUMN IF NOT EXISTS challenges TEXT,
  ADD COLUMN IF NOT EXISTS goals TEXT,
  ADD COLUMN IF NOT EXISTS questions TEXT,
  ADD COLUMN IF NOT EXISTS receiving_support TEXT,
  ADD COLUMN IF NOT EXISTS additional_items TEXT,
  ADD COLUMN IF NOT EXISTS out_of_office_plans TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE IF EXISTS public.skills
  ADD COLUMN IF NOT EXISTS name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS proficiency INTEGER,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Convert some long-text columns from VARCHAR or limited text to TEXT.
-- This is necessary for older databases that may have stored longer values.
ALTER TABLE IF EXISTS public.one_on_one_documents
  ALTER COLUMN business_partner_work TYPE TEXT USING business_partner_work::text,
  ALTER COLUMN workload_concerns TYPE TEXT USING workload_concerns::text,
  ALTER COLUMN tdp_contributions TYPE TEXT USING tdp_contributions::text,
  ALTER COLUMN training_skills TYPE TEXT USING training_skills::text,
  ALTER COLUMN pursuing_degrees TYPE TEXT USING pursuing_degrees::text,
  ALTER COLUMN compliance_percentage TYPE TEXT USING compliance_percentage::text,
  ALTER COLUMN ehs_training_percentage TYPE TEXT USING ehs_training_percentage::text,
  ALTER COLUMN growth_hub_progress TYPE TEXT USING growth_hub_progress::text,
  ALTER COLUMN success_pathways_updated TYPE TEXT USING success_pathways_updated::text,
  ALTER COLUMN contingency_training_percentage TYPE TEXT USING contingency_training_percentage::text,
  ALTER COLUMN innovation_events TYPE TEXT USING innovation_events::text,
  ALTER COLUMN accomplishments TYPE TEXT USING accomplishments::text,
  ALTER COLUMN challenges TYPE TEXT USING challenges::text,
  ALTER COLUMN goals TYPE TEXT USING goals::text,
  ALTER COLUMN questions TYPE TEXT USING questions::text,
  ALTER COLUMN receiving_support TYPE TEXT USING receiving_support::text,
  ALTER COLUMN additional_items TYPE TEXT USING additional_items::text,
  ALTER COLUMN out_of_office_plans TYPE TEXT USING out_of_office_plans::text;

ALTER TABLE IF EXISTS public.learning_modules
  ALTER COLUMN module_name TYPE TEXT USING module_name::text,
  ALTER COLUMN type TYPE TEXT USING type::text,
  ALTER COLUMN description TYPE TEXT USING description::text;

ALTER TABLE IF EXISTS public.event_sub_items
  ALTER COLUMN sub_event_name TYPE TEXT USING sub_event_name::text,
  ALTER COLUMN description TYPE TEXT USING description::text;

ALTER TABLE IF EXISTS public.business_commitments
  ALTER COLUMN work_item TYPE TEXT USING work_item::text,
  ALTER COLUMN application_context TYPE TEXT USING application_context::text,
  ALTER COLUMN description TYPE TEXT USING description::text,
  ALTER COLUMN problem_opportunity TYPE TEXT USING problem_opportunity::text,
  ALTER COLUMN who_benefited TYPE TEXT USING who_benefited::text,
  ALTER COLUMN impact TYPE TEXT USING impact::text,
  ALTER COLUMN improved_outcomes_text TYPE TEXT USING improved_outcomes_text::text,
  ALTER COLUMN increased_efficiency_text TYPE TEXT USING increased_efficiency_text::text,
  ALTER COLUMN reduced_risk_cost_text TYPE TEXT USING reduced_risk_cost_text::text,
  ALTER COLUMN enhanced_customer_experience_text TYPE TEXT USING enhanced_customer_experience_text::text,
  ALTER COLUMN enhanced_employee_experience_text TYPE TEXT USING enhanced_employee_experience_text::text,
  ALTER COLUMN alignment TYPE TEXT USING alignment::text,
  ALTER COLUMN status_notes TYPE TEXT USING status_notes::text;

ALTER TABLE IF EXISTS public.innovation_events
  ALTER COLUMN event_name TYPE TEXT USING event_name::text,
  ALTER COLUMN type TYPE TEXT USING type::text,
  ALTER COLUMN description TYPE TEXT USING description::text;

ALTER TABLE IF EXISTS public.action_items
  ALTER COLUMN name TYPE TEXT USING name::text,
  ALTER COLUMN description TYPE TEXT USING description::text,
  ALTER COLUMN criticality TYPE TEXT USING criticality::text;

ALTER TABLE IF EXISTS public.skills
  ALTER COLUMN name TYPE TEXT USING name::text;

ALTER TABLE IF EXISTS public.leadership_events
  ALTER COLUMN event_name TYPE TEXT USING event_name::text,
  ALTER COLUMN type TYPE TEXT USING type::text,
  ALTER COLUMN description TYPE TEXT USING description::text;

ALTER TABLE IF EXISTS public.leadership_subevents
  ALTER COLUMN subevent_name TYPE TEXT USING subevent_name::text,
  ALTER COLUMN description TYPE TEXT USING description::text;

-- If you run this file, you do not need to separately run the older specific migration scripts
-- such as action-items-migration.sql, skills-migration.sql, or alter-text-columns.sql.
-- This file already includes the current schema updates and TEXT column conversions.

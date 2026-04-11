-- Safe schema update for existing Commitment Tracker databases.
-- Run this against an existing database to bring its tables and columns up to the current backend model.
-- It uses IF NOT EXISTS and IF EXISTS so it can be applied without dropping existing data.

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

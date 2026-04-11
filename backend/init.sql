-- Complete Database Schema for Commitments App

-- This init.sql is intended to create the current backend schema in one pass.
-- Run it on a clean database. If your database already contains old legacy tables,
-- either drop those legacy tables first or apply the migration scripts instead.

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

-- If you're applying this to a database with older action_items or skills definitions,
-- these ALTER TABLE statements add missing columns without failing if they already exist.
ALTER TABLE IF EXISTS public.action_items
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS criticality VARCHAR(50),
  ADD COLUMN IF NOT EXISTS date_started DATE,
  ADD COLUMN IF NOT EXISTS date_finished DATE,
  ADD COLUMN IF NOT EXISTS completed BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE IF EXISTS public.skills
  ADD COLUMN IF NOT EXISTS date DATE;

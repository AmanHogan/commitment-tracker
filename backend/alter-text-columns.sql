-- Convert string columns that may contain long text to TEXT.
-- Run this against an existing PostgreSQL database to avoid VARCHAR(255) truncation issues.
-- This preserves existing data and only changes the column type.

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

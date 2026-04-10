-- Skills table
-- Run this against your existing database (e.g. amanhogan) to add the skills feature.

CREATE TABLE IF NOT EXISTS skills (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    proficiency INTEGER      NOT NULL CHECK (proficiency BETWEEN 1 AND 5),
    date        DATE,
    created_at  TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT now()
);

ALTER TABLE public.skills
ADD COLUMN IF NOT EXISTS date DATE;

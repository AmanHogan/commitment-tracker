# Recommended future work

## Need to Work on

### 1. UX / navigation

- Replace page.tsx with a real home/redirect page to your dashboard.
- Add a proper root-level navigation or homepage so users are not dropped on the default template.
- Improve mobile support:
  - layout.tsx uses a static sidebar only.
  - There is an unused/alternate `components/ui/sidebar.tsx` implementation that could be unified for responsive sidebar behavior.

### 2. Code structure & reuse

- Many page components repeat the same state/form patterns (`useState`, `loading`, `error`, CRUD flows).
  - one-on-one-page.tsx
  - action-items-page.tsx
  - bcomm-page.tsx, dcomm2-page.tsx, etc.
- Consider extracting shared hooks/components for:
  - form state
  - API CRUD actions
  - error/loading handling
  - confirm-delete modals

### 3. Data / API robustness

- API actions in `frontend/lib/actions/*.ts` are repetitive and use simple fetch wrappers.
  - Could centralize HTTP error handling and base URL creation.
- one-on-one-actions.ts relies on `process.env.BACKEND_API`.
  - Validate that env config is present and document env requirements.
- one-on-one-page.tsx imports data via text formatting from other commitment endpoints.
  - That import flow is brittle; consider structured data integration instead of plain text blobs.

### 4. Export/import features

- one-on-one-export.ts
  - PDF and DOCX export code is workable, but could benefit from:
    - better pagination handling
    - more readable formatting
    - stronger type safety instead of `any`
- Markdown export may need more structured section handling if content grows.

### 5. Repo hygiene

- Fix .gitignore so the frontend folder ignores local build artifacts:
  - `.next/`
  - `node_modules/`
  - `*.tsbuildinfo`
  - `next-env.d.ts`
- README.md is still generic Next.js template text, not app-specific documentation.
- Consider removing .next from source control if it was accidentally committed.

### 6. Quality & tech debt

- Add frontend tests:
  - unit tests for export helpers
  - component tests for forms and list pages
  - integration tests for page flows
- Tighten TypeScript settings and linting, if not already enforced.
- Audit accessibility / keyboard support for forms, buttons, and sidebar navigation.

---

## Short-term roadmap

1. Fix .gitignore and remove any committed build artifacts.
2. Replace starter root page with a dashboard entrypoint or landing page.
3. Add tests for export/import and CRUD flows.
4. Refactor repeated page/form logic into shared components/hooks.
5. Improve responsive/dashboard UX using the existing sidebar component or a new mobile-friendly nav.

If you want, I can also generate a prioritized frontend backlog from this list with estimated effort.

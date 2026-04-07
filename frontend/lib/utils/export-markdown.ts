import type {
  BusinessCommitmentOne,
  BusinessCommitmentTwo,
  DevelopmentCommitmentOne,
  LearningModule,
  DevelopmentCommitmentTwo,
  EventSubItem,
  ActionItem,
} from "@/types/types"

function downloadMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function stamp(): string {
  return new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

function row(label: string, value: string | number | boolean | null | undefined): string {
  if (value == null || value === "" || value === false) return ""
  const display = value === true ? "Yes" : String(value)
  return `- **${label}:** ${display}\n`
}

// ─── Business Commitments 1 ──────────────────────────────────────────────────

export function exportBcomm1ToMarkdown(commitments: BusinessCommitmentOne[]): void {
  const lines: string[] = [`# Business Commitments\n\nGenerated: ${stamp()}\n\n---\n`]

  commitments.forEach((c, i) => {
    lines.push(`## ${i + 1}. ${c.workItem ?? "(untitled)"}\n`)
    lines.push(row("Status", c.status))
    lines.push(row("Application Context", c.applicationContext))
    lines.push(row("Date Started", c.dateStarted))
    lines.push(row("Date Completed", c.dateCompleted))
    lines.push(row("Description", c.description))
    lines.push(row("Problem", c.problem))
    lines.push(row("Who Benefited", c.whoBenefited))
    lines.push(row("Impact", c.impact))
    lines.push(row("Alignment", c.alignment))
    lines.push(row("Status Notes", c.statusNotes))

    if (c.valueEntryList && c.valueEntryList.length > 0) {
      lines.push("- **Value Entries:**\n")
      c.valueEntryList.forEach((ve) => lines.push(`  - ${ve.label}: ${ve.value}\n`))
    }
    lines.push("\n---\n")
  })

  downloadMarkdown(lines.join(""), "business-commitments.md")
}

// ─── Business Commitments 2 ──────────────────────────────────────────────────

export function exportBcomm2ToMarkdown(events: BusinessCommitmentTwo[]): void {
  const lines: string[] = [`# Business Commitments 2\n\nGenerated: ${stamp()}\n\n---\n`]

  events.forEach((ev, i) => {
    lines.push(`## ${i + 1}. ${ev.eventName ?? "(untitled)"}\n`)
    lines.push(row("Type", ev.type))
    lines.push(row("Description", ev.description))
    lines.push(row("Date Started", ev.started))
    lines.push(row("Date Finished", ev.finished))
    lines.push(row("Done", ev.done))
    lines.push(row("Required", ev.required))
    lines.push("\n---\n")
  })

  downloadMarkdown(lines.join(""), "business-commitments-2.md")
}

// ─── Development Commitments 1 ───────────────────────────────────────────────

export function exportDcomm1ToMarkdown(
  items: DevelopmentCommitmentOne[],
  modulesByItem: Record<number, LearningModule[]>
): void {
  const lines: string[] = [`# Dev Commitments 1 — Learning Items\n\nGenerated: ${stamp()}\n\n---\n`]

  items.forEach((item, i) => {
    lines.push(`## ${i + 1}. ${item.itemName ?? "(untitled)"}\n`)

    const modules = item.id != null ? modulesByItem[item.id] : undefined
    if (modules && modules.length > 0) {
      lines.push("### Modules\n")
      modules.forEach((m, j) => {
        lines.push(`#### ${j + 1}. ${m.moduleName ?? "(untitled)"}\n`)
        lines.push(row("Type", m.type))
        lines.push(row("Hours", m.hours))
        lines.push(row("Date Started", m.dateStarted))
        lines.push(row("Date Finished", m.dateFinished))
        lines.push(row("Finished", m.finished))
        lines.push(row("Required", m.required))
        lines.push(row("Description", m.description))
        lines.push("\n")
      })
    }
    lines.push("\n---\n")
  })

  downloadMarkdown(lines.join(""), "dev-commitments-1.md")
}

// ─── Development Commitments 2 ───────────────────────────────────────────────

export function exportDcomm2ToMarkdown(
  events: DevelopmentCommitmentTwo[],
  subEventsByEvent: Record<number, EventSubItem[]>
): void {
  const lines: string[] = [`# Dev Commitments 2 — Innovation Events\n\nGenerated: ${stamp()}\n\n---\n`]

  events.forEach((ev, i) => {
    lines.push(`## ${i + 1}. ${ev.eventName ?? "(untitled)"}\n`)
    lines.push(row("Type", ev.type))
    lines.push(row("Description", ev.description))
    lines.push(row("Date Started", ev.started))
    lines.push(row("Date Finished", ev.finished))
    lines.push(row("Done", ev.done))
    lines.push(row("Required", ev.required))

    const subs = ev.id != null ? subEventsByEvent[ev.id] : undefined
    if (subs && subs.length > 0) {
      lines.push("\n### Sub-Events\n")
      subs.forEach((s, j) => {
        lines.push(`#### ${j + 1}. ${s.subEventName ?? "(untitled)"}\n`)
        lines.push(row("Description", s.description))
        lines.push(row("Date Started", s.started))
        lines.push(row("Date Finished", s.finished))
        lines.push(row("Done", s.done))
        lines.push("\n")
      })
    }
    lines.push("\n---\n")
  })

  downloadMarkdown(lines.join(""), "dev-commitments-2.md")
}

// ─── Action Items ─────────────────────────────────────────────────────────────

export function exportActionItemsToMarkdown(items: ActionItem[]): void {
  const lines: string[] = [`# Action Items\n\nGenerated: ${stamp()}\n\n---\n`]

  items.forEach((item, i) => {
    lines.push(`## ${i + 1}. ${item.name ?? "(untitled)"}\n`)
    lines.push(row("Criticality", item.criticality))
    lines.push(row("Date Started", item.dateStarted))
    lines.push(row("Date Finished", item.dateFinished))
    lines.push("\n---\n")
  })

  downloadMarkdown(lines.join(""), "action-items.md")
}

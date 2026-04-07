"use client"

import { useState } from "react"
import type {
  OneOnOne,
  CreateOneOnOneDTO,
  BusinessCommitmentOne,
  DevelopmentCommitmentTwo,
  BusinessCommitmentTwo,
} from "@/types/types"
import { createOneOnOne, updateOneOnOne, deleteOneOnOne } from "@/lib/actions/one-on-one-actions"
import { getAllCommitmentsOne } from "@/lib/actions/data-actions"
import { getAllDevelopmentCommitmentsTwo } from "@/lib/actions/dcomm2-actions"
import { getAllBusinessCommitmentsTwo } from "@/lib/actions/bcomm2-actions"
import { exportToMarkdown, exportToPdf, exportToDocx } from "@/lib/utils/one-on-one-export"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"

type ImportField = "businessPartnerWork" | "trainingSkills" | "innovationEvents"

const DISCUSSION_FIELDS: [keyof CreateOneOnOneDTO, string][] = [
  ["accomplishments", "Accomplishments"],
  ["challenges", "Challenges"],
  ["goals", "Goals"],
  ["questions", "Questions"],
  ["receivingSupport", "Receiving support"],
  ["additionalItems", "Additional items"],
  ["outOfOfficePlans", "Out of office plans"],
]

type Props = {
  initialDocs: OneOnOne[]
}

const emptyForm = (): CreateOneOnOneDTO => ({
  documentDate: "",
  businessPartnerWork: "",
  workloadConcerns: "",
  tdpContributions: "",
  utilizationPercentage: undefined,
  trainingSkills: "",
  pursuingDegrees: "",
  compliancePercentage: undefined,
  ehsTrainingPercentage: undefined,
  growthHubProgress: "",
  successPathwaysUpdated: false,
  contingencyTrainingPercentage: undefined,
  innovationEvents: "",
  accomplishments: "",
  challenges: "",
  goals: "",
  questions: "",
  receivingSupport: "",
  additionalItems: "",
  outOfOfficePlans: "",
})

export default function OneOnOnePage({ initialDocs }: Props) {
  const [docs, setDocs] = useState<OneOnOne[]>(initialDocs)
  const [form, setForm] = useState<CreateOneOnOneDTO>(emptyForm())
  const [editingId, setEditingId] = useState<number | null>(null)
  const [importingField, setImportingField] = useState<ImportField | null>(null)
  const [exportingId, setExportingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleField(field: keyof CreateOneOnOneDTO, val: string | boolean | number | undefined) {
    setForm((prev) => ({ ...prev, [field]: val }))
  }

  function handleNumberField(field: keyof CreateOneOnOneDTO, val: string) {
    handleField(field, val === "" ? undefined : parseFloat(val))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setImportingField(null)
    try {
      if (editingId) {
        const updated = await updateOneOnOne(editingId, form)
        setDocs((prev) => prev.map((d) => (d.id === updated.id ? updated : d)))
        setEditingId(null)
      } else {
        const created = await createOneOnOne(form)
        setDocs((prev) => [...prev, created])
      }
      setForm(emptyForm())
      setShowForm(false)
    } catch {
      setError(editingId ? "Failed to update document" : "Failed to create document")
    } finally {
      setLoading(false)
    }
  }

  function startEdit(doc: OneOnOne) {
    setEditingId(doc.id!)
    setForm({
      documentDate: doc.documentDate,
      businessPartnerWork: doc.businessPartnerWork ?? "",
      workloadConcerns: doc.workloadConcerns ?? "",
      tdpContributions: doc.tdpContributions ?? "",
      utilizationPercentage: doc.utilizationPercentage,
      trainingSkills: doc.trainingSkills ?? "",
      pursuingDegrees: doc.pursuingDegrees ?? "",
      compliancePercentage: doc.compliancePercentage,
      ehsTrainingPercentage: doc.ehsTrainingPercentage,
      growthHubProgress: doc.growthHubProgress ?? "",
      successPathwaysUpdated: doc.successPathwaysUpdated ?? false,
      contingencyTrainingPercentage: doc.contingencyTrainingPercentage,
      innovationEvents: doc.innovationEvents ?? "",
      accomplishments: doc.accomplishments ?? "",
      challenges: doc.challenges ?? "",
      goals: doc.goals ?? "",
      questions: doc.questions ?? "",
      receivingSupport: doc.receivingSupport ?? "",
      additionalItems: doc.additionalItems ?? "",
      outOfOfficePlans: doc.outOfOfficePlans ?? "",
    })
    setImportingField(null)
    setShowForm(true)
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm())
    setImportingField(null)
    setShowForm(false)
  }

  async function handleDelete(id: number) {
    try {
      await deleteOneOnOne(id)
      setDocs((prev) => prev.filter((d) => d.id !== id))
    } catch {
      setError("Failed to delete document")
    }
  }

  // ─── Import ────────────────────────────────────────────────────────────────

  function formatBusinessCommitmentOne(items: BusinessCommitmentOne[]): string {
    return items
      .map((c) => {
        const lines = [`Work Item: ${c.workItem}`]
        if (c.started) lines.push(`Started: ${c.started}`)
        if (c.dateCompleted) lines.push(`Completed: ${c.dateCompleted}`)
        if (c.applicationContext) lines.push(`Application Context: ${c.applicationContext}`)
        if (c.description) lines.push(`Description: ${c.description}`)
        if (c.problemOpportunity) lines.push(`Problem: ${c.problemOpportunity}`)
        if (c.whoBenefited) lines.push(`Who Benefited: ${c.whoBenefited}`)
        if (c.impact) lines.push(`Impact: ${c.impact}`)
        if (c.alignment) lines.push(`Alignment: ${c.alignment}`)
        if (c.statusNotes) lines.push(`Status Notes: ${c.statusNotes}`)
        const valueEntries = [
          c.improvedOutcomes ? `Improved outcomes: ${c.improvedOutcomesText}` : null,
          c.increasedEfficiency ? `Increased efficiency: ${c.increasedEfficiencyText}` : null,
          c.reducedRiskCost ? `Reduced risk/cost: ${c.reducedRiskCostText}` : null,
          c.enhancedCustomerExperience ? `Enhanced customer experience: ${c.enhancedCustomerExperienceText}` : null,
          c.enhancedEmployeeExperience ? `Enhanced employee experience: ${c.enhancedEmployeeExperienceText}` : null,
        ].filter(Boolean)
        if (valueEntries.length) lines.push(`Values: ${valueEntries.join(", ")}`)
        return lines.join("\n")
      })
      .join("\n\n---\n\n")
  }

  function formatDevelopmentCommitmentTwo(items: DevelopmentCommitmentTwo[]): string {
    return items
      .map((e) => {
        const lines = [`Event: ${e.eventName}`]
        if (e.type) lines.push(`Type: ${e.type}`)
        if (e.description) lines.push(`Description: ${e.description}`)
        if (e.started) lines.push(`Started: ${e.started}`)
        if (e.finished) lines.push(`Finished: ${e.finished}`)
        if (e.done != null) lines.push(`Done: ${e.done ? "Yes" : "No"}`)
        if (e.required != null) lines.push(`Required: ${e.required ? "Yes" : "No"}`)
        return lines.join("\n")
      })
      .join("\n\n---\n\n")
  }

  function formatBusinessCommitmentTwo(items: BusinessCommitmentTwo[]): string {
    return items
      .map((e) => {
        const lines = [`Event: ${e.eventName}`]
        if (e.type) lines.push(`Type: ${e.type}`)
        if (e.description) lines.push(`Description: ${e.description}`)
        if (e.started) lines.push(`Started: ${e.started}`)
        if (e.finished) lines.push(`Finished: ${e.finished}`)
        if (e.done != null) lines.push(`Done: ${e.done ? "Yes" : "No"}`)
        if (e.required != null) lines.push(`Required: ${e.required ? "Yes" : "No"}`)
        return lines.join("\n")
      })
      .join("\n\n---\n\n")
  }

  async function handleImport(field: ImportField) {
    setImportingField(field)
    setError(null)
    try {
      let text = ""
      if (field === "businessPartnerWork") {
        const data = await getAllCommitmentsOne()
        text = formatBusinessCommitmentOne(data)
      } else if (field === "trainingSkills") {
        const data = await getAllDevelopmentCommitmentsTwo()
        text = formatDevelopmentCommitmentTwo(data)
      } else if (field === "innovationEvents") {
        const data = await getAllBusinessCommitmentsTwo()
        text = formatBusinessCommitmentTwo(data)
      }
      handleField(field, text)
    } catch {
      setError("Failed to import data")
    } finally {
      setImportingField(null)
    }
  }

  // ─── Export ────────────────────────────────────────────────────────────────

  async function handleExport(doc: OneOnOne, format: "md" | "pdf" | "docx") {
    setExportingId(doc.id!)
    setError(null)
    try {
      if (format === "md") exportToMarkdown(doc)
      else if (format === "pdf") await exportToPdf(doc)
      else await exportToDocx(doc)
    } catch {
      setError("Export failed")
    } finally {
      setExportingId(null)
    }
  }

  function importBtn(field: ImportField, sourceLabel: string) {
    return (
      <button
        type="button"
        onClick={() => handleImport(field)}
        disabled={importingField === field}
        className="text-xs text-blue-600 hover:underline disabled:opacity-50"
      >
        {importingField === field ? "Importing..." : `Import from ${sourceLabel}`}
      </button>
    )
  }

  return (
    <div className="space-y-8">
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="rounded bg-black px-4 py-2 text-sm text-white">
          New 1-on-1 Document
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSave} className="flex flex-col gap-4 rounded border p-4">
          <h2 className="text-lg font-semibold">{editingId ? "Edit Document" : "New 1-on-1 Document"}</h2>

          {/* Date */}
          <div>
            <Label>Document date *</Label>
            <Input
              required
              type="date"
              value={form.documentDate}
              onChange={(e) => handleField("documentDate", e.target.value)}
            />
          </div>

          {/* Work section */}
          <fieldset className="space-y-2 rounded border p-3">
            <legend className="px-1 text-sm font-semibold">Work</legend>
            <div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Business partner work</Label>
                {importBtn("businessPartnerWork", "Business Commitments 1")}
              </div>
              <Textarea
                value={form.businessPartnerWork ?? ""}
                onChange={(e) => handleField("businessPartnerWork", e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label className="text-xs">Workload concerns</Label>
              <Textarea
                value={form.workloadConcerns ?? ""}
                onChange={(e) => handleField("workloadConcerns", e.target.value)}
                rows={2}
              />
            </div>
            <div>
              <Label className="text-xs">TDP contributions</Label>
              <Textarea
                value={form.tdpContributions ?? ""}
                onChange={(e) => handleField("tdpContributions", e.target.value)}
                rows={2}
              />
            </div>
            <div>
              <Label className="text-xs">Utilization %</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={form.utilizationPercentage ?? ""}
                onChange={(e) => handleNumberField("utilizationPercentage", e.target.value)}
              />
            </div>
          </fieldset>

          {/* Training & Development */}
          <fieldset className="space-y-2 rounded border p-3">
            <legend className="px-1 text-sm font-semibold">Training &amp; Development</legend>
            <div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Training skills</Label>
                {importBtn("trainingSkills", "Development Commitments 2")}
              </div>
              <Textarea
                value={form.trainingSkills ?? ""}
                onChange={(e) => handleField("trainingSkills", e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label className="text-xs">Pursuing degrees</Label>
              <Input
                value={form.pursuingDegrees ?? ""}
                onChange={(e) => handleField("pursuingDegrees", e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Growth Hub progress</Label>
              <Input
                value={form.growthHubProgress ?? ""}
                onChange={(e) => handleField("growthHubProgress", e.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.successPathwaysUpdated ?? false}
                onChange={(e) => handleField("successPathwaysUpdated", e.target.checked)}
              />
              Success pathways updated
            </label>
          </fieldset>

          {/* Compliance */}
          <fieldset className="space-y-2 rounded border p-3">
            <legend className="px-1 text-sm font-semibold">Compliance</legend>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label className="text-xs">Compliance %</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={form.compliancePercentage ?? ""}
                  onChange={(e) => handleNumberField("compliancePercentage", e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs">EHS Training %</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={form.ehsTrainingPercentage ?? ""}
                  onChange={(e) => handleNumberField("ehsTrainingPercentage", e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs">Contingency Training %</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={form.contingencyTrainingPercentage ?? ""}
                  onChange={(e) => handleNumberField("contingencyTrainingPercentage", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          {/* Discussion */}
          <fieldset className="space-y-2 rounded border p-3">
            <legend className="px-1 text-sm font-semibold">Discussion</legend>
            {/* Innovation events — importable */}
            <div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Innovation events</Label>
                {importBtn("innovationEvents", "Business Commitments 2")}
              </div>
              <Textarea
                value={form.innovationEvents ?? ""}
                onChange={(e) => handleField("innovationEvents", e.target.value)}
                rows={3}
              />
            </div>

            {/* Remaining discussion fields */}
            {DISCUSSION_FIELDS.map(([field, label]) => (
              <div key={field}>
                <Label className="text-xs">{label}</Label>
                <Textarea
                  value={(form[field] as string) ?? ""}
                  onChange={(e) => handleField(field, e.target.value)}
                  rows={2}
                />
              </div>
            ))}
          </fieldset>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="rounded bg-black px-4 py-2 text-sm text-white">
              {loading ? "Saving..." : editingId ? "Update" : "Create Document"}
            </button>
            <button type="button" onClick={cancelEdit} className="rounded border px-4 py-2 text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Document list */}
      <ul className="space-y-3">
        {docs.map((doc) => (
          <li key={doc.id} className="rounded border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-medium">Document: {doc.documentDate}</p>
                {doc.accomplishments && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Accomplishments:</span> {doc.accomplishments}
                  </p>
                )}
                {doc.goals && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Goals:</span> {doc.goals}
                  </p>
                )}
                {doc.challenges && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Challenges:</span> {doc.challenges}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => startEdit(doc)} className="rounded border px-3 py-1 text-sm hover:bg-accent">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doc.id!)}
                  className="rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>

                {/* Export */}
                <div className="space-y-1 border-t pt-1">
                  <p className="text-xs font-medium text-muted-foreground">Export</p>
                  {exportingId === doc.id ? (
                    <p className="text-xs text-muted-foreground">Exporting...</p>
                  ) : (
                    <>
                      <button
                        onClick={() => handleExport(doc, "md")}
                        className="w-full rounded border px-3 py-1 text-xs hover:bg-accent"
                      >
                        Markdown
                      </button>
                      <button
                        onClick={() => handleExport(doc, "pdf")}
                        className="w-full rounded border px-3 py-1 text-xs hover:bg-accent"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleExport(doc, "docx")}
                        className="w-full rounded border px-3 py-1 text-xs hover:bg-accent"
                      >
                        Word (.docx)
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

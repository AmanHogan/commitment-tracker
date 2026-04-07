"use client"

import { useState } from "react"
import type { BusinessCommitmentOne, BusinessCommitmentOneFormState, ValueEntry } from "@/types/types"
import { emptyBusinessCommitmentForm } from "@/types/types"
import { createCommitmentOne, updateBusinessCommitmentOne, deleteCommitmentOne } from "@/lib/actions/data-actions"
import { toFormState, toApiPayload } from "@/lib/mappers/businessCommitmentOneMapper"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import { exportBcomm1ToMarkdown } from "@/lib/utils/export-markdown"

const emptyForm = emptyBusinessCommitmentForm

type Props = {
  initialCommitments: BusinessCommitmentOne[]
}

export default function AllBusinessCommitmentOneList({ initialCommitments }: Props) {
  const [commitments, setCommitments] = useState<BusinessCommitmentOne[]>(initialCommitments)
  const [form, setForm] = useState<BusinessCommitmentOneFormState>(emptyForm())
  const [valueEntry, setValueEntry] = useState<ValueEntry>({
    label: "",
    value: "",
  })

  const VALUE_CATEGORIES = [
    "Improved outcomes",
    "Increased efficiency",
    "Reduced risk/cost",
    "Enhanced customer experience",
    "Enhanced employee experience",
  ]
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)

  function handleField(field: keyof BusinessCommitmentOneFormState, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }))
  }

  function addValueEntry() {
    if (!valueEntry.label || !valueEntry.value) return
    setForm((prev) => ({
      ...prev,
      valueEntryList: [...(prev.valueEntryList ?? []), valueEntry],
    }))
    setValueEntry({ label: "", value: "" })
  }

  function removeValueEntry(index: number) {
    setForm((prev) => ({
      ...prev,
      valueEntryList: prev.valueEntryList?.filter((_, i) => i !== index),
    }))
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (editingId) {
        const updated = await updateBusinessCommitmentOne(editingId, toApiPayload(form))
        setCommitments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
        setEditingId(null)
        setForm(emptyForm())
      } else {
        const created = await createCommitmentOne(toApiPayload(form))
        setCommitments((prev) => [...prev, created])
        setForm(emptyForm())
      }
    } catch {
      setError(editingId ? "Failed to save changes" : "Failed to create commitment")
    } finally {
      setLoading(false)
    }
  }
  function startEdit(commitment: BusinessCommitmentOne) {
    setEditingId(commitment.id!)
    setForm(toFormState(commitment))
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm())
  }

  async function handleDelete(id: number) {
    try {
      await deleteCommitmentOne(id)
      setCommitments((prev) => prev.filter((c) => c.id !== id))
    } catch {
      setError("Failed to delete commitment")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => exportBcomm1ToMarkdown(commitments)}
          className="rounded border px-3 py-1.5 text-sm hover:bg-accent"
        >
          Export to Markdown
        </button>
      </div>
      <form onSubmit={handleCreate} className="flex flex-col gap-3 rounded p-4">
        <h2 className="border-b border-[#4B5563] pb-2 text-lg font-semibold">New Commitment</h2>
        <Label>Work item</Label>
        <Input
          required
          placeholder="Work item *"
          value={form.workItem}
          onChange={(e) => handleField("workItem", e.target.value)}
        />

        <Label>Application context</Label>
        <Input
          placeholder="Application context"
          value={form.applicationContext}
          onChange={(e) => handleField("applicationContext", e.target.value)}
        />

        <Label>Description</Label>
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleField("description", e.target.value)}
          rows={2}
        />

        <Label>Problem / Opportunity</Label>
        <Textarea
          placeholder="Problem / Opportunity"
          value={form.problemOpportunity}
          onChange={(e) => handleField("problemOpportunity", e.target.value)}
          rows={2}
        />

        <Label>Who benefited</Label>
        <Textarea
          placeholder="Who benefited"
          value={form.whoBenefited}
          onChange={(e) => handleField("whoBenefited", e.target.value)}
          rows={2}
        />

        <Label>Impact</Label>
        <Textarea
          placeholder="Impact"
          value={form.impact}
          onChange={(e) => handleField("impact", e.target.value)}
          rows={2}
        />

        <Label>Alignment</Label>
        <Input
          placeholder="Alignment"
          value={form.alignment}
          onChange={(e) => handleField("alignment", e.target.value)}
        />

        <Label>Status notes</Label>
        <Textarea
          placeholder="Status notes"
          value={form.statusNotes}
          onChange={(e) => handleField("statusNotes", e.target.value)}
          rows={2}
        />

        <Label>Date started</Label>
        <Input type="date" value={form.started} onChange={(e) => handleField("started", e.target.value)} />
        <Label>Date completed</Label>
        <Input type="date" value={form.dateCompleted} onChange={(e) => handleField("dateCompleted", e.target.value)} />

        {/* Value entries */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Value entries</span>
          {form.valueEntryList?.map((ve, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="font-medium">{ve.label}:</span>
              <span>{ve.value}</span>
              <button type="button" onClick={() => removeValueEntry(i)} className="ml-auto text-red-500">
                Remove
              </button>
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label className="text-xs">Category</Label>
              <Select
                value={valueEntry.label ?? ""}
                onValueChange={(val) => setValueEntry((v) => ({ ...v, label: val }))}
              >
                <SelectTrigger className="w-full rounded-[10px] border-[#4B5563]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {VALUE_CATEGORIES.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Details</Label>
              <Textarea
                placeholder="Describe the accomplishment and impact"
                value={valueEntry.value}
                onChange={(e) => setValueEntry((v) => ({ ...v, value: e.target.value }))}
                rows={3}
                className="w-full"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={addValueEntry} className="rounded border px-3 py-2">
                + Add
              </button>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" disabled={loading} className="rounded bg-black px-4 py-2 text-white">
          {loading ? "Saving..." : "Save Commitment"}
        </button>
      </form>

      <ul className="space-y-3 rounded-[10px] border border-[#4B5563] bg-transparent p-[15px] text-[12px] shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
        {commitments.map((c) => (
          <li key={c.id} className="rounded border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="space-y-1">
                  <p>{c.workItem}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <button onClick={() => startEdit(c)} className="rounded border px-3 py-1 text-sm hover:bg-accent">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id!)}
                  className="rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

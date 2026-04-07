"use client"

import { useState } from "react"
import type { BusinessCommitmentOne, CommitmentStatus, ValueEntry } from "@/types/types"
import type { CreateBusinessCommitmentOneDTO } from "@/types/types"
import { StatusMap } from "@/types/types"
import { createCommitmentOne, updateBusinessCommitmentOne, deleteCommitmentOne } from "@/lib/actions/data-actions"
import { emptyBusinessCommitmentForm } from "@/types/types"
import { toCreateBusinessCommitmentOneDTO } from "@/lib/mappers/businessCommitmentOneMapper"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { exportBcomm1ToMarkdown } from "@/lib/utils/export-markdown"

const emptyForm = emptyBusinessCommitmentForm

type Props = {
  initialCommitments: BusinessCommitmentOne[]
}

export default function AllBusinessCommitmentOneList({ initialCommitments }: Props) {
  const [commitments, setCommitments] = useState<BusinessCommitmentOne[]>(initialCommitments)
  const [form, setForm] = useState<CreateBusinessCommitmentOneDTO>(emptyForm())
  const [valueEntry, setValueEntry] = useState<ValueEntry>({
    label: "",
    value: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  function handleField(field: keyof CreateBusinessCommitmentOneDTO, val: string) {
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
        const updated = await updateBusinessCommitmentOne(editingId, form)
        setCommitments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
        setEditingId(null)
        setForm(emptyForm())
      } else {
        const created = await createCommitmentOne(form)
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
    setForm(toCreateBusinessCommitmentOneDTO(commitment))
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm())
  }

  async function handleDelete(id: string) {
    try {
      await deleteCommitmentOne(id)
      setCommitments((prev) => prev.filter((c) => c.id !== id))
    } catch {
      setError("Failed to delete commitment")
    }
  }
  async function handleToggle(commitment: BusinessCommitmentOne) {
    try {
      const updated = await updateBusinessCommitmentOne(commitment.id!, {
        status: commitment.status === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED",
      })
      setCommitments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
    } catch {
      setError("Failed to update commitment")
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
      <form onSubmit={handleCreate} className="flex flex-col gap-3 rounded border p-4">
        <h2 className="text-lg font-semibold">New Commitment</h2>

        <Input
          required
          placeholder="Work item *"
          value={form.workItem}
          onChange={(e) => handleField("workItem", e.target.value)}
        />

        <Input
          placeholder="Application context"
          value={form.applicationContext}
          onChange={(e) => handleField("applicationContext", e.target.value)}
        />

        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleField("description", e.target.value)}
          rows={2}
        />

        <Textarea
          placeholder="Problem"
          value={form.problem}
          onChange={(e) => handleField("problem", e.target.value)}
          rows={2}
        />

        <Input
          placeholder="Who benefited"
          value={form.whoBenefited}
          onChange={(e) => handleField("whoBenefited", e.target.value)}
        />

        <Textarea
          placeholder="Impact"
          value={form.impact}
          onChange={(e) => handleField("impact", e.target.value)}
          rows={2}
        />

        <Input
          placeholder="Alignment"
          value={form.alignment}
          onChange={(e) => handleField("alignment", e.target.value)}
        />

        <Textarea
          placeholder="Status notes"
          value={form.statusNotes}
          onChange={(e) => handleField("statusNotes", e.target.value)}
          rows={2}
        />

        <Label>Date started</Label>
        <Input type="date" value={form.dateStarted} onChange={(e) => handleField("dateStarted", e.target.value)} />
        <Label>Date completed</Label>
        <Input type="date" value={form.dateCompleted} onChange={(e) => handleField("dateCompleted", e.target.value)} />

        <select value={form.status} onChange={(e) => handleField("status", e.target.value)}>
          {StatusMap.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>

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
          <div className="flex gap-2">
            <Input
              placeholder="Label"
              value={valueEntry.label}
              onChange={(e) => setValueEntry((v) => ({ ...v, label: e.target.value }))}
              className="flex-1 rounded border px-3 py-2"
            />
            <Input
              placeholder="Value"
              value={valueEntry.value}
              onChange={(e) => setValueEntry((v) => ({ ...v, value: e.target.value }))}
              className="flex-1 rounded border px-3 py-2"
            />
            <button type="button" onClick={addValueEntry} className="rounded border px-3 py-2">
              + Add
            </button>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" disabled={loading} className="rounded bg-black px-4 py-2 text-white">
          {loading ? "Saving..." : "Save Commitment"}
        </button>
      </form>

      <ul className="space-y-3">
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

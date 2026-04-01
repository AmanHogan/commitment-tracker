"use client"

import { useState } from "react"
import type { BusinessCommitmentOne, CommitmentStatus, CreateBusinessCommitmentOnePayload, ValueEntry } from "@/types/types"
import { createCommitmentOne, updateBusinessCommitmentOne, deleteCommitmentOne } from "@/lib/actions/data-actions"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"

const STATUSES: CommitmentStatus[] = ["PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"]

const emptyForm = (): CreateBusinessCommitmentOnePayload => ({
  workItem: "",
  dateStarted: "",
  dateCompleted: "",
  applicationContext: "",
  description: "",
  problem: "",
  whoBenefited: "",
  impact: "",
  valueEntryList: [],
  alignment: "",
  statusNotes: "",
  status: "IN_PROGRESS",
})

type Props = {
  initialCommitments: BusinessCommitmentOne[]
}

export default function AllBusinessCommitmentOneList({ initialCommitments }: Props) {
  const [commitments, setCommitments] = useState<BusinessCommitmentOne[]>(initialCommitments)
  const [form, setForm] = useState<CreateBusinessCommitmentOnePayload>(emptyForm())
  const [valueEntry, setValueEntry] = useState<ValueEntry>({
    label: "",
    value: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<BusinessCommitmentOne | null>(null)
  const [editLoading, setEditLoading] = useState(false)
  const [editValueEntry, setEditValueEntry] = useState<ValueEntry>({
    label: "",
    value: "",
  })

  function handleField(field: keyof CreateBusinessCommitmentOnePayload, val: string) {
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
      const created = await createCommitmentOne(form)
      setCommitments((prev) => [...prev, created])
      setForm(emptyForm())
    } catch {
      setError("Failed to create commitment")
    } finally {
      setLoading(false)
    }
  }

  function startEdit(commitment: BusinessCommitmentOne) {
    setEditingId(commitment.id!)
    setEditForm({ ...commitment })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm(null)
  }

  function handleEditField(field: keyof BusinessCommitmentOne, val: string) {
    setEditForm((prev) => (prev ? { ...prev, [field]: val } : prev))
  }

  function addEditValueEntry() {
    if (!editValueEntry.label || !editValueEntry.value) return
    setEditForm((prev) => (prev ? { ...prev, valueEntryList: [...(prev.valueEntryList ?? []), editValueEntry] } : prev))
    setEditValueEntry({ label: "", value: "" })
  }

  function removeEditValueEntry(index: number) {
    setEditForm((prev) => (prev ? { ...prev, valueEntryList: prev.valueEntryList?.filter((_, i) => i !== index) } : prev))
  }

  async function handleDelete(id: string) {
    try {
      await deleteCommitmentOne(id)
      setCommitments((prev) => prev.filter((c) => c.id !== id))
    } catch {
      setError("Failed to delete commitment")
    }
  }

  async function handleEditSave(e: React.FormEvent) {
    e.preventDefault()
    if (!editForm || !editingId) return
    setEditLoading(true)
    try {
      const updated = await updateBusinessCommitmentOne(editingId, editForm)
      setCommitments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
      cancelEdit()
    } catch {
      setError("Failed to save changes")
    } finally {
      setEditLoading(false)
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
      <form onSubmit={handleCreate} className="flex flex-col gap-3 rounded border p-4">
        <h2 className="text-lg font-semibold">New Commitment</h2>

        <Input
          required
          placeholder="Work item *"
          value={form.workItem}
          onChange={(e) => handleField("workItem", e.target.value)}
          className="rounded border px-3 py-2"
        />

        <Input
          placeholder="Application context"
          value={form.applicationContext}
          onChange={(e) => handleField("applicationContext", e.target.value)}
          className="rounded border px-3 py-2"
        />

        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleField("description", e.target.value)}
          className="rounded border px-3 py-2"
          rows={2}
        />

        <Textarea
          placeholder="Problem"
          value={form.problem}
          onChange={(e) => handleField("problem", e.target.value)}
          className="rounded border px-3 py-2"
          rows={2}
        />

        <Input
          placeholder="Who benefited"
          value={form.whoBenefited}
          onChange={(e) => handleField("whoBenefited", e.target.value)}
          className="rounded border px-3 py-2"
        />

        <Textarea
          placeholder="Impact"
          value={form.impact}
          onChange={(e) => handleField("impact", e.target.value)}
          className="rounded border px-3 py-2"
          rows={2}
        />

        <Input
          placeholder="Alignment"
          value={form.alignment}
          onChange={(e) => handleField("alignment", e.target.value)}
          className="rounded border px-3 py-2"
        />

        <Textarea
          placeholder="Status notes"
          value={form.statusNotes}
          onChange={(e) => handleField("statusNotes", e.target.value)}
          className="rounded border px-3 py-2"
          rows={2}
        />

        <Label>Date started</Label>
        <Input
          type="date"
          value={form.dateStarted}
          onChange={(e) => handleField("dateStarted", e.target.value)}
          className="rounded border px-3 py-2"
        />
        <Label>Date completed</Label>
        <Input
          type="date"
          value={form.dateCompleted}
          onChange={(e) => handleField("dateCompleted", e.target.value)}
          className="rounded border px-3 py-2"
        />

        <select value={form.status} onChange={(e) => handleField("status", e.target.value)} className="rounded border px-3 py-2">
          {STATUSES.map((s) => (
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
            {editingId === c.id && editForm ? (
              // ── Inline edit form ──
              <form onSubmit={handleEditSave} className="flex flex-col gap-3">
                <h3 className="font-semibold">Editing: {c.workItem}</h3>
                <Input
                  placeholder="Work item *"
                  required
                  value={editForm.workItem}
                  onChange={(e) => handleEditField("workItem", e.target.value)}
                  className="rounded border px-3 py-2"
                />
                <Input
                  placeholder="Application context"
                  value={editForm.applicationContext ?? ""}
                  onChange={(e) => handleEditField("applicationContext", e.target.value)}
                  className="rounded border px-3 py-2"
                />
                <Textarea
                  placeholder="Description"
                  value={editForm.description ?? ""}
                  onChange={(e) => handleEditField("description", e.target.value)}
                  className="rounded border px-3 py-2"
                  rows={2}
                />
                <Textarea
                  placeholder="Problem"
                  value={editForm.problem ?? ""}
                  onChange={(e) => handleEditField("problem", e.target.value)}
                  className="rounded border px-3 py-2"
                  rows={2}
                />
                <Input
                  placeholder="Who benefited"
                  value={editForm.whoBenefited ?? ""}
                  onChange={(e) => handleEditField("whoBenefited", e.target.value)}
                  className="rounded border px-3 py-2"
                />
                <Textarea
                  placeholder="Impact"
                  value={editForm.impact ?? ""}
                  onChange={(e) => handleEditField("impact", e.target.value)}
                  className="rounded border px-3 py-2"
                  rows={2}
                />
                <Input
                  placeholder="Alignment"
                  value={editForm.alignment ?? ""}
                  onChange={(e) => handleEditField("alignment", e.target.value)}
                  className="rounded border px-3 py-2"
                />
                <Textarea
                  placeholder="Status notes"
                  value={editForm.statusNotes ?? ""}
                  onChange={(e) => handleEditField("statusNotes", e.target.value)}
                  className="rounded border px-3 py-2"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Label>Date started</Label>
                  <Input
                    type="date"
                    value={editForm.dateStarted ?? ""}
                    onChange={(e) => handleEditField("dateStarted", e.target.value)}
                    className="rounded border px-3 py-2"
                  />
                  <Label>Date completed</Label>
                  <Input
                    type="date"
                    value={editForm.dateCompleted ?? ""}
                    onChange={(e) => handleEditField("dateCompleted", e.target.value)}
                    className="rounded border px-3 py-2"
                  />
                </div>
                <select
                  value={editForm.status ?? "IN_PROGRESS"}
                  onChange={(e) => handleEditField("status", e.target.value)}
                  className="rounded border px-3 py-2"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
                {/* Value entries in edit form */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Value entries</span>
                  {editForm?.valueEntryList?.map((ve, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{ve.label}:</span>
                      <span>{ve.value}</span>
                      <button type="button" onClick={() => removeEditValueEntry(i)} className="ml-auto text-red-500">
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Label"
                      value={editValueEntry.label}
                      onChange={(e) => setEditValueEntry((v) => ({ ...v, label: e.target.value }))}
                      className="flex-1 rounded border px-3 py-2"
                    />
                    <Input
                      placeholder="Value"
                      value={editValueEntry.value}
                      onChange={(e) => setEditValueEntry((v) => ({ ...v, value: e.target.value }))}
                      className="flex-1 rounded border px-3 py-2"
                    />
                    <button type="button" onClick={addEditValueEntry} className="rounded border px-3 py-2">
                      + Add
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="submit" disabled={editLoading} className="rounded bg-black px-4 py-2 text-white">
                    {editLoading ? "Saving..." : "Save"}
                  </button>
                  <button type="button" onClick={cancelEdit} className="rounded border px-4 py-2">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // ── Detail view ──
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" checked={c.status === "COMPLETED"} onChange={() => handleToggle(c)} />
                  <div className="space-y-1">
                    <p className={c.status === "COMPLETED" ? "font-semibold text-muted-foreground line-through" : "font-semibold"}>{c.workItem}</p>
                    <p className="text-xs font-medium text-muted-foreground">{c.status?.replace("_", " ")}</p>
                    {c.applicationContext && (
                      <p className="text-sm">
                        <span className="font-medium">Context: </span>
                        {c.applicationContext}
                      </p>
                    )}
                    {c.description && (
                      <p className="text-sm">
                        <span className="font-medium">Description: </span>
                        {c.description}
                      </p>
                    )}
                    {c.problem && (
                      <p className="text-sm">
                        <span className="font-medium">Problem: </span>
                        {c.problem}
                      </p>
                    )}
                    {c.whoBenefited && (
                      <p className="text-sm">
                        <span className="font-medium">Who benefited: </span>
                        {c.whoBenefited}
                      </p>
                    )}
                    {c.impact && (
                      <p className="text-sm">
                        <span className="font-medium">Impact: </span>
                        {c.impact}
                      </p>
                    )}
                    {c.alignment && (
                      <p className="text-sm">
                        <span className="font-medium">Alignment: </span>
                        {c.alignment}
                      </p>
                    )}
                    {c.statusNotes && (
                      <p className="text-sm">
                        <span className="font-medium">Status notes: </span>
                        {c.statusNotes}
                      </p>
                    )}
                    {c.dateStarted && (
                      <p className="text-sm">
                        <span className="font-medium">Started: </span>
                        {c.dateStarted}
                      </p>
                    )}
                    {c.dateCompleted && (
                      <p className="text-sm">
                        <span className="font-medium">Completed: </span>
                        {c.dateCompleted}
                      </p>
                    )}
                    {c.valueEntryList && c.valueEntryList.length > 0 && (
                      <div className="text-sm">
                        <span className="font-medium">Value entries:</span>
                        <ul className="ml-4 list-disc">
                          {c.valueEntryList.map((ve, i) => (
                            <li key={i}>
                              {ve.label}: {ve.value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

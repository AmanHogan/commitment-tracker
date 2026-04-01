"use client"

import { useState } from "react"
import type {
  BusinessCommitmentOne,
  CommitmentStatus,
  CreateBusinessCommitmentOnePayload,
  ValueEntry,
} from "@/types/types"
import {
  createCommitmentOne,
  updateBusinessCommitmentOne,
} from "@/lib/actions/data-actions"

const STATUSES: CommitmentStatus[] = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "FAILED",
]

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

export default function AllBusinessCommitmentOneList({
  initialCommitments,
}: Props) {
  const [commitments, setCommitments] =
    useState<BusinessCommitmentOne[]>(initialCommitments)
  const [form, setForm] =
    useState<CreateBusinessCommitmentOnePayload>(emptyForm())
  const [valueEntry, setValueEntry] = useState<ValueEntry>({
    label: "",
    value: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleField(
    field: keyof CreateBusinessCommitmentOnePayload,
    val: string
  ) {
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

  async function handleToggle(commitment: BusinessCommitmentOne) {
    try {
      const updated = await updateBusinessCommitmentOne(commitment.id!, {
        status: commitment.status === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED",
      })
      setCommitments((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      )
    } catch {
      setError("Failed to update commitment")
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-3 rounded border p-4"
      >
        <h2 className="text-lg font-semibold">New Commitment</h2>

        <input
          required
          placeholder="Work item *"
          value={form.workItem}
          onChange={(e) => handleField("workItem", e.target.value)}
          className="rounded border px-3 py-2"
        />

        <input
          placeholder="Application context"
          value={form.applicationContext}
          onChange={(e) => handleField("applicationContext", e.target.value)}
          className="rounded border px-3 py-2"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleField("description", e.target.value)}
          className="rounded border px-3 py-2"
          rows={2}
        />

        <textarea
          placeholder="Problem"
          value={form.problem}
          onChange={(e) => handleField("problem", e.target.value)}
          className="rounded border px-3 py-2"
          rows={2}
        />

        <input
          placeholder="Who benefited"
          value={form.whoBenefited}
          onChange={(e) => handleField("whoBenefited", e.target.value)}
          className="rounded border px-3 py-2"
        />

        <textarea
          placeholder="Impact"
          value={form.impact}
          onChange={(e) => handleField("impact", e.target.value)}
          className="rounded border px-3 py-2"
          rows={2}
        />

        <input
          placeholder="Alignment"
          value={form.alignment}
          onChange={(e) => handleField("alignment", e.target.value)}
          className="rounded border px-3 py-2"
        />

        <textarea
          placeholder="Status notes"
          value={form.statusNotes}
          onChange={(e) => handleField("statusNotes", e.target.value)}
          className="rounded border px-3 py-2"
          rows={2}
        />

        <div className="flex gap-2">
          <label className="self-center text-sm text-muted-foreground">
            Date started
          </label>
          <input
            type="date"
            value={form.dateStarted}
            onChange={(e) => handleField("dateStarted", e.target.value)}
            className="rounded border px-3 py-2"
          />
          <label className="self-center text-sm text-muted-foreground">
            Date completed
          </label>
          <input
            type="date"
            value={form.dateCompleted}
            onChange={(e) => handleField("dateCompleted", e.target.value)}
            className="rounded border px-3 py-2"
          />
        </div>

        <select
          value={form.status}
          onChange={(e) => handleField("status", e.target.value)}
          className="rounded border px-3 py-2"
        >
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
              <button
                type="button"
                onClick={() => removeValueEntry(i)}
                className="ml-auto text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              placeholder="Label"
              value={valueEntry.label}
              onChange={(e) =>
                setValueEntry((v) => ({ ...v, label: e.target.value }))
              }
              className="flex-1 rounded border px-3 py-2"
            />
            <input
              placeholder="Value"
              value={valueEntry.value}
              onChange={(e) =>
                setValueEntry((v) => ({ ...v, value: e.target.value }))
              }
              className="flex-1 rounded border px-3 py-2"
            />
            <button
              type="button"
              onClick={addValueEntry}
              className="rounded border px-3 py-2"
            >
              + Add
            </button>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-white"
        >
          {loading ? "Saving..." : "Save Commitment"}
        </button>
      </form>

      <ul className="space-y-2">
        {commitments.map((c) => (
          <li key={c.id} className="flex items-center gap-3 rounded border p-3">
            <input
              type="checkbox"
              checked={c.status === "COMPLETED"}
              onChange={() => handleToggle(c)}
            />
            <div>
              <p
                className={
                  c.status === "COMPLETED"
                    ? "font-medium text-muted-foreground line-through"
                    : "font-medium"
                }
              >
                {c.workItem}
              </p>
              {c.description && (
                <p className="text-sm text-muted-foreground">{c.description}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {c.status?.replace("_", " ")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

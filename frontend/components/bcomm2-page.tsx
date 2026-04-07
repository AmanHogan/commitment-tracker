"use client"

import { useState } from "react"
import type {
  BusinessCommitmentTwo,
  CreateBusinessCommitmentTwoDTO,
  UpdateBusinessCommitmentTwoDTO,
} from "@/types/types"
import {
  createBusinessCommitmentTwo,
  updateBusinessCommitmentTwo,
  deleteBusinessCommitmentTwo,
} from "@/lib/actions/bcomm2-actions"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"

type Props = {
  initialEvents: BusinessCommitmentTwo[]
}

const emptyForm = (): CreateBusinessCommitmentTwoDTO => ({
  eventName: "",
  type: "",
  done: false,
  started: "",
  finished: "",
  required: false,
  description: "",
})

export default function BusinessCommitmentTwoPage({ initialEvents }: Props) {
  const [events, setEvents] = useState<BusinessCommitmentTwo[]>(initialEvents)
  const [form, setForm] = useState<CreateBusinessCommitmentTwoDTO>(emptyForm())
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleField(field: keyof CreateBusinessCommitmentTwoDTO, val: string | boolean | undefined) {
    setForm((prev) => ({ ...prev, [field]: val }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (editingId) {
        const updated = await updateBusinessCommitmentTwo(editingId, form)
        setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? updated : ev)))
        setEditingId(null)
      } else {
        const created = await createBusinessCommitmentTwo(form)
        setEvents((prev) => [...prev, created])
      }
      setForm(emptyForm())
    } catch {
      setError(editingId ? "Failed to update event" : "Failed to create event")
    } finally {
      setLoading(false)
    }
  }

  function startEdit(event: BusinessCommitmentTwo) {
    setEditingId(event.id!)
    setForm({
      eventName: event.eventName,
      type: event.type ?? "",
      done: event.done ?? false,
      started: event.started ?? "",
      finished: event.finished ?? "",
      required: event.required ?? false,
      description: event.description ?? "",
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm())
  }

  async function handleDelete(id: number) {
    try {
      await deleteBusinessCommitmentTwo(id)
      setEvents((prev) => prev.filter((ev) => ev.id !== id))
    } catch {
      setError("Failed to delete event")
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSave} className="flex flex-col gap-3 rounded border p-4">
        <h2 className="text-lg font-semibold">{editingId ? "Edit Event" : "New Event"}</h2>
        <Input
          required
          placeholder="Event name *"
          value={form.eventName}
          onChange={(e) => handleField("eventName", e.target.value)}
        />
        <Input placeholder="Type" value={form.type ?? ""} onChange={(e) => handleField("type", e.target.value)} />
        <Textarea
          placeholder="Description"
          value={form.description ?? ""}
          onChange={(e) => handleField("description", e.target.value)}
          rows={2}
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-xs">Date started</Label>
            <Input type="date" value={form.started ?? ""} onChange={(e) => handleField("started", e.target.value)} />
          </div>
          <div className="flex-1">
            <Label className="text-xs">Date finished</Label>
            <Input type="date" value={form.finished ?? ""} onChange={(e) => handleField("finished", e.target.value)} />
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={form.done ?? false}
              onChange={(e) => handleField("done", e.target.checked)}
            />
            Done
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={form.required ?? false}
              onChange={(e) => handleField("required", e.target.checked)}
            />
            Required
          </label>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="rounded bg-black px-4 py-2 text-sm text-white">
            {loading ? "Saving..." : editingId ? "Update Event" : "Add Event"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="rounded border px-4 py-2 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {events.map((event) => (
          <li key={event.id} className="rounded border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <p className="font-medium">{event.eventName}</p>
                {event.type && <p className="text-sm text-muted-foreground">Type: {event.type}</p>}
                {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
                <div className="flex gap-3 text-xs text-muted-foreground">
                  {event.done && <span className="text-green-600">✓ Done</span>}
                  {event.required && <span>Required</span>}
                  {event.started && <span>Started: {event.started}</span>}
                  {event.finished && <span>Finished: {event.finished}</span>}
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => startEdit(event)} className="rounded border px-3 py-1 text-sm hover:bg-accent">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id!)}
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

"use client"

import { useState } from "react"
import type { DevelopmentCommitmentTwo, CreateDevelopmentCommitmentTwoDTO } from "@/types/types"
import {
  createDevelopmentCommitmentTwo,
  updateDevelopmentCommitmentTwo,
  deleteDevelopmentCommitmentTwo,
} from "@/lib/actions/dcomm2-actions"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { exportDcomm2ToMarkdown } from "@/lib/utils/export-markdown"

type Props = {
  initialEvents: DevelopmentCommitmentTwo[]
}

const emptyEventForm = (): CreateDevelopmentCommitmentTwoDTO => ({
  eventName: "",
  type: "",
  description: "",
  started: "",
  finished: "",
  done: false,
  required: false,
})

export default function DevelopmentCommitmentTwoPage({ initialEvents }: Props) {
  const [events, setEvents] = useState<DevelopmentCommitmentTwo[]>(initialEvents)
  const [eventForm, setEventForm] = useState<CreateDevelopmentCommitmentTwoDTO>(emptyEventForm())
  const [editingEventId, setEditingEventId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  function handleEventField(field: keyof CreateDevelopmentCommitmentTwoDTO, val: string | boolean | undefined) {
    setEventForm((prev) => ({ ...prev, [field]: val }))
  }

  async function handleSaveEvent(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (editingEventId) {
        const updated = await updateDevelopmentCommitmentTwo(editingEventId, eventForm)
        setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? { ...updated } : ev)))
        setEditingEventId(null)
      } else {
        const created = await createDevelopmentCommitmentTwo(eventForm)
        setEvents((prev) => [...prev, created])
      }
      setEventForm(emptyEventForm())
    } catch {
      setError(editingEventId ? "Failed to update event" : "Failed to create event")
    } finally {
      setLoading(false)
    }
  }

  function startEditEvent(event: DevelopmentCommitmentTwo) {
    setEditingEventId(event.id!)
    setEventForm({
      eventName: event.eventName,
      type: event.type ?? "",
      description: event.description ?? "",
      started: event.started ?? "",
      finished: event.finished ?? "",
      done: event.done ?? false,
      required: event.required ?? false,
    })
  }

  function cancelEditEvent() {
    setEditingEventId(null)
    setEventForm(emptyEventForm())
  }

  async function handleDeleteEvent(id: number) {
    try {
      await deleteDevelopmentCommitmentTwo(id)
      setEvents((prev) => prev.filter((ev) => ev.id !== id))
    } catch {
      setError("Failed to delete event")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => exportDcomm2ToMarkdown(events)}
          className="rounded border px-3 py-1.5 text-sm hover:bg-accent"
        >
          Export to Markdown
        </button>
      </div>
      {/* Event form */}
      <form onSubmit={handleSaveEvent} className="flex flex-col gap-3 rounded border p-4">
        <h2 className="text-lg font-semibold">{editingEventId ? "Edit Event" : "New Event"}</h2>
        <Input
          required
          placeholder="Event name *"
          value={eventForm.eventName}
          onChange={(e) => handleEventField("eventName", e.target.value)}
        />
        <Input
          placeholder="Type"
          value={eventForm.type ?? ""}
          onChange={(e) => handleEventField("type", e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={eventForm.description ?? ""}
          onChange={(e) => handleEventField("description", e.target.value)}
          rows={2}
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-xs">Date started</Label>
            <Input
              type="date"
              value={eventForm.started ?? ""}
              onChange={(e) => handleEventField("started", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label className="text-xs">Date finished</Label>
            <Input
              type="date"
              value={eventForm.finished ?? ""}
              onChange={(e) => handleEventField("finished", e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={eventForm.done ?? false}
              onChange={(e) => handleEventField("done", e.target.checked)}
            />
            Done
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={eventForm.required ?? false}
              onChange={(e) => handleEventField("required", e.target.checked)}
            />
            Required
          </label>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="rounded bg-black px-4 py-2 text-sm text-white">
            {loading ? "Saving..." : editingEventId ? "Update Event" : "Add Event"}
          </button>
          {editingEventId && (
            <button type="button" onClick={cancelEditEvent} className="rounded border px-4 py-2 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Events list */}
      <ul className="space-y-3">
        {events.map((event) => (
          <li key={event.id} className="rounded border">
            <div className="flex items-start justify-between p-4">
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
                <button
                  onClick={() => startEditEvent(event)}
                  className="rounded border px-3 py-1 text-sm hover:bg-accent"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id!)}
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

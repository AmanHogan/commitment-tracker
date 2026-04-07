"use client"

import { useState } from "react"
import type {
  DevelopmentCommitmentTwo,
  CreateDevelopmentCommitmentTwoDTO,
  EventSubItem,
  CreateEventSubItemDTO,
  UpdateEventSubItemDTO,
} from "@/types/types"
import {
  createDevelopmentCommitmentTwo,
  updateDevelopmentCommitmentTwo,
  deleteDevelopmentCommitmentTwo,
  createSubEvent,
  updateSubEvent,
  deleteSubEvent,
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

const emptySubEventForm = (): CreateEventSubItemDTO => ({
  subEventName: "",
  description: "",
  started: "",
  finished: "",
  done: false,
})

export default function DevelopmentCommitmentTwoPage({ initialEvents }: Props) {
  const [events, setEvents] = useState<DevelopmentCommitmentTwo[]>(initialEvents)
  const [eventForm, setEventForm] = useState<CreateDevelopmentCommitmentTwoDTO>(emptyEventForm())
  const [editingEventId, setEditingEventId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null)

  // Sub-event state
  const [subEventsByEvent, setSubEventsByEvent] = useState<Record<number, EventSubItem[]>>({})
  const [subEventForm, setSubEventForm] = useState<CreateEventSubItemDTO>(emptySubEventForm())
  const [editingSubEventId, setEditingSubEventId] = useState<number | null>(null)

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
        setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? { ...updated, subEvents: ev.subEvents } : ev)))
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
      if (expandedEventId === id) setExpandedEventId(null)
    } catch {
      setError("Failed to delete event")
    }
  }

  function toggleExpand(event: DevelopmentCommitmentTwo) {
    const id = event.id!
    if (expandedEventId === id) {
      setExpandedEventId(null)
    } else {
      setExpandedEventId(id)
      if (event.subEvents && !subEventsByEvent[id]) {
        setSubEventsByEvent((prev) => ({ ...prev, [id]: event.subEvents! }))
      }
      setSubEventForm(emptySubEventForm())
      setEditingSubEventId(null)
    }
  }

  function handleSubEventField(field: keyof CreateEventSubItemDTO, val: string | boolean | undefined) {
    setSubEventForm((prev) => ({ ...prev, [field]: val }))
  }

  async function handleSaveSubEvent(e: React.FormEvent, eventId: number) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (editingSubEventId) {
        const updated = await updateSubEvent(editingSubEventId, subEventForm)
        setSubEventsByEvent((prev) => ({
          ...prev,
          [eventId]: prev[eventId].map((s) => (s.id === updated.id ? updated : s)),
        }))
        setEditingSubEventId(null)
      } else {
        const created = await createSubEvent(eventId, subEventForm)
        setSubEventsByEvent((prev) => ({
          ...prev,
          [eventId]: [...(prev[eventId] ?? []), created],
        }))
      }
      setSubEventForm(emptySubEventForm())
    } catch {
      setError(editingSubEventId ? "Failed to update sub-event" : "Failed to create sub-event")
    } finally {
      setLoading(false)
    }
  }

  function startEditSubEvent(sub: EventSubItem) {
    setEditingSubEventId(sub.id!)
    setSubEventForm({
      subEventName: sub.subEventName,
      description: sub.description ?? "",
      started: sub.started ?? "",
      finished: sub.finished ?? "",
      done: sub.done ?? false,
    })
  }

  function cancelEditSubEvent() {
    setEditingSubEventId(null)
    setSubEventForm(emptySubEventForm())
  }

  async function handleDeleteSubEvent(subId: number, eventId: number) {
    try {
      await deleteSubEvent(subId)
      setSubEventsByEvent((prev) => ({
        ...prev,
        [eventId]: prev[eventId].filter((s) => s.id !== subId),
      }))
    } catch {
      setError("Failed to delete sub-event")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => exportDcomm2ToMarkdown(events, subEventsByEvent)}
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
        {events.map((event) => {
          const isExpanded = expandedEventId === event.id
          const subs = subEventsByEvent[event.id!] ?? event.subEvents ?? []
          return (
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
                  <p className="text-xs text-muted-foreground">{subs.length} sub-event(s)</p>
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <button
                    onClick={() => toggleExpand(event)}
                    className="rounded border px-3 py-1 text-sm hover:bg-accent"
                  >
                    {isExpanded ? "Collapse" : "Sub-events"}
                  </button>
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

              {/* Sub-events panel */}
              {isExpanded && (
                <div className="space-y-4 border-t px-4 pt-3 pb-4">
                  <form onSubmit={(e) => handleSaveSubEvent(e, event.id!)} className="flex flex-col gap-2">
                    <p className="text-sm font-semibold">{editingSubEventId ? "Edit Sub-event" : "Add Sub-event"}</p>
                    <Input
                      required
                      placeholder="Sub-event name *"
                      value={subEventForm.subEventName}
                      onChange={(e) => handleSubEventField("subEventName", e.target.value)}
                    />
                    <Textarea
                      placeholder="Description"
                      value={subEventForm.description ?? ""}
                      onChange={(e) => handleSubEventField("description", e.target.value)}
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label className="text-xs">Date started</Label>
                        <Input
                          type="date"
                          value={subEventForm.started ?? ""}
                          onChange={(e) => handleSubEventField("started", e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs">Date finished</Label>
                        <Input
                          type="date"
                          value={subEventForm.finished ?? ""}
                          onChange={(e) => handleSubEventField("finished", e.target.value)}
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        checked={subEventForm.done ?? false}
                        onChange={(e) => handleSubEventField("done", e.target.checked)}
                      />
                      Done
                    </label>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded bg-black px-3 py-1 text-sm text-white"
                      >
                        {loading ? "Saving..." : editingSubEventId ? "Update" : "Add Sub-event"}
                      </button>
                      {editingSubEventId && (
                        <button type="button" onClick={cancelEditSubEvent} className="rounded border px-3 py-1 text-sm">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  {subs.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No sub-events yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {subs.map((sub) => (
                        <li key={sub.id} className="rounded border p-3 text-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-0.5">
                              <p className="font-medium">{sub.subEventName}</p>
                              {sub.description && <p className="text-muted-foreground">{sub.description}</p>}
                              <div className="flex gap-3 text-xs text-muted-foreground">
                                {sub.done && <span className="text-green-600">✓ Done</span>}
                                {sub.started && <span>Started: {sub.started}</span>}
                                {sub.finished && <span>Finished: {sub.finished}</span>}
                              </div>
                            </div>
                            <div className="flex shrink-0 flex-col gap-1">
                              <button
                                onClick={() => startEditSubEvent(sub)}
                                className="rounded border px-2 py-1 text-xs hover:bg-accent"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteSubEvent(sub.id!, event.id!)}
                                className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

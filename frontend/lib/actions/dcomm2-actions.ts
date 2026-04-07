"use server"

import type {
  DevelopmentCommitmentTwo,
  CreateDevelopmentCommitmentTwoDTO,
  EventSubItem,
  CreateEventSubItemDTO,
  UpdateEventSubItemDTO,
} from "@/types/types"

const BASE_URL = `${process.env.BACKEND_API}/api/dcomm2`

// ─── Innovation Events ────────────────────────────────────────────────────────

export async function getAllDevelopmentCommitmentsTwo(): Promise<DevelopmentCommitmentTwo[]> {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error("Failed to fetch development commitments two")
  return res.json()
}

export async function createDevelopmentCommitmentTwo(
  payload: CreateDevelopmentCommitmentTwoDTO
): Promise<DevelopmentCommitmentTwo> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create development commitment two")
  return res.json()
}

export async function updateDevelopmentCommitmentTwo(
  id: number,
  payload: CreateDevelopmentCommitmentTwoDTO
): Promise<DevelopmentCommitmentTwo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to update development commitment two ${id}`)
  return res.json()
}

export async function deleteDevelopmentCommitmentTwo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error(`Failed to delete development commitment two ${id}`)
}

// ─── Sub Events ───────────────────────────────────────────────────────────────

export async function getSubEventsForEvent(eventId: number): Promise<EventSubItem[]> {
  const res = await fetch(`${BASE_URL}/${eventId}/sub-events`)
  if (!res.ok) throw new Error(`Failed to fetch sub-events for event ${eventId}`)
  return res.json()
}

export async function createSubEvent(eventId: number, payload: CreateEventSubItemDTO): Promise<EventSubItem> {
  const res = await fetch(`${BASE_URL}/${eventId}/sub-events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to create sub-event for event ${eventId}`)
  return res.json()
}

export async function updateSubEvent(subItemId: number, payload: UpdateEventSubItemDTO): Promise<EventSubItem> {
  const res = await fetch(`${BASE_URL}/sub-events/${subItemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to update sub-event ${subItemId}`)
  return res.json()
}

export async function deleteSubEvent(subItemId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/sub-events/${subItemId}`, { method: "DELETE" })
  if (!res.ok) throw new Error(`Failed to delete sub-event ${subItemId}`)
}

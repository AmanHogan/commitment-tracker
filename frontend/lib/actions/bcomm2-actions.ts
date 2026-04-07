"use server"

import type {
  BusinessCommitmentTwo,
  CreateBusinessCommitmentTwoDTO,
  UpdateBusinessCommitmentTwoDTO,
  SubEvent,
  CreateSubEventDTO,
  UpdateSubEventDTO,
} from "@/types/types"

const BASE_URL = `${process.env.BACKEND_API}/api/bcomm2`

export async function getAllBusinessCommitmentsTwo(): Promise<BusinessCommitmentTwo[]> {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error("Failed to fetch business commitments two")
  return res.json()
}

export async function createBusinessCommitmentTwo(
  payload: CreateBusinessCommitmentTwoDTO
): Promise<BusinessCommitmentTwo> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create business commitment two")
  return res.json()
}

export async function updateBusinessCommitmentTwo(
  id: number,
  payload: UpdateBusinessCommitmentTwoDTO
): Promise<BusinessCommitmentTwo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to update business commitment two ${id}`)
  return res.json()
}

export async function deleteBusinessCommitmentTwo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error(`Failed to delete business commitment two ${id}`)
}

export async function deleteAllBusinessCommitmentsTwo(): Promise<void> {
  const res = await fetch(BASE_URL, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete all business commitments two")
}

// ─── Sub-events ───────────────────────────────────────────────────────────────

export async function getSubEventsForEvent(eventId: number): Promise<SubEvent[]> {
  const res = await fetch(`${BASE_URL}/${eventId}/sub-events`)
  if (!res.ok) throw new Error(`Failed to fetch sub-events for event ${eventId}`)
  return res.json()
}

export async function createSubEventForEvent(eventId: number, payload: CreateSubEventDTO): Promise<SubEvent> {
  const res = await fetch(`${BASE_URL}/${eventId}/sub-events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to create sub-event for event ${eventId}`)
  return res.json()
}

export async function updateSubEventById(subEventId: number, payload: UpdateSubEventDTO): Promise<SubEvent> {
  const res = await fetch(`${BASE_URL}/sub-events/${subEventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to update sub-event ${subEventId}`)
  return res.json()
}

export async function deleteSubEventById(subEventId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/sub-events/${subEventId}`, { method: "DELETE" })
  if (!res.ok) throw new Error(`Failed to delete sub-event ${subEventId}`)
}

"use server"

import type { ActionItem, CreateActionItemDTO, UpdateActionItemDTO } from "@/types/types"

const BASE_URL = `${process.env.BACKEND_API}/api/action-items`

export async function getAllActionItems(): Promise<ActionItem[]> {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error("Failed to fetch action items")
  return res.json()
}

export async function createActionItem(payload: CreateActionItemDTO): Promise<ActionItem> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create action item")
  return res.json()
}

export async function updateActionItem(id: number, payload: UpdateActionItemDTO): Promise<ActionItem> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to update action item ${id}`)
  return res.json()
}

export async function deleteActionItem(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error(`Failed to delete action item ${id}`)
}

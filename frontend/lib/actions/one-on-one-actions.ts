"use server"

import type { OneOnOne, CreateOneOnOneDTO, UpdateOneOnOneDTO } from "@/types/types"

const BASE_URL = `${process.env.BACKEND_API}/api/one-on-one`

export async function getAllOneOnOnes(): Promise<OneOnOne[]> {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error("Failed to fetch one-on-one documents")
  return res.json()
}

export async function createOneOnOne(payload: CreateOneOnOneDTO): Promise<OneOnOne> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create one-on-one document")
  return res.json()
}

export async function updateOneOnOne(id: number, payload: UpdateOneOnOneDTO): Promise<OneOnOne> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to update one-on-one document ${id}`)
  return res.json()
}

export async function deleteOneOnOne(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error(`Failed to delete one-on-one document ${id}`)
}

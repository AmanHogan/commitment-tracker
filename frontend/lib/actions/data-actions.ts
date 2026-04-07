"use server"

import type {
  BusinessCommitmentOne,
  CommitmentStatus,
  CreateBusinessCommitmentOneDTO,
  UpdateBusinessCommitmentOneDTO,
} from "../../types/types"

const BASE_URL = `${process.env.BACKEND_API}/api/bcomm1`

export async function getAllCommitmentsOne(): Promise<BusinessCommitmentOne[]> {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error("Failed to fetch commitments")
  return res.json()
}

export async function getCommitmentsOneByStatus(status: CommitmentStatus): Promise<BusinessCommitmentOne[]> {
  const res = await fetch(`${BASE_URL}/getByStatus/${status}`)
  if (!res.ok) throw new Error(`Failed to fetch commitments with status: ${status}`)
  return res.json()
}

export async function createCommitmentOne(payload: CreateBusinessCommitmentOneDTO): Promise<BusinessCommitmentOne> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create commitment")
  return res.json()
}

export async function updateBusinessCommitmentOne(
  id: number,
  payload: UpdateBusinessCommitmentOneDTO
): Promise<BusinessCommitmentOne> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to update commitment: ${id}`)
  return res.json()
}

export async function deleteCommitmentOne(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error(`Failed to delete commitment: ${id}`)
}

export async function deleteAllCommitmentsOne(): Promise<void> {
  const res = await fetch(BASE_URL, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete all commitments")
}

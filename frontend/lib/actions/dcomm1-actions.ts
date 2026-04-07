"use server"

import type {
  DevelopmentCommitmentOne,
  CreateDevelopmentCommitmentOneDTO,
  LearningModule,
  CreateLearningModuleDTO,
  UpdateLearningModuleDTO,
} from "@/types/types"

const BASE_URL = `${process.env.BACKEND_API}/api/dcomm1`

// ─── Learning Items ───────────────────────────────────────────────────────────

export async function getAllDevelopmentCommitmentsOne(): Promise<DevelopmentCommitmentOne[]> {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error("Failed to fetch development commitments")
  return res.json()
}

export async function createDevelopmentCommitmentOne(
  payload: CreateDevelopmentCommitmentOneDTO
): Promise<DevelopmentCommitmentOne> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create development commitment")
  return res.json()
}

// ─── Learning Modules ─────────────────────────────────────────────────────────

export async function getModulesForItem(itemId: number): Promise<LearningModule[]> {
  const res = await fetch(`${BASE_URL}/${itemId}/modules`)
  if (!res.ok) throw new Error(`Failed to fetch modules for item ${itemId}`)
  return res.json()
}

export async function createModuleForItem(itemId: number, payload: CreateLearningModuleDTO): Promise<LearningModule> {
  const res = await fetch(`${BASE_URL}/${itemId}/modules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to create module for item ${itemId}`)
  return res.json()
}

export async function updateLearningModule(
  moduleId: number,
  payload: UpdateLearningModuleDTO
): Promise<LearningModule> {
  const res = await fetch(`${BASE_URL}/modules/${moduleId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to update module ${moduleId}`)
  return res.json()
}

export async function deleteLearningModule(moduleId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/modules/${moduleId}`, { method: "DELETE" })
  if (!res.ok) throw new Error(`Failed to delete module ${moduleId}`)
}

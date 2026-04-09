"use server"

import type { Skill, CreateSkillDTO } from "@/types/types"

const BASE_URL = `${process.env.BACKEND_API}/api/skills`

export async function getAllSkills(): Promise<Skill[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch skills")
  return res.json()
}

export async function createSkill(payload: CreateSkillDTO): Promise<Skill> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create skill")
  return res.json()
}

export async function updateSkill(id: number, payload: CreateSkillDTO): Promise<Skill> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to update skill ${id}`)
  return res.json()
}

export async function deleteSkill(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error(`Failed to delete skill ${id}`)
}

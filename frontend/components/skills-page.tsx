"use client"

import { useMemo, useState } from "react"
import type { Skill, CreateSkillDTO } from "@/types/types"
import { emptySkillForm } from "@/types/types"
import { createSkill, updateSkill, deleteSkill } from "@/lib/actions/skill-actions"
import { exportSkillsToMarkdown } from "@/lib/utils/export-markdown"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PROFICIENCY_LABELS: Record<number, string> = {
  1: "1 — Beginner",
  2: "2 — Basic",
  3: "3 — Intermediate",
  4: "4 — Advanced",
  5: "5 — Expert",
}

const PROFICIENCY_COLORS: Record<number, string> = {
  1: "bg-gray-100 text-gray-700",
  2: "bg-blue-100 text-blue-700",
  3: "bg-yellow-100 text-yellow-800",
  4: "bg-orange-100 text-orange-800",
  5: "bg-green-100 text-green-800",
}

type SortField = "none" | "proficiency" | "date"
type SortDirection = "asc" | "desc"

type Props = {
  initialSkills: Skill[]
}

export default function SkillsPage({ initialSkills }: Props) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [form, setForm] = useState<CreateSkillDTO>(emptySkillForm())
  const [editingId, setEditingId] = useState<number | null>(null)
  const [sortField, setSortField] = useState<SortField>("none")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleField<K extends keyof CreateSkillDTO>(field: K, value: CreateSkillDTO[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError("Skill name is required")
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (editingId !== null) {
        const updated = await updateSkill(editingId, form)
        setSkills((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s)).sort((a, b) => b.proficiency - a.proficiency)
        )
        setEditingId(null)
      } else {
        const created = await createSkill(form)
        setSkills((prev) => [...prev, created].sort((a, b) => b.proficiency - a.proficiency))
      }
      setForm(emptySkillForm())
    } catch {
      setError(editingId !== null ? "Failed to save changes" : "Failed to create skill")
    } finally {
      setLoading(false)
    }
  }

  function startEdit(skill: Skill) {
    setEditingId(skill.id!)
    setForm({ name: skill.name, proficiency: skill.proficiency, date: skill.date ?? "" })
    setError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptySkillForm())
    setError(null)
  }

  async function handleDelete(id: number) {
    setLoading(true)
    try {
      await deleteSkill(id)
      setSkills((prev) => prev.filter((s) => s.id !== id))
    } catch {
      setError("Failed to delete skill")
    } finally {
      setLoading(false)
    }
  }

  const sortedSkills = useMemo(() => {
    const sorted = [...skills]
    if (sortField === "none") {
      return sorted
    }

    const compareDate = (a: Skill, b: Skill) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return a.date.localeCompare(b.date)
    }

    sorted.sort((a, b) => {
      let result = 0
      if (sortField === "proficiency") {
        result = a.proficiency - b.proficiency
      } else if (sortField === "date") {
        result = compareDate(a, b)
      }
      return sortDirection === "asc" ? result : -result
    })
    return sorted
  }, [skills, sortField, sortDirection])

  const grouped =
    sortField === "none"
      ? [5, 4, 3, 2, 1]
          .map((level) => ({
            level,
            items: skills.filter((s) => s.proficiency === level),
          }))
          .filter(({ items }) => items.length > 0)
      : []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Skills</h2>
          <p className="text-sm text-muted-foreground">Sort by date or proficiency to organize your skill list.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Label className="text-sm">Sort by</Label>
            <Select value={sortField} onValueChange={(val) => setSortField(val as SortField)}>
              <SelectTrigger id="skillSortField">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="proficiency">Proficiency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-sm">Direction</Label>
            <Select value={sortDirection} onValueChange={(val) => setSortDirection(val as SortDirection)}>
              <SelectTrigger id="skillSortDirection">
                <SelectValue placeholder="Descending" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={() => exportSkillsToMarkdown(sortedSkills)} disabled={skills.length === 0}>
            Export to Markdown
          </Button>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId !== null ? "Edit Skill" : "Add Skill"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleField("name", e.target.value)}
                  placeholder="e.g. React, Java, SQL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date ?? ""}
                  onChange={(e) => handleField("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proficiency">Proficiency</Label>
                <Select
                  value={String(form.proficiency)}
                  onValueChange={(val) => handleField("proficiency", Number(val))}
                >
                  <SelectTrigger id="proficiency">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {PROFICIENCY_LABELS[n]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingId !== null ? "Save Changes" : "Add Skill"}
              </Button>
              {editingId !== null && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Skill list */}
      {skills.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              No skills added yet. Use the form above to add your first skill.
            </p>
          </CardContent>
        </Card>
      ) : sortField === "none" ? (
        <div className="space-y-6">
          {grouped.map(({ level, items }) => (
            <div key={level}>
              <h2 className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {PROFICIENCY_LABELS[level]}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((skill) => (
                  <Card key={skill.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <p className="font-medium">{skill.name}</p>
                          {skill.date ? <p className="text-sm text-muted-foreground">{skill.date}</p> : null}
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${PROFICIENCY_COLORS[skill.proficiency]}`}
                          >
                            {PROFICIENCY_LABELS[skill.proficiency]}
                          </span>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <Button size="sm" variant="outline" onClick={() => startEdit(skill)}>
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(skill.id!)}
                            disabled={loading}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {sortedSkills.map((skill) => (
            <Card key={skill.id}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-medium">{skill.name}</p>
                    {skill.date ? <p className="text-sm text-muted-foreground">{skill.date}</p> : null}
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${PROFICIENCY_COLORS[skill.proficiency]}`}
                    >
                      {PROFICIENCY_LABELS[skill.proficiency]}
                    </span>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(skill)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(skill.id!)} disabled={loading}>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

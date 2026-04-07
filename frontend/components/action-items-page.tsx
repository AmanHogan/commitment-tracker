"use client"

import { useState } from "react"
import type { ActionItem, CreateActionItemDTO } from "@/types/types"
import { CRITICALITY_OPTIONS, emptyActionItemForm } from "@/types/types"
import { createActionItem, updateActionItem, deleteActionItem } from "@/lib/actions/action-item-actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { exportActionItemsToMarkdown } from "@/lib/utils/export-markdown"

const criticalityColors: Record<string, string> = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  CRITICAL: "bg-red-100 text-red-800",
}

type Props = {
  initialItems: ActionItem[]
}

export default function ActionItemsPage({ initialItems }: Props) {
  const [items, setItems] = useState<ActionItem[]>(initialItems)
  const [form, setForm] = useState<CreateActionItemDTO>(emptyActionItemForm())
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleField(field: keyof CreateActionItemDTO, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError("Name is required")
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (editingId !== null) {
        const updated = await updateActionItem(editingId, form)
        setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
        setEditingId(null)
      } else {
        const created = await createActionItem(form)
        setItems((prev) => [...prev, created])
      }
      setForm(emptyActionItemForm())
    } catch {
      setError(editingId !== null ? "Failed to save changes" : "Failed to create action item")
    } finally {
      setLoading(false)
    }
  }

  function startEdit(item: ActionItem) {
    setEditingId(item.id!)
    setForm({
      name: item.name,
      criticality: item.criticality ?? "",
      dateStarted: item.dateStarted ?? "",
      dateFinished: item.dateFinished ?? "",
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyActionItemForm())
    setError(null)
  }

  async function handleDelete(id: number) {
    setLoading(true)
    try {
      await deleteActionItem(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch {
      setError("Failed to delete action item")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => exportActionItemsToMarkdown(items)}>
          Export to Markdown
        </Button>
      </div>
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId !== null ? "Edit Action Item" : "Add Action Item"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => handleField("name", e.target.value)}
                placeholder="Action item name"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="criticality">Criticality</Label>
              <Select value={form.criticality ?? ""} onValueChange={(val) => handleField("criticality", val)}>
                <SelectTrigger id="criticality">
                  <SelectValue placeholder="Select criticality" />
                </SelectTrigger>
                <SelectContent>
                  {CRITICALITY_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="dateStarted">Date Started</Label>
                <Input
                  id="dateStarted"
                  type="date"
                  value={form.dateStarted ?? ""}
                  onChange={(e) => handleField("dateStarted", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="dateFinished">Date Finished</Label>
                <Input
                  id="dateFinished"
                  type="date"
                  value={form.dateFinished ?? ""}
                  onChange={(e) => handleField("dateFinished", e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingId !== null ? "Save Changes" : "Add Item"}
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

      {/* List */}
      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-muted-foreground">No action items yet.</p>}
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-medium">{item.name}</p>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {item.criticality && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          criticalityColors[item.criticality] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.criticality}
                      </span>
                    )}
                    {item.dateStarted && <span>Started: {item.dateStarted}</span>}
                    {item.dateFinished && <span>Finished: {item.dateFinished}</span>}
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(item)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id!)} disabled={loading}>
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

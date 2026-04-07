"use client"

import { useState } from "react"
import type {
  DevelopmentCommitmentOne,
  CreateDevelopmentCommitmentOneDTO,
  LearningModule,
  CreateLearningModuleDTO,
} from "@/types/types"
import {
  createDevelopmentCommitmentOne,
  deleteDevelopmentCommitmentOne,
  getModulesForItem,
  createModuleForItem,
  updateLearningModule,
  deleteLearningModule,
} from "@/lib/actions/dcomm1-actions"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { exportDcomm1ToMarkdown } from "@/lib/utils/export-markdown"

type Props = {
  initialItems: DevelopmentCommitmentOne[]
}

const emptyItemForm = (): CreateDevelopmentCommitmentOneDTO => ({ itemName: "" })

const emptyModuleForm = (): CreateLearningModuleDTO => ({
  moduleName: "",
  type: "",
  hours: undefined,
  dateStarted: "",
  dateFinished: "",
  finished: false,
  required: false,
  description: "",
})

export default function DevelopmentCommitmentOnePage({ initialItems }: Props) {
  const [items, setItems] = useState<DevelopmentCommitmentOne[]>(initialItems)
  const [itemForm, setItemForm] = useState<CreateDevelopmentCommitmentOneDTO>(emptyItemForm())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null)

  // Per-item module state
  const [modulesByItem, setModulesByItem] = useState<Record<number, LearningModule[]>>({})
  const [moduleForm, setModuleForm] = useState<CreateLearningModuleDTO>(emptyModuleForm())
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null)

  async function handleCreateItem(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const created = await createDevelopmentCommitmentOne(itemForm)
      setItems((prev) => [...prev, created])
      setItemForm(emptyItemForm())
    } catch {
      setError("Failed to create learning item")
    } finally {
      setLoading(false)
    }
  }

  async function toggleExpand(item: DevelopmentCommitmentOne) {
    const id = item.id!
    if (expandedItemId === id) {
      setExpandedItemId(null)
    } else {
      setExpandedItemId(id)
      if (!modulesByItem[id]) {
        try {
          const modules = await getModulesForItem(id)
          setModulesByItem((prev) => ({ ...prev, [id]: modules }))
        } catch {
          setError("Failed to load modules")
        }
      }
      setModuleForm(emptyModuleForm())
      setEditingModuleId(null)
    }
  }

  function handleModuleField(field: keyof CreateLearningModuleDTO, val: string | boolean | number | undefined) {
    setModuleForm((prev) => ({ ...prev, [field]: val }))
  }

  async function handleSaveModule(e: React.FormEvent, itemId: number) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (editingModuleId) {
        const updated = await updateLearningModule(editingModuleId, moduleForm)
        setModulesByItem((prev) => ({
          ...prev,
          [itemId]: prev[itemId].map((m) => (m.id === updated.id ? updated : m)),
        }))
        setEditingModuleId(null)
      } else {
        const created = await createModuleForItem(itemId, moduleForm)
        setModulesByItem((prev) => ({
          ...prev,
          [itemId]: [...(prev[itemId] ?? []), created],
        }))
      }
      setModuleForm(emptyModuleForm())
    } catch {
      setError(editingModuleId ? "Failed to update module" : "Failed to create module")
    } finally {
      setLoading(false)
    }
  }

  function startEditModule(mod: LearningModule) {
    setEditingModuleId(mod.id!)
    setModuleForm({
      moduleName: mod.moduleName,
      type: mod.type ?? "",
      hours: mod.hours,
      dateStarted: mod.dateStarted ?? "",
      dateFinished: mod.dateFinished ?? "",
      finished: mod.finished ?? false,
      required: mod.required ?? false,
      description: mod.description ?? "",
    })
  }

  function cancelEditModule() {
    setEditingModuleId(null)
    setModuleForm(emptyModuleForm())
  }

  async function handleDeleteModule(moduleId: number, itemId: number) {
    try {
      await deleteLearningModule(moduleId)
      setModulesByItem((prev) => ({
        ...prev,
        [itemId]: prev[itemId].filter((m) => m.id !== moduleId),
      }))
    } catch {
      setError("Failed to delete module")
    }
  }

  async function handleDeleteItem(id: number) {
    try {
      await deleteDevelopmentCommitmentOne(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
      if (expandedItemId === id) setExpandedItemId(null)
    } catch {
      setError("Failed to delete learning item")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => exportDcomm1ToMarkdown(items, modulesByItem)}
          className="rounded border px-3 py-1.5 text-sm hover:bg-accent"
        >
          Export to Markdown
        </button>
      </div>
      {/* New learning item form */}
      <form onSubmit={handleCreateItem} className="flex items-end gap-3 rounded border p-4">
        <div className="flex-1">
          <Label>New Learning Item</Label>
          <Input
            required
            placeholder="Item name *"
            value={itemForm.itemName}
            onChange={(e) => setItemForm({ itemName: e.target.value })}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={loading} className="rounded bg-black px-4 py-2 text-sm text-white">
          {loading ? "Saving..." : "Add Item"}
        </button>
      </form>

      {/* Learning items list */}
      <ul className="space-y-3">
        {items.map((item) => {
          const isExpanded = expandedItemId === item.id
          const modules = modulesByItem[item.id!] ?? []
          return (
            <li key={item.id} className="rounded border">
              {/* Item header */}
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{item.itemName}</p>
                  {modulesByItem[item.id!] && (
                    <p className="text-xs text-muted-foreground">{modules.length} module(s)</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => toggleExpand(item)}
                    className="rounded border px-3 py-1 text-sm hover:bg-accent"
                  >
                    {isExpanded ? "Collapse" : "Modules"}
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id!)}
                    className="rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Modules panel */}
              {isExpanded && (
                <div className="space-y-4 border-t px-4 pt-3 pb-4">
                  {/* Module form */}
                  <form onSubmit={(e) => handleSaveModule(e, item.id!)} className="flex flex-col gap-2">
                    <p className="text-sm font-semibold">{editingModuleId ? "Edit Module" : "Add Module"}</p>
                    <Input
                      required
                      placeholder="Module name *"
                      value={moduleForm.moduleName}
                      onChange={(e) => handleModuleField("moduleName", e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type (e.g. course, book)"
                        value={moduleForm.type ?? ""}
                        onChange={(e) => handleModuleField("type", e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder="Hours"
                        value={moduleForm.hours ?? ""}
                        onChange={(e) =>
                          handleModuleField("hours", e.target.value ? parseFloat(e.target.value) : undefined)
                        }
                        className="w-24"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label className="text-xs">Date started</Label>
                        <Input
                          type="date"
                          value={moduleForm.dateStarted ?? ""}
                          onChange={(e) => handleModuleField("dateStarted", e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs">Date finished</Label>
                        <Input
                          type="date"
                          value={moduleForm.dateFinished ?? ""}
                          onChange={(e) => handleModuleField("dateFinished", e.target.value)}
                        />
                      </div>
                    </div>
                    <Textarea
                      placeholder="Description"
                      value={moduleForm.description ?? ""}
                      onChange={(e) => handleModuleField("description", e.target.value)}
                      rows={2}
                    />
                    <div className="flex gap-4 text-sm">
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={moduleForm.finished ?? false}
                          onChange={(e) => handleModuleField("finished", e.target.checked)}
                        />
                        Finished
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={moduleForm.required ?? false}
                          onChange={(e) => handleModuleField("required", e.target.checked)}
                        />
                        Required
                      </label>
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded bg-black px-3 py-1 text-sm text-white"
                      >
                        {loading ? "Saving..." : editingModuleId ? "Update" : "Add Module"}
                      </button>
                      {editingModuleId && (
                        <button type="button" onClick={cancelEditModule} className="rounded border px-3 py-1 text-sm">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Module list */}
                  {modules.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No modules yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {modules.map((mod) => (
                        <li key={mod.id} className="rounded border p-3 text-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-0.5">
                              <p className="font-medium">{mod.moduleName}</p>
                              {mod.type && <p className="text-muted-foreground">Type: {mod.type}</p>}
                              {mod.hours != null && <p className="text-muted-foreground">Hours: {mod.hours}</p>}
                              {mod.dateStarted && <p className="text-muted-foreground">Started: {mod.dateStarted}</p>}
                              {mod.dateFinished && (
                                <p className="text-muted-foreground">Finished: {mod.dateFinished}</p>
                              )}
                              {mod.description && <p className="text-muted-foreground">{mod.description}</p>}
                              <div className="flex gap-3 text-xs text-muted-foreground">
                                {mod.finished && <span className="text-green-600">✓ Finished</span>}
                                {mod.required && <span>Required</span>}
                              </div>
                            </div>
                            <div className="flex shrink-0 flex-col gap-1">
                              <button
                                onClick={() => startEditModule(mod)}
                                className="rounded border px-2 py-1 text-xs hover:bg-accent"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteModule(mod.id!, item.id!)}
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

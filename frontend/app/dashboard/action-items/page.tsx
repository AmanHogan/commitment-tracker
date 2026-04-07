import ActionItemsPage from "@/components/action-items-page"
import { getAllActionItems } from "@/lib/actions/action-item-actions"

export const dynamic = "force-dynamic"

export default async function ActionItemsRoute() {
  const items = await getAllActionItems()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Action Items</h1>
      <ActionItemsPage initialItems={items} />
    </div>
  )
}

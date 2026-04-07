import DevelopmentCommitmentOnePage from "@/components/dcomm1-page"
import { getAllDevelopmentCommitmentsOne } from "@/lib/actions/dcomm1-actions"

export const dynamic = "force-dynamic"

export default async function DevelopmentCommitmentsOnePage() {
  const items = await getAllDevelopmentCommitmentsOne()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Development Commitments 1</h1>
      <DevelopmentCommitmentOnePage initialItems={items} />
    </div>
  )
}

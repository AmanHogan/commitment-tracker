import DevelopmentCommitmentTwoPage from "@/components/dcomm2-page"
import { getAllDevelopmentCommitmentsTwo } from "@/lib/actions/dcomm2-actions"

export const dynamic = "force-dynamic"

export default async function DevelopmentCommitmentsTwoPage() {
  const events = await getAllDevelopmentCommitmentsTwo()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Development Commitments 2</h1>
      <DevelopmentCommitmentTwoPage initialEvents={events} />
    </div>
  )
}

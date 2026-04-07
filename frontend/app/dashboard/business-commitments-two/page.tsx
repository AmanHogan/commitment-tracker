import BusinessCommitmentTwoPage from "@/components/bcomm2-page"
import { getAllBusinessCommitmentsTwo } from "@/lib/actions/bcomm2-actions"

export const dynamic = "force-dynamic"

export default async function BusinessCommitmentsTwoPage() {
  const events = await getAllBusinessCommitmentsTwo()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Business Commitments 2</h1>
      <BusinessCommitmentTwoPage initialEvents={events} />
    </div>
  )
}

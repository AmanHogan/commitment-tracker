import CommitmentList from "@/components/bcomm-page"
import { getAllCommitmentsOne } from "@/lib/actions/data-actions"

export default async function BusinessCommitmentsPage() {
  const commitments = await getAllCommitmentsOne()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Business Commitments 1</h1>
      <CommitmentList initialCommitments={commitments} />
    </div>
  )
}

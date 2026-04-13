import BusinessCommitmentsComp from "@/components/bcomm-page"
import SectionLabel from "@/components/ui/section-label"
import { getAllCommitmentsOne } from "@/lib/actions/data-actions"

export const dynamic = "force-dynamic"

export default async function BusinessCommitmentsPage() {
  const commitments = await getAllCommitmentsOne()
  return (
    <div>
      <SectionLabel size="lg">Business Partner Impact</SectionLabel>
      <BusinessCommitmentsComp initialCommitments={commitments} />
    </div>
  )
}

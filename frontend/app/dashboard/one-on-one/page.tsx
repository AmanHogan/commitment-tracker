import OneOnOnePage from "@/components/one-on-one-page"
import { getAllOneOnOnes } from "@/lib/actions/one-on-one-actions"

export const dynamic = "force-dynamic"

export default async function OneOnOnePageRoute() {
  const docs = await getAllOneOnOnes()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">1-on-1 Documents</h1>
      <OneOnOnePage initialDocs={docs} />
    </div>
  )
}

import SkillsPage from "@/components/skills-page"
import { getAllSkills } from "@/lib/actions/skill-actions"

export const dynamic = "force-dynamic"

export default async function SkillsRoute() {
  const skills = await getAllSkills()
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Skills</h1>
      <SkillsPage initialSkills={skills} />
    </div>
  )
}

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"

export default function TdpDocsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">TDP Commitments Overview</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Business Partner Impact Commitment #1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 font-medium">Goals/Measures (WHAT & HOW)</p>
            <p className="mb-2">
              You will share at least three accomplishments and clearly describe how each one added business value
              (e.g., improved outcomes, increased efficiency, reduced risk/cost, or enhanced customer/employee
              experience).
            </p>
            <p className="mb-2 font-medium">Validation/Completion Criteria</p>
            <ul className="ml-4 list-disc">
              <li>Recorded at least three distinct accomplishments during Business Partner assignment.</li>
              <li>
                For each accomplishment, describe what you did, the problem/opportunity, who benefited, why it mattered,
                measurable impact, and value category.
              </li>
            </ul>
            <p className="mt-3 font-medium">Tips</p>
            <ul className="ml-4 list-disc">
              <li>Ask your Business Partners what key deliverables they expect this year.</li>
              <li>Think how your work ties to ATS transformational initiatives and 2026 priorities.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AT&T/TDP Program Impact Commitment #2</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 font-medium">Goals/Measures (WHAT & HOW)</p>
            <p className="mb-2">
              Provide at least three examples of how you distinguished yourself and engaged within the TDP program.
              Attend and actively participate in TDP experience events throughout the year.
            </p>
            <p className="mb-2 font-medium">Validation/Completion Criteria</p>
            <ul className="ml-4 list-disc">
              <li>Document three specific examples of engagement that strengthened your brand.</li>
              <li>List TDP experience events attended with dates and participation.</li>
            </ul>
            <p className="mt-3 font-medium">Tips</p>
            <ul className="ml-4 list-disc">
              <li>Serve as a committee lead or local/national event lead.</li>
              <li>Participate in TDP Center activities, Fireside Chats, Townhalls, or Quarterly Earnings Calls.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TDP Development Commitment #1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 font-medium">Overview</p>
            <p className="mb-2">
              Build track-aligned technical skills, strengthen AI capabilities, deepen business knowledge, and enhance
              leadership skills to deliver greater impact and improve marketability.
            </p>
            <p className="mb-2 font-medium">Areas of focus</p>
            <ul className="ml-4 list-disc">
              <li>Technical training aligned to TDP track</li>
              <li>AI-focused training and GrowthHub usage</li>
              <li>Leadership/soft skills (presentation, EI, communication)</li>
              <li>Business/industry knowledge training</li>
              <li>Advanced learning (Masters, Nanodegrees, Certifications)</li>
            </ul>
            <p className="mt-3 font-medium">Validation/Completion Criteria</p>
            <p>
              Track and discuss development progress, document courses/training completed for inclusion in 1x1s,
              mid-year reviews, and year-end reviews.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TDP Development (Innovation) Commitment #2</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 font-medium">Goals/Measures</p>
            <p className="mb-2">
              Complete at least two TDP innovation events or hackathons to demonstrate initiative, collaboration, and
              applied skills.
            </p>
            <p className="mb-2 font-medium">Expectations</p>
            <ul className="ml-4 list-disc">
              <li>Participate in two innovation events per year: one in Jan–Jun and one in Jul–Dec.</li>
              <li>
                Examples: Q2 TDP Hackathon, ATS Software Symposium, Local Lab Project, Bounty Hunters, Face the Floor.
              </li>
            </ul>
            <p className="mt-3 font-medium">Validation/Completion Criteria</p>
            <ul className="ml-4 list-disc">
              <li>Hackathons validated by end-to-end participation and final demo.</li>
              <li>Local lab projects validated by national AD Leads via demo or recorded evidence.</li>
              <li>IIC Coach validated by patent submission with intern team.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

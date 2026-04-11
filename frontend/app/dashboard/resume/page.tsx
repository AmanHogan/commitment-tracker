import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardResumePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Resume</h1>
        <p className="max-w-2xl text-muted-foreground">
          Store a PDF at <code className="rounded bg-muted px-1 py-0.5">/public/resume/resume.pdf</code> to surface it
          here. The file will be served from <code className="rounded bg-muted px-1 py-0.5">/resume/resume.pdf</code>.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resume preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              If the PDF is available, it will render below. Otherwise, use the download link to open it in a new tab.
            </p>
            <p>
              Place your resume file in the <code className="rounded bg-muted px-1 py-0.5">public/resume</code> folder
              and refresh the page.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border bg-background">
            <object
              data="/resume/resume.pdf"
              type="application/pdf"
              className="h-[calc(100vh-18rem)] min-h-[520px] w-full"
            >
              <div className="space-y-2 p-6 text-sm text-muted-foreground">
                <p>Your browser cannot display the embedded PDF.</p>
                <p>
                  Open the resume directly in a new tab:
                  <a
                    href="/resume/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1 font-medium text-primary underline"
                  >
                    Download resume
                  </a>
                </p>
              </div>
            </object>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

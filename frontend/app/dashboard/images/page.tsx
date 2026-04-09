import path from "path"
import { promises as fs } from "fs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif", ".bmp", ".ico"]

export const dynamic = "force-dynamic"

async function findImages(dir: string, relativePath = ""): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const results: string[] = []

  for (const entry of entries) {
    const entryRelative = relativePath ? `${relativePath}/${entry.name}` : entry.name
    const entryPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      results.push(...(await findImages(entryPath, entryRelative)))
      continue
    }

    if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      results.push(entryRelative)
    }
  }

  return results
}

async function loadImages(): Promise<string[]> {
  const publicDir = path.join(process.cwd(), "public")

  try {
    const stat = await fs.stat(publicDir)
    if (!stat.isDirectory()) return []
    return await findImages(publicDir)
  } catch {
    return []
  }
}

export default async function DashboardImagesPage() {
  const imageFiles = await loadImages()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Public Images</h1>
        <p className="max-w-2xl text-muted-foreground">
          All image files stored in the app&apos;s <code className="rounded bg-muted px-1 py-0.5">/public</code> folder
          are listed here. Add diagrams or screenshots directly to that folder and refresh the page.
        </p>
      </div>

      {imageFiles.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No images found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              There are no supported images in the public folder yet. Add files like <code>diagram.png</code> or{" "}
              <code>flowchart.svg</code> to <code>/public</code> and refresh.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
            {imageFiles.length} image{imageFiles.length === 1 ? "" : "s"} found.
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {imageFiles.map((file) => (
              <Card key={file} className="overflow-hidden">
                <div className="overflow-hidden bg-black/5">
                  <img src={`/${file}`} alt={file} className="h-72 w-full bg-white object-contain" />
                </div>
                <CardContent>
                  <p className="font-medium">{file}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

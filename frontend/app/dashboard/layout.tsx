"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  Lightbulb,
  Briefcase,
  Users,
  CheckSquare,
  ImageIcon,
  Sparkles,
  FileText,
} from "lucide-react"

const business = [
  { label: "Business Partner Impact Commitment #1", href: "/dashboard/business-commitments", icon: ClipboardList },
  { label: "AT&T / TDP Program Impact Commitment #2", href: "/dashboard/business-commitments-two", icon: Briefcase },
]

const development = [
  { label: "Development Commitment #1", href: "/dashboard/development-commitments-one", icon: BookOpen },
  {
    label: "TDP Development (Innovation) Commitment #2",
    href: "/dashboard/development-commitments-two",
    icon: Lightbulb,
  },
]

const others = [
  { label: "1-on-1 Documents", href: "/dashboard/one-on-one", icon: Users },
  { label: "Action Items", href: "/dashboard/action-items", icon: CheckSquare },
  { label: "Skills", href: "/dashboard/skills", icon: Sparkles },
  { label: "Images", href: "/dashboard/images", icon: ImageIcon },
  { label: "Resume", href: "/dashboard/resume", icon: FileText },
  { label: "TDP Docs", href: "/docs/tdp", icon: BookOpen },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-72 flex-col gap-1 border-r bg-muted/40 p-4">
        <p className="mb-3 px-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Commitment Tracker
        </p>
        <div className="px-1">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="my-2 border-t" />
          <p className="mb-2 px-2 text-xs font-medium text-muted-foreground uppercase">Business</p>
          {business.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          <p className="mt-3 mb-2 px-2 text-xs font-medium text-muted-foreground uppercase">Development</p>
          {development.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          <p className="mt-3 mb-2 px-2 text-xs font-medium text-muted-foreground uppercase">Other</p>
          {others.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

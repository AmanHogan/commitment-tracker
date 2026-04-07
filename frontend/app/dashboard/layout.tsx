"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ClipboardList, BookOpen, Lightbulb, Briefcase, Users, CheckSquare } from "lucide-react"

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Business Commitments",
    href: "/dashboard/business-commitments",
    icon: ClipboardList,
  },
  {
    label: "Business Commitments 2",
    href: "/dashboard/business-commitments-two",
    icon: Briefcase,
  },
  {
    label: "Dev Commitments 1",
    href: "/dashboard/development-commitments-one",
    icon: BookOpen,
  },
  {
    label: "Dev Commitments 2",
    href: "/dashboard/development-commitments-two",
    icon: Lightbulb,
  },
  {
    label: "1-on-1 Documents",
    href: "/dashboard/one-on-one",
    icon: Users,
  },
  {
    label: "Action Items",
    href: "/dashboard/action-items",
    icon: CheckSquare,
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col gap-1 border-r bg-muted/40 p-4">
        <p className="mb-3 px-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Commitment Tracker
        </p>
        {navItems.map(({ label, href, icon: Icon }) => (
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
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

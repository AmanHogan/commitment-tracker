"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
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

const navItems = {
  dashboard: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  business: [
    { label: "Business Partner Impact", href: "/dashboard/business-commitments", icon: ClipboardList },
    { label: "TDP Program Impact", href: "/dashboard/business-commitments-two", icon: Briefcase },
  ],
  development: [
    { label: "Dev Commitment #1", href: "/dashboard/development-commitments-one", icon: BookOpen },
    {
      label: "Innovation Commitment #2",
      href: "/dashboard/development-commitments-two",
      icon: Lightbulb,
    },
    { label: "Skills", href: "/dashboard/skills", icon: Sparkles },
    { label: "Resume", href: "/dashboard/resume", icon: FileText },
  ],
  oneOnOne: [{ label: "One on One Documents", href: "/dashboard/one-on-one", icon: Users }],
  other: [
    { label: "Action Items", href: "/dashboard/action-items", icon: CheckSquare },
    { label: "Images", href: "/dashboard/images", icon: ImageIcon },
    { label: "TDP Docs", href: "/docs/tdp", icon: BookOpen },
  ],
}

function SidebarSection({ title, items }: { title: string; items: typeof navItems.business }) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ label, href, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton asChild isActive={pathname === href} className="h-auto overflow-visible py-2">
                <Link href={href} className="flex w-full items-start gap-2">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="!truncate-none max-w-full break-words whitespace-normal">{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold">Commitment Tracker</p>
          <p className="text-xs text-muted-foreground">Quick access to all sections</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 pb-4">
        <SidebarSection title="Dashboard" items={navItems.dashboard} />
        <SidebarSection title="Business" items={navItems.business} />
        <SidebarSection title="Development" items={navItems.development} />
        <SidebarSection title="One on One Documents" items={navItems.oneOnOne} />
        <SidebarSection title="Other" items={navItems.other} />
      </SidebarContent>
    </Sidebar>
  )
}

"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  FaHome,
  FaMapMarkedAlt,
  FaCar,
  FaHotel,
  FaUtensils,
  FaCogs,
  FaStar,
  FaHeart,
  FaClipboardList,
} from "react-icons/fa"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

const adminMenu = [
  {
    group: "Manajemen",
    items: [
      { title: "Dashboard", url: "/admin", icon: FaHome },
      { title: "Destinasi", url: "/admin/destinasi", icon: FaMapMarkedAlt },
      { title: "Jeep Tour", url: "/admin/jeeptour", icon: FaCar },
      { title: "Villa", url: "/admin/villa", icon: FaHotel },
      { title: "Restoran", url: "/admin/restoran", icon: FaUtensils },
    ],
  },
  {
    group: "Aktivitas",
    items: [
      { title: "Review", url: "/admin/review", icon: FaStar },
      { title: "Favorit", url: "/admin/favorit", icon: FaHeart },
      { title: "Booking", url: "/admin/booking", icon: FaClipboardList },
    ],
  },
  {
    group: "Lainnya",
    items: [{ title: "Pengaturan", url: "/admin/settings", icon: FaCogs }],
  },
]

export function AdminSidebar() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const user = session?.user

  return (
    <Sidebar className="min-h-screen bg-gradient-to-b from-primary/10 via-white/80 to-white dark:from-gray-900 dark:via-gray-950 dark:to-black backdrop-blur-lg shadow-lg border-r border-gray-200 dark:border-gray-800 transition-all">
      <SidebarContent className="p-4">
        {/* === USER INFO === */}
        {status === "loading" ? (
          <div className="flex items-center gap-3 mb-6 border-b pb-4 mt-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-1 w-full">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-16 mt-1" />
            </div>
          </div>
        ) : user ? (
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4 mt-2">
            <Avatar className="w-12 h-12 border-2 border-primary/50 shadow-md hover:scale-105 transition-transform">
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback className="bg-primary/20 text-primary font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <div className="font-semibold text-sm text-gray-900 dark:text-white truncate max-w-[180px]">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                {user.email}
              </div>
              {user.role === "ADMIN" && (
                <span className="text-[10px] tracking-wide font-semibold text-primary bg-primary/20 px-2 py-0.5 rounded-full w-fit mt-1 shadow-sm">
                  ● Admin
                </span>
              )}
            </div>
          </div>
        ) : null}

        {/* === SIDEBAR MENU === */}
        {status === "loading" && (
          <>
            {[...Array(2)].map((_, i) => (
              <SidebarGroup key={i}>
                <SidebarGroupLabel>
                  <Skeleton className="h-4 w-24" />
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {[...Array(4)].map((_, j) => (
                      <SidebarMenuItem key={j}>
                        <div className="flex items-center gap-3 px-3 py-2">
                          <Skeleton className="w-4 h-4 rounded" />
                          <Skeleton className="h-4 w-28" />
                        </div>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </>
        )}

        {user?.role === "ADMIN" &&
          adminMenu.map((section) => (
            <SidebarGroup key={section.group}>
              <SidebarGroupLabel className="text-[11px] uppercase tracking-wide font-medium text-gray-500 dark:text-gray-400 mb-1">
                {section.group}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => {
                    const isActive = pathname === item.url
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.url}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group
                              ${
                                isActive
                                  ? "bg-primary text-white font-semibold shadow-md scale-[1.02]"
                                  : "text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary"
                              }`}
                          >
                            <item.icon
                              className={`w-4 h-4 transition-colors duration-200 group-hover:text-primary ${
                                isActive ? "text-white" : "text-gray-500"
                              }`}
                            />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
      </SidebarContent>
    </Sidebar>
  )
}

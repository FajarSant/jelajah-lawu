"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
} from "react-icons/fa";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const adminMenu = [
  { title: "Dashboard", url: "/admin", icon: FaHome },
  { title: "Destinasi", url: "/admin/destinasi", icon: FaMapMarkedAlt },
  { title: "Jeep Tour", url: "/admin/jeeptour", icon: FaCar },
  { title: "Villa", url: "/admin/villa", icon: FaHotel },
  { title: "Restoran", url: "/admin/restoran", icon: FaUtensils },
  { title: "Review", url: "/admin/review", icon: FaStar },
  { title: "Favorit", url: "/admin/favorit", icon: FaHeart },
  { title: "Booking", url: "/admin/booking", icon: FaClipboardList },
  { title: "Pengaturan", url: "/admin/settings", icon: FaCogs },
];

export function AdminSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (session?.user.role !== "ADMIN") return null;

  const user = session.user;

  return (
    <Sidebar className="min-h-screen bg-white dark:bg-gray-950 shadow-md">
      <SidebarContent className="p-2">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-6 border-b pb-4 mt-4">
          {/* Avatar */}
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          {/* Info dan Role */}
          <div className="flex flex-col gap-0.5">
            <div className="font-medium text-sm text-gray-900 dark:text-white truncate max-w-[180px]">
              {user.name}
            </div>
            <div className="text-xs text-muted-foreground truncate max-w-[180px]">
              {user.email}
            </div>
            {user.role === "ADMIN" && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md w-fit mt-1">
                Admin
              </span>
            )}
          </div>
        </div>

        {/* Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground uppercase text-xs font-medium mb-1 tracking-wide">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-muted 
                      ${
                        pathname === item.url
                          ? "bg-muted text-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

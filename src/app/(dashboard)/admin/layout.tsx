import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/Admin/Admin-Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
          <main className="flex-1 overflow-y-auto p-4 bg-muted dark:bg-muted/80">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

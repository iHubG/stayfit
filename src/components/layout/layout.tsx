import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "./Sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4 bg-gray-50 min-h-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ThemeToggle from "@/components/themeToggle";
import SignOut from "@/components/signout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/login");
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full p-4">
        <div className="w-full flex items-center justify-between">
          <SidebarTrigger />

          <nav className="flex items-center justify-end gap-2 ">
            <ThemeToggle />
            <SignOut />
          </nav>
        </div>

        {children}
      </main>
    </SidebarProvider>
  );
}

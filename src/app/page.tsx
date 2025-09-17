import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { UserList } from "@/components/user-list";
import { AddUserForm } from "@/components/add-user-form";
import { FileUpload } from "@/components/file-upload";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="grid gap-6">
            <UserList />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <AddUserForm />
            <FileUpload />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

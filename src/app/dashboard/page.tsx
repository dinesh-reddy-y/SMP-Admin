
"use client";

import { UserList } from "@/components/user-list";
import { AddUserForm } from "@/components/add-user-form";
import { FileUpload } from "@/components/file-upload";

export default function DashboardPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="grid gap-6">
        <UserList />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <AddUserForm />
        <FileUpload onUploadComplete={() => {}} />
      </div>
    </main>
  );
}

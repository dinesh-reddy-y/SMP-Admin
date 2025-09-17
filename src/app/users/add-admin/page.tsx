import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AddUserForm } from "@/components/add-user-form";

export default function AddAdminPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Add Administrator</h1>
        <p className="text-muted-foreground">
          Use the form below to add a new user with administrative privileges.
        </p>
      </div>
      <div className="max-w-2xl">
         <AddUserForm />
      </div>
    </main>
  );
}

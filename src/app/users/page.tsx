import { UserList } from "@/components/user-list";
import { AddUserForm } from "@/components/add-user-form";

export default function UsersPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="grid gap-6">
        <UserList />
      </div>
       <div className="grid gap-6">
        <AddUserForm />
      </div>
    </main>
  );
}

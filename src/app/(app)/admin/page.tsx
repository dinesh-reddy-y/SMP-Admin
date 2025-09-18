import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('/users/add-admin');
}

import { isAdmin, authConfigured } from "@/server/auth";
import { Login } from "@/components/login";
import { AdminApp } from "@/components/admin-app";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Demo Studio",
  robots: { index: false, follow: false },
};
export default async function AdminPage() {
  return (await isAdmin()) ? (
    <AdminApp />
  ) : (
    <Login configured={authConfigured()} />
  );
}

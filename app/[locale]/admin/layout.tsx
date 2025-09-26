import { requireAdminAccess } from "@/lib/auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // This will redirect unauthorized users before rendering any admin content
  await requireAdminAccess();

  return <>{children}</>;
}

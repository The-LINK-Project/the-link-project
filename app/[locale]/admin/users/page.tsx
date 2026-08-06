import { getAllUsers } from "@/lib/actions/user.actions";
import { UserDataTable } from "@/components/admin/UserDataTable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

// Never prerender: the user list must be fetched per-request as the signed-in
// admin (a build-time render has no session and would bake a stale list in)
export const dynamic = "force-dynamic";

export default async function UsersManagePage() {
    const users = await getAllUsers();

    return (
        <AdminPageShell
            title="User Management"
            description="Accounts and profile data from the database"
            backHref="/admin"
            backLabel="Back to Dashboard"
            actions={
                <Badge
                    variant="secondary"
                    className="bg-[rgb(90,199,219)]/10 text-[rgb(70,179,199)] border-[rgb(90,199,219)]/20"
                >
                    {users.length} Total Users
                </Badge>
            }
        >
            <Card className="bg-white border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg text-slate-900">
                        User Database
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <UserDataTable users={users} />
                </CardContent>
            </Card>
        </AdminPageShell>
    );
}

import { getAllUsers } from "@/lib/actions/user.actions";
import { UserDataTable } from "@/components/admin/UserDataTable";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UsersManagePage() {
  const users = await getAllUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Users className="h-8 w-8 text-[rgb(90,199,219)]" />
                User Management
              </h1>
              <p className="text-slate-600 mt-2">
                Monitor student progress and platform engagement
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {users.length} Total Users
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* User Data Table */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              User Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserDataTable users={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

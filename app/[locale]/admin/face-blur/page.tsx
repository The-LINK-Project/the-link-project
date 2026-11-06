import React from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import FaceBlurTool from "@/components/admin/face-blur/FaceBlurTool";

// Admin access is enforced by app/[locale]/admin/layout.tsx. The tool itself
// runs entirely in the browser: photos never reach the server.
const FaceBlurPage = () => (
    <AdminPageShell
        title="Face Blur"
        description="Blur everyone's face in workshop photos before they're shared, for organisations that don't want faces shown. The LINK team is left as is. Photos never leave this browser."
        backHref="/admin"
        backLabel="Back to Dashboard"
    >
        <FaceBlurTool />
    </AdminPageShell>
);

export default FaceBlurPage;

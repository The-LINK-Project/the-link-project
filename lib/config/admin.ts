// Configuration for admin access control
export const ADMIN_CONFIG = {
  // Email addresses allowed to access admin routes
  // Update these with your actual email addresses for production
  adminEmails: ["adrishmajumder7@gmail.com"],

  // Redirect paths
  redirectPaths: {
    unauthorized: "/",
    signIn: "/sign-in",
  },
};

// Helper function to check if email is admin
export function isAdminEmail(email: string | undefined): boolean {
  return email ? ADMIN_CONFIG.adminEmails.includes(email) : false;
}

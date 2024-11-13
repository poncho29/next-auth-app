import { auth } from "@/auth";

import { LogoutButton } from "@/components/auth";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>
  }
  
  return (
    <div>
      <h1>Admin Page</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>

      <LogoutButton />
    </div>
  );
}
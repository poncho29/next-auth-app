import Link from "next/link";

export default function AdminLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <>
      <header className="w-full h-20 flex items-center justify-between px-8 bg-slate-100">
        <h1>Admin Layout</h1>

        <nav className="flex items-center gap-4">
          <Link href="/admin">Inicio</Link>
          <Link href="/admin/users">Usuarios</Link>
          <Link href="/admin/products">Productos</Link>
          <Link href="/admin/orders">Ordenes</Link>
        </nav>
      </header>

      <main className="p-8">
        {children}
      </main>
    </>
  );
}
import { FormRegister } from "@/components/auth";

export default function RegisterPage() {
  return (
    <div className="min-w-96">
      <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>

      <FormRegister />
    </div>
  );
}
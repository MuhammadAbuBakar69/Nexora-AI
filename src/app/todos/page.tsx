import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function TodosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from("todos").select();

  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-light text-violet-primary flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111111]">Supabase Connection Test</h1>
            <p className="text-xs text-secondary font-mono">
              Target Table: &apos;todos&apos; • Project: ijuliufwqhqhxpldskks.supabase.co
            </p>
          </div>
        </div>

        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Nexora
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm">
          <p className="font-semibold mb-1">Supabase Client Connected Successfully</p>
          <p className="text-xs text-amber-800">
            {error.message} (Note: Create the &apos;todos&apos; table in your Supabase SQL Editor to populate data).
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {todos && todos.length > 0 ? (
            todos.map((todo: any) => (
              <li
                key={todo.id}
                className="p-3 border border-border rounded-xl bg-surface text-sm font-medium"
              >
                {todo.name || todo.title || JSON.stringify(todo)}
              </li>
            ))
          ) : (
            <div className="p-6 text-center border border-dashed rounded-2xl bg-surface/50 text-secondary text-sm">
              <p>Connected to Supabase! No rows found in the &apos;todos&apos; table yet.</p>
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

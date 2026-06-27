import { Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function RocMcaPage() {
  // Fetch tasks specifically related to ROC or MCA
  const rocTasks = await prisma.task.findMany({
    where: {
      OR: [
        { title: { contains: "ROC" } },
        { title: { contains: "MCA" } },
        { title: { contains: "Annual Return" } }
      ]
    },
    include: { client: true },
    orderBy: { dueDate: "asc" }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <Building2 className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-slate-900 mb-2">ROC / MCA Filings</h1>
          <p className="text-slate-500">Track all Ministry of Corporate Affairs and Registrar of Companies compliance.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-semibold text-slate-700">Dedicated ROC Workflow (Beta)</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
              <th className="py-3 px-6 font-semibold">Client</th>
              <th className="py-3 px-6 font-semibold">Form / Filing</th>
              <th className="py-3 px-6 font-semibold">Due Date</th>
              <th className="py-3 px-6 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rocTasks.map((task: any) => (
              <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 font-medium text-slate-900">{task.client?.companyName}</td>
                <td className="py-4 px-6 text-slate-600">{task.title}</td>
                <td className="py-4 px-6 text-red-600 font-medium">{new Date(task.dueDate).toLocaleDateString('en-GB')}</td>
                <td className="py-4 px-6">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-200">
                    {task.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
            {rocTasks.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500">No ROC tasks currently active. Create one from the Task Workflow.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

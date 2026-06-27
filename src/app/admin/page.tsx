export const dynamic = 'force-dynamic';

import { AlertCircle, ArrowUpRight, CheckCircle2, Clock, IndianRupee } from "lucide-react";
import { prisma } from "@/lib/prisma";

// This is a Server Component, meaning this runs securely on the backend (Vercel edge/node)
export default async function AdminOverview() {
  // Real Database Queries!
  const totalTasks = await prisma.task.count();
  const pendingDeadlinesCount = await prisma.task.count({
    where: {
      status: { not: "COMPLETED" },
      dueDate: { lte: new Date(new Date().setDate(new Date().getDate() + 7)) } // Due in next 7 days
    }
  });

  const completedTasks = await prisma.task.count({
    where: { status: "COMPLETED" }
  });

  const totalRevenueData = await prisma.invoice.aggregate({
    _sum: { amount: true },
    where: { status: "PAID" }
  });

  const totalRevenue = totalRevenueData._sum.amount || 0;

  const urgentTasks = await prisma.task.findMany({
    where: {
      status: { not: "COMPLETED" },
    },
    include: { client: true },
    orderBy: { dueDate: "asc" },
    take: 5
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-slate-900 mb-2">Firm Overview</h1>
        <p className="text-slate-500">Track deadlines, team productivity, and revenue at a glance. (Live Database Data)</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-500 text-sm font-semibold uppercase">Pending Deadlines</h3>
            <span className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertCircle className="w-5 h-5" /></span>
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900">{pendingDeadlinesCount}</p>
            <p className="text-sm text-red-600 mt-2 font-medium">Within next 7 days</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-500 text-sm font-semibold uppercase">Active Tasks</h3>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Clock className="w-5 h-5" /></span>
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900">{totalTasks - completedTasks}</p>
            <p className="text-sm text-slate-500 mt-2">Currently in workflow</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-500 text-sm font-semibold uppercase">Completed (MTD)</h3>
            <span className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle2 className="w-5 h-5" /></span>
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900">{completedTasks}</p>
            <p className="text-sm text-green-600 mt-2 font-medium">Historical completion</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-500 text-sm font-semibold uppercase">Total Revenue</h3>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><IndianRupee className="w-5 h-5" /></span>
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900">₹{(totalRevenue / 100000).toFixed(2)}L</p>
            <p className="text-sm text-emerald-600 mt-2 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> Based on paid invoices
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Urgent Deadlines Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Critical Compliance Calendar</h2>
            <a href="/admin/calendar" className="text-sm font-medium text-blue-600 hover:underline">View All</a>
          </div>
          <div className="p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs uppercase text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-semibold">Client</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Deadline</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {urgentTasks.map((task: any) => (
                  <tr key={task.id} className="border-b border-slate-50">
                    <td className="py-4 font-medium text-slate-900">{task.client?.companyName || "Unknown"}</td>
                    <td className="py-4 text-slate-600">{task.title}</td>
                    <td className="py-4 text-red-600 font-medium">{task.dueDate.toLocaleDateString('en-GB')}</td>
                    <td className="py-4 text-right">
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-semibold">
                        {task.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
                {urgentTasks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">No urgent tasks right now.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue by Service */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Revenue by Service (Demo View)</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">Audit & Assurance</span>
                  <span className="font-bold text-slate-900">₹1,80,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">GST Compliance</span>
                  <span className="font-bold text-slate-900">₹1,20,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

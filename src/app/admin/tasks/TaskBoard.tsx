"use client";

import { useState } from "react";
import { Clock, FileText, Search, Plus, X } from "lucide-react";
import { createTask, updateTaskStatus } from "./actions";

type Task = any; // Simplifying for demo
type Client = any;
type Staff = any;

const COLUMNS = [
  { id: "DOC_COLLECTION", name: "Doc Collection", color: "bg-slate-100 text-slate-600 border-slate-300" },
  { id: "PREPARATION", name: "Preparation", color: "bg-amber-50 text-amber-700 border-amber-300" },
  { id: "REVIEW", name: "Review", color: "bg-blue-50 text-blue-700 border-blue-300" },
  { id: "FILING", name: "Filing / Completion", color: "bg-green-50 text-green-700 border-green-300" },
];

export function TaskBoard({ initialTasks, clients, staff }: { initialTasks: Task[], clients: Client[], staff: Staff[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTasks = initialTasks.filter((t: any) => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.client.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleMove(taskId: string, currentStatus: string, direction: 1 | -1) {
    const currentIndex = COLUMNS.findIndex(c => c.id === currentStatus);
    const nextStatus = COLUMNS[currentIndex + direction]?.id;
    if (nextStatus) {
      await updateTaskStatus(taskId, nextStatus);
    }
  }

  async function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createTask(formData);
    setIsModalOpen(false);
  }

  return (
    <div className="max-w-full h-full flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-slate-900 mb-2">Task Workflow</h1>
          <p className="text-slate-500">Monitor assignments from document collection to completion.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tasks or clients..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:border-slate-400" 
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 pb-4">
        {COLUMNS.map((col, i) => {
          const colTasks = filteredTasks.filter((t: any) => t.status === col.id);
          return (
            <div key={col.id} className="flex flex-col bg-slate-100/50 rounded-xl p-4 border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-slate-700">{col.name}</h2>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${col.color}`}>{colTasks.length}</span>
              </div>
              
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.map((task: any) => (
                  <div key={task.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-blue-400 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold uppercase text-slate-500 tracking-wider truncate mr-2">{task.title}</span>
                      <span className="text-[10px] text-red-600 font-medium shrink-0 bg-red-50 px-1 rounded">
                        Due: {new Date(task.dueDate).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <h3 className="font-medium text-slate-900 mb-3">{task.client?.companyName}</h3>
                    
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex -space-x-2">
                        {task.staff && (
                          <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-700" title={task.staff.name}>
                            {task.staff.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between border-t border-slate-100 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleMove(task.id, task.status, -1)}
                        disabled={i === 0}
                        className="text-xs text-slate-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-500"
                      >
                        &larr; Prev
                      </button>
                      <button 
                        onClick={() => handleMove(task.id, task.status, 1)}
                        disabled={i === COLUMNS.length - 1}
                        className="text-xs text-slate-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-500"
                      >
                        Next &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* NEW TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-slate-900 mb-6">Create New Task</h2>
            
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Task Title</label>
                <input name="title" required placeholder="e.g. GSTR-1" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Client</label>
                <select name="clientId" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500 bg-white">
                  <option value="">Select a Client...</option>
                  {clients.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.companyName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Assign to Staff</label>
                <select name="staffId" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500 bg-white">
                  <option value="">Unassigned</option>
                  {staff.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Due Date</label>
                <input type="date" name="dueDate" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 rounded-lg">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

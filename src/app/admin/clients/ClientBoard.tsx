"use client";

import { useState } from "react";
import { Plus, Search, Trash2, X, FileText, CheckCircle2 } from "lucide-react";
import { createClient, deleteClient } from "./actions";

export function ClientBoard({ clients }: { clients: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const filteredClients = clients.filter((c: any) => 
    c.companyName?.toLowerCase().includes(search.toLowerCase()) || 
    c.user.email?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await createClient(formData);
    
    if (res?.success) {
      setSuccessMsg(`Client created! Temp Password for their portal: ${res.tempPassword}`);
      setIsModalOpen(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this client? This will delete all their tasks and documents!")) {
      await deleteClient(id);
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {successMsg && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center gap-3 border border-green-200">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">{successMsg}</span>
          <button onClick={() => setSuccessMsg("")} className="ml-auto"><X className="w-4 h-4"/></button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-slate-900 mb-2">Client Directory</h1>
          <p className="text-slate-500">Manage your firm's clients and their portal access.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:border-slate-400" 
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
              <th className="py-3 px-6 font-semibold">Company Name</th>
              <th className="py-3 px-6 font-semibold">Email (Portal Login)</th>
              <th className="py-3 px-6 font-semibold">GST Number</th>
              <th className="py-3 px-6 font-semibold">PAN</th>
              <th className="py-3 px-6 font-semibold">Active Tasks</th>
              <th className="py-3 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredClients.map((client) => (
              <tr key={client.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 font-medium text-slate-900">{client.companyName}</td>
                <td className="py-4 px-6 text-slate-600">{client.user.email}</td>
                <td className="py-4 px-6 text-slate-600">{client.gstNumber || "N/A"}</td>
                <td className="py-4 px-6 text-slate-600">{client.panNumber || "N/A"}</td>
                <td className="py-4 px-6 text-slate-600">
                  <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded w-max">
                    <FileText className="w-3 h-3"/> {client.tasks?.length || 0}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button onClick={() => handleDelete(client.id)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">No clients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* NEW CLIENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-slate-900 mb-6">Add New Client</h2>
            
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Company / Individual Name</label>
                <input name="companyName" required placeholder="Reliance Industries" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email Address</label>
                <input type="email" name="email" required placeholder="contact@reliance.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500" />
                <p className="text-[10px] text-slate-500 mt-1">This will be used by the client to log into their portal.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">GST Number</label>
                  <input name="gstNumber" placeholder="Optional" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">PAN Number</label>
                  <input name="panNumber" placeholder="Optional" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 rounded-lg">Create Client</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

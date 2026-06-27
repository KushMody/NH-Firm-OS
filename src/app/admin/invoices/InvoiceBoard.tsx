"use client";

import { useState } from "react";
import { Plus, Search, Trash2, X, Download } from "lucide-react";
import { createInvoice, toggleInvoiceStatus, deleteInvoice } from "./actions";

export function InvoiceBoard({ invoices, clients }: { invoices: any[], clients: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredInvoices = invoices.filter((inv: any) => 
    inv.client.companyName?.toLowerCase().includes(search.toLowerCase()) || 
    inv.description.toLowerCase().includes(search.toLowerCase())
  );

  async function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createInvoice(formData);
    setIsModalOpen(false);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-slate-900 mb-2">Billing & Revenue</h1>
          <p className="text-slate-500">Manage client invoices and track payments.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:border-slate-400" 
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
              <th className="py-3 px-6 font-semibold">Date</th>
              <th className="py-3 px-6 font-semibold">Client</th>
              <th className="py-3 px-6 font-semibold">Description</th>
              <th className="py-3 px-6 font-semibold">Amount</th>
              <th className="py-3 px-6 font-semibold">Status</th>
              <th className="py-3 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-600">{new Date(inv.createdAt).toLocaleDateString('en-GB')}</td>
                <td className="py-4 px-6 font-medium text-slate-900">{inv.client.companyName}</td>
                <td className="py-4 px-6 text-slate-600">{inv.description}</td>
                <td className="py-4 px-6 font-medium text-slate-900">₹{inv.amount.toLocaleString()}</td>
                <td className="py-4 px-6">
                  <button 
                    onClick={() => toggleInvoiceStatus(inv.id, inv.status)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                      inv.status === "PAID" 
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                    }`}
                  >
                    {inv.status}
                  </button>
                </td>
                <td className="py-4 px-6 text-right flex justify-end gap-2">
                  <button className="text-slate-400 hover:text-blue-600 p-1" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteInvoice(inv.id)} className="text-slate-400 hover:text-red-600 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">No invoices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* NEW INVOICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-slate-900 mb-6">Create Invoice</h2>
            
            <form onSubmit={handleCreateSubmit} className="space-y-4">
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
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Service Description</label>
                <input name="description" required placeholder="e.g. FY 25-26 Audit Fee" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Amount (₹)</label>
                  <input type="number" name="amount" required min="0" step="0.01" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Initial Status</label>
                  <select name="status" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-blue-500 bg-white">
                    <option value="UNPAID">Unpaid</option>
                    <option value="PAID">Paid</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 rounded-lg">Create Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

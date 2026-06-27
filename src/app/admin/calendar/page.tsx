import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from "lucide-react";

export default function ComplianceCalendar() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-slate-900 mb-2">Compliance Calendar</h1>
          <p className="text-slate-500">Track all upcoming GST, TDS, ITR, and ROC deadlines.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700">
            <Filter className="w-4 h-4" /> Filter by Tax Type
          </button>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
            + Add Custom Deadline
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900">October 2026</h2>
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-slate-100 text-slate-600"><ChevronLeft className="w-5 h-5"/></button>
              <button className="p-1 rounded hover:bg-slate-100 text-slate-600"><ChevronRight className="w-5 h-5"/></button>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-xs font-medium text-slate-600"><div className="w-3 h-3 rounded-full bg-blue-500"></div> GST</span>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-600 ml-3"><div className="w-3 h-3 rounded-full bg-red-500"></div> Income Tax</span>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-600 ml-3"><div className="w-3 h-3 rounded-full bg-green-500"></div> TDS</span>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-600 ml-3"><div className="w-3 h-3 rounded-full bg-purple-500"></div> ROC</span>
          </div>
        </div>
        
        {/* Simple Mock Calendar Grid */}
        <div className="grid grid-cols-7 border-b border-slate-200 text-sm font-semibold text-slate-500 text-center uppercase tracking-wider">
          <div className="py-3 border-r border-slate-100">Sun</div>
          <div className="py-3 border-r border-slate-100">Mon</div>
          <div className="py-3 border-r border-slate-100">Tue</div>
          <div className="py-3 border-r border-slate-100">Wed</div>
          <div className="py-3 border-r border-slate-100">Thu</div>
          <div className="py-3 border-r border-slate-100">Fri</div>
          <div className="py-3">Sat</div>
        </div>

        <div className="grid grid-cols-7 auto-rows-[120px] text-sm">
          {Array.from({ length: 31 }).map((_, i) => (
            <div key={i} className="border-r border-b border-slate-100 p-2 hover:bg-slate-50 transition-colors relative">
              <span className={`font-semibold ${i+1 === 15 ? 'bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-slate-700'}`}>{i + 1}</span>
              
              {/* Mock Deadlines */}
              {i + 1 === 11 && (
                <div className="mt-1 px-2 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded shadow-sm truncate">
                  GSTR-1
                </div>
              )}
              {i + 1 === 15 && (
                <div className="mt-1 px-2 py-1 bg-green-50 border border-green-200 text-green-700 text-xs rounded shadow-sm truncate">
                  TDS Payment
                </div>
              )}
              {i + 1 === 20 && (
                <div className="mt-1 px-2 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded shadow-sm truncate">
                  GSTR-3B
                </div>
              )}
              {i + 1 === 31 && (
                <div className="mt-1 px-2 py-1 bg-red-50 border border-red-200 text-red-700 text-xs rounded shadow-sm truncate">
                  ITR (Audit)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

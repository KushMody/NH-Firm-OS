export default function StaffDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Placeholder */}
      <div className="w-64 bg-slate-800 text-white p-6 hidden md:block">
        <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold mb-8">CA Firm OS (Staff)</h2>
        <nav className="space-y-4">
          <a href="#" className="block px-4 py-2 bg-slate-700 rounded-lg text-sm font-medium">My Tasks</a>
          <a href="#" className="block px-4 py-2 text-slate-300 hover:text-white text-sm font-medium">Clients Assigned</a>
          <a href="#" className="block px-4 py-2 text-slate-300 hover:text-white text-sm font-medium">Document Vault</a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-slate-900">My Workspace</h1>
          <a href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900">Logout</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
            <h3 className="text-slate-500 text-sm font-semibold uppercase mb-2">Tasks Due Today</h3>
            <p className="text-3xl font-bold text-slate-900">3</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-orange-500">
            <h3 className="text-slate-500 text-sm font-semibold uppercase mb-2">Pending Reviews</h3>
            <p className="text-3xl font-bold text-slate-900">7</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Task Workflow</h2>
          <p className="text-slate-600">Welcome! Here you can move assignments from document collection to preparation, review, filing, and completion.</p>
        </div>
      </div>
    </div>
  );
}

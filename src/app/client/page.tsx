export default function ClientPortal() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Placeholder */}
      <div className="w-64 bg-slate-50 border-r border-slate-200 p-6 hidden md:block">
        <h2 className="text-xl font-[family-name:var(--font-playfair)] text-blue-900 font-bold mb-8">Client Portal</h2>
        <nav className="space-y-4">
          <a href="#" className="block px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-sm font-medium">My Documents</a>
          <a href="#" className="block px-4 py-2 text-slate-600 hover:text-slate-900 text-sm font-medium">Compliance Status</a>
          <a href="#" className="block px-4 py-2 text-slate-600 hover:text-slate-900 text-sm font-medium">Invoices</a>
          <a href="#" className="block px-4 py-2 text-slate-600 hover:text-slate-900 text-sm font-medium">Ask Chatbot</a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-slate-900">Welcome Back!</h1>
          <a href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900">Logout</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-slate-500 text-sm font-semibold uppercase mb-2">Pending Actions</h3>
            <p className="text-slate-900 font-medium">Upload Bank Statement (Q2)</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">Upload Now</button>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-slate-500 text-sm font-semibold uppercase mb-2">Chatbot Assistant</h3>
            <p className="text-slate-600 text-sm mb-4">Need an old ITR or GST return? Just ask.</p>
            <button className="px-4 py-2 bg-slate-900 text-white rounded text-sm font-medium hover:bg-slate-800">Open Chat</button>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">My Document Vault</h2>
          <p className="text-slate-600">All your ITRs, GST returns, balance sheets, and documents are stored here securely in one place. No need to call for old documents.</p>
        </div>
      </div>
    </div>
  );
}

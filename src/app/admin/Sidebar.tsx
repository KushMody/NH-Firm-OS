"use client";

import { Building2, Calendar, FileText, Home, IndianRupee, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: Home },
    { name: "Compliance Calendar", href: "/admin/calendar", icon: Calendar },
    { name: "Task Workflow", href: "/admin/tasks", icon: FileText },
    { name: "Client Directory", href: "/admin/clients", icon: Users },
    { name: "Billing & Revenue", href: "/admin/invoices", icon: IndianRupee },
    { name: "ROC / MCA", href: "/admin/roc", icon: Building2 },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shrink-0">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-[family-name:var(--font-playfair)] text-white font-bold tracking-wide">CA Firm OS</h2>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Admin Panel</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-slate-800 text-white" 
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center justify-center w-full py-2 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}

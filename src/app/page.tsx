"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Database, FileText, Landmark } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"staff" | "client">("staff");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials. Have you connected the Postgres Database and run the seed script?");
      } else {
        // If login successful, route based on expected role
        if (email.includes("Nextgenhorizon")) {
          router.push("/admin");
        } else if (email.includes("staff")) {
          router.push("/staff");
        } else {
          router.push("/client");
        }
      }
    } catch (err) {
      setError("Server error. Check your database connection in .env");
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = (type: "admin" | "staff" | "client") => {
    if (type === "admin") {
      setEmail("Nextgenhorizon@outlook.com");
      setPassword("Nextgen@2026");
      setRole("staff");
    } else if (type === "staff") {
      setEmail("staff@demo.com");
      setPassword("demo");
      setRole("staff");
    } else if (type === "client") {
      setEmail("client@demo.com");
      setPassword("demo");
      setRole("client");
    }
  };

  const seedDatabase = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      if (res.ok) {
        alert("Database seeded successfully! You can now log in.");
      } else {
        alert("Failed to seed. Have you connected PostgreSQL?");
      }
    } catch (e) {
      alert("Error seeding DB.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* LEFT SIDE - Brand & Value Prop */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-slate-900 p-12 lg:p-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>

        <div className="relative z-10 max-w-lg mt-12">
          <p className="text-slate-400 font-semibold tracking-[0.2em] text-xs uppercase mb-6">
            CA Firm Operating System
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl lg:text-6xl text-white leading-tight mb-8">
            Zero missed<br />deadlines.<br />
            <span className="text-slate-300">Complete clarity.</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-12">
            Unified compliance calendar, task workflow, document vault, and invoicing — built for Indian CA practice. GST, TDS, ITR, ROC, audits, all in one place.
          </p>
        </div>

        <div className="relative z-10 flex gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-white font-semibold text-xl mb-1">
              <Landmark className="w-5 h-5 text-blue-400" />
              GST
            </div>
            <p className="text-slate-400 text-sm">Returns</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-white font-semibold text-xl mb-1">
              <FileText className="w-5 h-5 text-blue-400" />
              TDS
            </div>
            <p className="text-slate-400 text-sm">Challans</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-white font-semibold text-xl mb-1">
              <Building2 className="w-5 h-5 text-blue-400" />
              ROC
            </div>
            <p className="text-slate-400 text-sm">MCA</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white p-8 sm:p-12 h-screen overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          {/* Removed DB Connection Banner */}

          <div className="mb-8">
            <p className="text-slate-500 font-semibold tracking-widest text-xs uppercase mb-3">
              Sign In
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-slate-900 mb-2">
              Welcome back
            </h2>
            <p className="text-slate-500">
              Access your firm dashboard or client portal.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-slate-900"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-slate-900"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium leading-snug">{error}</p>}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? "Authenticating..." : "Secure Sign In"}
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-10 p-5 rounded-lg border border-dashed border-slate-200 bg-slate-50/50">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Demo Accounts (Click to auto-fill)
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => loginAsDemo("admin")}
                className="px-4 py-2 rounded border border-slate-200 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors"
              >
                Admin
              </button>
              <button 
                onClick={() => loginAsDemo("staff")}
                className="px-4 py-2 rounded border border-slate-200 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors"
              >
                Staff
              </button>
              <button 
                onClick={() => loginAsDemo("client")}
                className="px-4 py-2 rounded border border-slate-200 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors"
              >
                Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

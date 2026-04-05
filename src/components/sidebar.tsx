"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Workflow, LayoutDashboard, Store, Swords, Shield } from "lucide-react";

const nav = [
  { href: "/builder", icon: Workflow, label: "Builder" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/marketplace", icon: Store, label: "Marketplace" },
  { href: "/arena", icon: Swords, label: "Arena" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center border-r border-border bg-[#08080c] py-5 gap-6">
      <Link href="/" className="mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-purple">
          <Shield className="h-4 w-4 text-white" />
        </div>
      </Link>
      <nav className="flex flex-1 flex-col items-center gap-1">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                active
                  ? "bg-cyan/10 text-cyan"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {active && (
                <span className="absolute -left-[9px] h-5 w-[3px] rounded-r-full bg-cyan" />
              )}
              <item.icon className="h-[18px] w-[18px]" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

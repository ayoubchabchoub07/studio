'use client';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { ChefHat, Refrigerator, CalendarDays, AreaChart, ShoppingCart, LayoutDashboard } from 'lucide-react';
import type { NavLink } from '@/lib/types';
import Link from 'next/link';

const navLinks: NavLink[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/recipes', label: 'AI Recipes', icon: ChefHat },
  { href: '/fridge', label: 'My Fridge', icon: Refrigerator },
  { href: '/planner', label: 'Meal Planner', icon: CalendarDays },
  { href: '/nutrition', label: 'Nutrition', icon: AreaChart },
  { href: '/grocery-list', label: 'Grocery List', icon: ShoppingCart },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-bold font-headline text-primary">KitchenSync AI</h2>
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {navLinks.map((link) => (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href} passHref legacyBehavior>
              <SidebarMenuButton
                isActive={pathname === link.href}
                tooltip={link.label}
              >
                <link.icon />
                <span>{link.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </Sidebar>
  );
}

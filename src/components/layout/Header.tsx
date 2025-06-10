
'use client';

import Link from 'next/link';
import NextgenEcourtLogo from '@/components/icons/NextgenEcourtLogo';
import UserProfile from '@/components/auth/UserProfile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, PlusCircle, LayoutDashboard } from 'lucide-react'; // Added LayoutDashboard
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import LanguageToggle from '@/components/LanguageToggle';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const { t } = useTranslation();

  const baseNavItems = [
    // "Dashboard" now points to /dashboard
    { href: '/dashboard', labelKey: 'header.dashboard', icon: LayoutDashboard },
    { href: '/summaries', labelKey: 'header.aiSummaries', icon: Menu }, // Placeholder icon, change as needed
    { href: '/legal-research', labelKey: 'header.legalResearch', icon: Menu }, // Placeholder icon
  ];

  const currentNavItems = [...baseNavItems];
  if (user?.role === 'Judge') {
    if (!currentNavItems.find(item => item.href === '/judge-dashboard')) {
      currentNavItems.push({ href: '/judge-dashboard', labelKey: 'header.judgeDashboard', icon: Menu }); // Placeholder icon
    }
  }
   if (user?.role === 'CourtOfficial') {
     if (!currentNavItems.find(item => item.href === '/add-case')) {
        currentNavItems.push({ href: '/add-case', labelKey: 'header.addCase', icon: PlusCircle });
     }
   }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo now links to landing page '/' */}
        <Link href="/" className="mr-6 flex items-center space-x-2" aria-label={t('header.homeAriaLabel')}>
          <NextgenEcourtLogo />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {currentNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary flex items-center",
                pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
             {item.icon && <item.icon className="mr-1 h-4 w-4" />}
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <UserProfile />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
                aria-label={t('header.toggleNavAriaLabel')}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t('header.toggleNavAriaLabel')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <nav className="grid gap-6 text-lg font-medium pt-4">
                <Link
                  href="/" // Logo in sheet also links to landing page
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                  aria-label={t('header.homeAriaLabel')}
                >
                  <NextgenEcourtLogo />
                  <span className="sr-only">{t('appName')}</span>
                </Link>
                {currentNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                     className={cn(
                      "transition-colors hover:text-primary py-2 flex items-center",
                      pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
                    )}
                  >
                     {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                    {t(item.labelKey)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

    
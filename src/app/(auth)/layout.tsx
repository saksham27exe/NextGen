
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-var(--header-height,80px)-var(--footer-height,80px))]">
      {/* 
        The min-h calculation attempts to center content vertically, 
        assuming header and footer heights. These CSS variables would need 
        to be set elsewhere or approximated if not available.
        A simpler approach might be `min-h-screen py-12` on the direct child of body
        and then use flex to center its content.
        However, this layout is specifically for auth pages, so it's applied within the main layout flow.
      */}
      {children}
    </div>
  );
}

    
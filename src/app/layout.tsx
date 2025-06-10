
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { LocaleProvider } from '@/contexts/LocaleContext'; // Import LocaleProvider
import Footer from '@/components/layout/Footer'; // Import new Footer component

// Note: Metadata cannot use hooks, so title/description remain static here.
// For dynamic titles based on locale, you'd need client-side updates or generateMetadata.
export const metadata: Metadata = {
  title: 'Nextgen-Ecourt', // Keep a generic title or use generateMetadata if needed
  description: 'Modernizing court administration with AI-powered insights and real-time case tracking for Nextgen-Ecourt.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The lang attribute will be set dynamically by LocaleProvider's useEffect
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={`antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <AuthProvider>
          <LocaleProvider> {/* Wrap with LocaleProvider */}
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Toaster />
            <Footer /> {/* Use the new Footer component */}
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Support Kreator – Creator Toolbox",
  description: "Hub untuk content creator dengan tools berguna dan AI mini-tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="id">
      <head />
      <body className="min-h-screen flex flex-col">
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3604122645141902"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SK</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  SupportKreator<span className="text-primary-600">.pro</span>
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="flex space-x-8">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Toolbox
                </Link>
                <Link
                  href="/ai-tools"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  AI Tools
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-sm">
                  © {currentYear} SupportKreator.pro – Dibuat untuk membantu para kreator.
                </p>
              </div>
              <div className="flex space-x-6">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  Home
                </Link>
                <a
                  href="https://ivadamusic.web.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  IvadaMusic
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

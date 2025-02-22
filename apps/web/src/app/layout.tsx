import type { Metadata, Viewport } from 'next'

import { Analytics } from '@/components/analytics'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/toaster'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import './globals.css'

const META_THEME_COLORS = {
  light: '#fafafa',
  dark: '#1f1f1f'
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: `${siteConfig.url}/site.webmanifest`
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background overscroll-none font-sans antialiased',
          'dark:bg-background dark:text-foreground'
        )}
      >
        <ThemeProvider defaultTheme="system">
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

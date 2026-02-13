import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Atanda Peace | Multi-Disciplined Engineer',
  description: 'Portfolio showcasing embedded systems, graphics design, and web development projects by Atanda Peace',
  keywords: ['engineer', 'embedded systems', 'graphics design', 'web development', 'portfolio'],
  authors: [{ name: 'Atanda Peace' }],
  openGraph: {
    title: 'Atanda Peace | Multi-Disciplined Engineer',
    description: 'High-performance architecture across silicon, pixels, and logic',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', (event) => {
                const isExtensionError = event.filename && (
                  event.filename.includes('chrome-extension') || 
                  event.filename.includes('moz-extension')
                );
                const isMetaMaskError = event.message && (
                  event.message.includes('MetaMask') || 
                  event.message.includes('nkbihfbeogaeaoehlefnkodbefgpgknn')
                );
                
                if (isExtensionError || isMetaMaskError) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                }
              }, true);

              window.addEventListener('unhandledrejection', (event) => {
                const stack = event.reason?.stack || '';
                const reason = event.reason?.message || event.reason || '';
                
                const isExtensionError = stack.includes('chrome-extension') || stack.includes('moz-extension');
                const isMetaMaskError = reason.includes('MetaMask') || stack.includes('nkbihfbeogaeaoehlefnkodbefgpgknn');

                if (isExtensionError || isMetaMaskError) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                }
              }, true);
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

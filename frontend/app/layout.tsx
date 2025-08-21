import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AI Background Remover - Remove Image Backgrounds Instantly',
    description: 'Remove backgrounds from images instantly with AI. Free online tool with high-quality results. No registration required.',
    keywords: 'background remover, remove background, AI background removal, image editor, photo background remover',
    authors: [{ name: 'Image Background Remover' }],
    creator: 'Image Background Remover',
    publisher: 'Image Background Remover',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://yourdomain.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'AI Background Remover - Remove Image Backgrounds Instantly',
        description: 'Remove backgrounds from images instantly with AI. Free online tool with high-quality results.',
        url: 'https://yourdomain.com',
        siteName: 'AI Background Remover',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'AI Background Remover',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Background Remover - Remove Image Backgrounds Instantly',
        description: 'Remove backgrounds from images instantly with AI. Free online tool with high-quality results.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#3b82f6" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* Google Analytics */}
                {process.env.NEXT_PUBLIC_GA_ID && (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
                            }}
                        />
                    </>
                )}

                {/* Google AdSense */}
                {process.env.NEXT_PUBLIC_ADSENSE_ID && (
                    <script
                        async
                        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
                        crossOrigin="anonymous"
                    />
                )}
            </head>
            <body className={inter.className}>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                    {children}
                </div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        success: {
                            duration: 3000,
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            duration: 5000,
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </body>
        </html>
    )
}

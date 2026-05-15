import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Roboto_Mono } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-poppins',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Campuslands | Formando el Futuro Tech',
  description: 'Campuslands es la plataforma líder en formación de talento digital de alto impacto.',
  icons: {
    icon: [
      { url: '/logo.webp', type: 'image/webp' },
    ],
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${poppins.variable} ${robotoMono.variable}`}>
      <head>
        {/* Preconnect a Firebase Storage para acelerar carga del video del footer */}
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

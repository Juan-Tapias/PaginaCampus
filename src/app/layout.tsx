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
    icon: '/logo.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${poppins.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

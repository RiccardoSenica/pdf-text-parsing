import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PDF text parser',
  description: 'Get the text content a PDF file in the browser (demo)'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}

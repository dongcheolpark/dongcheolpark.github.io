import './styles/global.scss';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="px-5 sm:px-8">{children}</body>
    </html>
  );
}

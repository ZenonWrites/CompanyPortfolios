import './globals.css'

export const metadata = {
  title: 'Company Portfolio - Professional Business Solutions',
  description: 'A modern company portfolio showcasing our services, team, and projects. Building the future of business together.',
  keywords: 'company, portfolio, business, services, team, projects, professional',
  openGraph: {
    title: 'Company Portfolio - Professional Business Solutions',
    description: 'A modern company portfolio showcasing our services, team, and projects.',
    type: 'website',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BuT',
  description: 'A Next.js application that visualizes the top traders of a given token based on Bubblemaps data. This project provides an interactive force-directed graph to explore trading relationships between addresses, helping traders and analysts gain insights into token activity.',

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}

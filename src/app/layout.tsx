import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Sanya Prem Bhasin - AI Engineer & Full-Stack Developer',
  description: 'Portfolio of Sanya Prem Bhasin - AI Engineer specializing in multi-agent systems, LangGraph, RAG, and serverless architectures on AWS and Azure.',
  keywords: ['AI Engineer', 'LangGraph', 'Multi-Agent Systems', 'RAG', 'FastAPI', 'AWS', 'Azure', 'Python', 'Machine Learning'],
  authors: [{ name: 'Sanya Prem Bhasin', url: 'https://sanyapb.com' }],
  creator: 'Sanya Prem Bhasin',
  openGraph: {
    title: 'Sanya Prem Bhasin - AI Engineer & Full-Stack Developer',
    description: 'Building intelligent multi-agent AI systems and scalable applications',
    type: 'website',
    url: 'https://sanyapb.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanya Prem Bhasin - AI Engineer',
    description: 'Building intelligent multi-agent AI systems',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

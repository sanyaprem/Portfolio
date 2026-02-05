import AnimatedBackground from '@/components/AnimatedBackground';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import GitHubStats from '@/components/GitHubStats';
import Articles from '@/components/Articles';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* V1's Animated 3D Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* Projects Section */}
        <Projects />

        {/* Skills Section with Proficiency Bars */}
        <Skills />

        {/* GitHub Live Stats */}
        <GitHubStats />

        {/* Articles Section */}
        <Articles />
        
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 mb-4">
              Built with Next.js, React, Tailwind.css
            </p>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/sanyaprem" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/sanyaprem/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                LinkedIn
              </a>
              <a href="https://leetcode.com/sanyapb" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                LeetCode
              </a>
              <a href="mailto:sanyapb@gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                Email
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              © 2025 Sanya Prem Bhasin. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

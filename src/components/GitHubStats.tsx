'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, GitFork, Star, Code2 } from 'lucide-react';

interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export default function GitHubStats() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [stats, setStats] = useState({ totalRepos: 0, totalStars: 0, totalForks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch from GitHub API
        const response = await fetch('https://api.github.com/users/sanyaprem/repos?sort=updated&per_page=6');
        if (response.ok) {
          const data = await response.json();
          const repoData: GitHubRepo[] = data.map((repo: any) => ({
            name: repo.name,
            description: repo.description || 'No description provided',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || 'N/A',
            url: repo.html_url
          }));

          setRepos(repoData);

          // Calculate stats
          const totalStars = repoData.reduce((sum, repo) => sum + repo.stars, 0);
          const totalForks = repoData.reduce((sum, repo) => sum + repo.forks, 0);
          setStats({
            totalRepos: data.length,
            totalStars,
            totalForks
          });
        }
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <section id="github" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          <p className="text-gray-400 mt-4">Loading GitHub data...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="text-primary-400 font-mono text-sm tracking-widest uppercase mb-2 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Open Source Contributions
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              GitHub Activity
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Building in public and contributing to the developer community
          </motion.p>
        </motion.div>

        {/* GitHub Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
          >
            <Code2 className="w-8 h-8 text-primary-400 mb-3" />
            <div className="text-3xl font-bold text-white">{stats.totalRepos}+</div>
            <div className="text-sm text-gray-400">Repositories</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
          >
            <Star className="w-8 h-8 text-yellow-400 mb-3" />
            <div className="text-3xl font-bold text-white">{stats.totalStars}</div>
            <div className="text-sm text-gray-400">Total Stars</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
          >
            <GitFork className="w-8 h-8 text-accent-400 mb-3" />
            <div className="text-3xl font-bold text-white">{stats.totalForks}</div>
            <div className="text-sm text-gray-400">Total Forks</div>
          </motion.div>
        </div>

        {/* Recent Repos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-primary-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <Github className="w-6 h-6 text-white" />
                <span className="px-2 py-1 text-xs bg-primary-500/20 text-primary-300 rounded-full">
                  {repo.language}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors line-clamp-1">
                {repo.name}
              </h4>

              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {repo.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {repo.stars}
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  {repo.forks}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <motion.a
            href="https://github.com/sanyaprem"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View All on GitHub
          </motion.a>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

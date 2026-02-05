'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Clock, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MediumArticle } from '@/data/content';

export default function Articles() {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/medium');
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Failed to fetch Medium articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);
  return (
    <section id="articles" className="relative py-20 px-6">
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
            Thoughts & Insights
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Latest Articles
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Sharing knowledge about AI, machine learning, and software development on Medium
          </motion.p>
        </motion.div>

        {/* Articles Grid */}
        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            <p className="text-gray-400 mt-4">Loading articles...</p>
          </div>
        )}

        {/* Articles grid */}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              <div className="relative p-6">
                {/* Thumbnail placeholder */}
                <div className="mb-4 h-40 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl overflow-hidden flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-white/20" />
                </div>

                {/* Date and reading time */}
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
                  <span>{new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTime}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-accent-500/10 border border-accent-500/20 rounded-full text-xs text-accent-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read more link */}
                <div className="flex items-center gap-2 text-sm text-primary-400 font-medium group-hover:gap-3 transition-all">
                  Read Article
                  <ExternalLink className="w-4 h-4" />
                </div>

                {/* Claps count if available */}
                {article.claps && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-sm text-gray-400">
                    <span>👏</span>
                    <span>{article.claps} claps</span>
                  </div>
                )}
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-xl" />
              </div>
            </motion.a>
          ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No articles found. Start writing on Medium!</p>
          </div>
        )}

        {/* View all articles CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://medium.com/@sanyapb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles on Medium
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

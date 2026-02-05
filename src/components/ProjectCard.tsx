'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, X, Calendar, Star } from 'lucide-react';
import { Project } from '@/data/content';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Project Card */}
      <motion.div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-500" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <div className="relative p-6 h-full flex flex-col">
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-accent-500/20 border border-accent-500/30 rounded-full text-xs text-accent-300 font-semibold">
                Featured
              </span>
            </div>
          )}

          {/* Project image placeholder */}
          <div className="mb-4 h-40 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-white/10">
              {project.title.substring(0, 2)}
            </div>
          </div>

          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-mono text-primary-400">{project.category}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-xs text-gray-400">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Footer with links */}
          <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live
              </a>
            )}
            {project.stats?.stars && (
              <div className="ml-auto flex items-center gap-1 text-sm text-gray-400">
                <Star className="w-4 h-4" />
                {project.stats.stars}
              </div>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-xl" />
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-dark-50 to-dark-100 border border-white/10 rounded-2xl shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-sm text-primary-300 font-mono">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">{project.title}</h2>
                  <p className="text-lg text-gray-300">{project.longDescription}</p>
                </div>

                {/* Highlights */}
                {project.highlights && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Key Highlights</h3>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <span className="text-primary-400 mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent-500/10 border border-accent-500/20 rounded-full text-sm text-accent-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture */}
                {project.architecture && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Architecture</h3>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                        {project.architecture}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Documentation */}
                {project.documentation && project.documentation.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Documentation</h3>
                    <div className="space-y-3">
                      {project.documentation.map((doc, i) => (
                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <p className="text-sm text-gray-300 whitespace-pre-wrap">
                            {doc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-primary-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Live Site
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

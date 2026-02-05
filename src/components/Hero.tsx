'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const floatingKeywords = [
  'AI', 'Machine Learning', 'Python', 'Neural Networks', 
  'Deep Learning', 'NLP', 'Computer Vision', 'MLOps',
  'TensorFlow', 'PyTorch', 'FastAPI', 'React'
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating keyword particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingKeywords.map((keyword, index) => (
          <motion.div
            key={keyword}
            className="absolute text-primary-400/10 font-mono text-sm font-semibold"
            initial={{
              x: Math.random() * 1920,
              y: Math.random() * 1080,
            }}
            animate={{
              x: [
                Math.random() * 1920,
                Math.random() * 1920,
                Math.random() * 1920,
              ],
              y: [
                Math.random() * 1080,
                Math.random() * 1080,
                Math.random() * 1080,
              ],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {keyword}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-primary-400 font-mono text-sm tracking-widest uppercase">
            Hello, I'm
          </span>
        </motion.div>

        {/* Animated Name */}
        <motion.h1
          variants={nameVariants}
          className="text-6xl md:text-8xl font-bold mb-6 relative"
        >
          <span className="bg-gradient-to-r from-white via-primary-300 to-accent-400 bg-clip-text text-transparent">
            Sanya Prem Bhasin
          </span>
          
          {/* Glowing cursor effect */}
          <motion.span
            className="inline-block w-1 h-20 md:h-28 bg-primary-500 ml-2"
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.h1>

        {/* Role/Title */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-300">
            AI Engineer & Full-Stack Developer
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building intelligent multi-agent AI systems and scalable applications. 
          Specialized in LangGraph, RAG, and serverless architectures on AWS and Azure.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
          
          <motion.a
            href="#contact"
            className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Tech stack preview */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {['Python', 'LangGraph', 'FastAPI', 'AWS', 'RAG', 'Azure'].map((tech) => (
            <motion.span
              key={tech}
              className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-primary-500/20 rounded-full text-sm text-gray-300 font-mono"
              whileHover={{
                scale: 1.1,
                borderColor: 'rgb(14 165 233 / 0.5)',
                boxShadow: '0 0 20px rgb(14 165 233 / 0.3)',
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-wider font-mono">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden py-24 md:py-0">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-8 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="space-y-3 md:space-y-6 mb-6 md:mb-8">
            <p className="text-sm md:text-base text-gray-400 tracking-wide uppercase mb-2">
              Turning Ideas Into Interactive Experiences
            </p>
            <div className="relative inline-block px-4 sm:px-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-2xl blur-xl opacity-25"></div>
              <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 pb-2">
                MD ASIF CHOWDHURY
              </h1>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-white">
              <Typewriter
                words={[
                  "Full Stack Developer",
                  "Backend Builder",
                  "Frontend Tweaker",
                  "Code Magician",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </h2>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Recent Software Engineering graduate passionate about building
              scalable full-stack applications. I love solving real-world
              problems with clean code, efficient systems, and intuitive user
              experiences.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
            <span className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-500/10 rounded-full text-blue-400 text-xs md:text-sm">
              TypeScript
            </span>
            <span className="px-3 md:px-4 py-1.5 md:py-2 bg-purple-500/10 rounded-full text-purple-400 text-xs md:text-sm">
              Next.js
            </span>
            <span className="px-3 md:px-4 py-1.5 md:py-2 bg-teal-500/10 rounded-full text-teal-400 text-xs md:text-sm">
              NestJS
            </span>
            <span className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-500/10 rounded-full text-blue-400 text-xs md:text-sm">
              ASP.NET
            </span>
            <span className="px-3 md:px-4 py-1.5 md:py-2 bg-purple-500/10 rounded-full text-purple-400 text-xs md:text-sm">
              PostgreSQL
            </span>
            <span className="px-3 md:px-4 py-1.5 md:py-2 bg-teal-500/10 rounded-full text-teal-400 text-xs md:text-sm">
              TailwindCSS
            </span>
          </div>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 inset-x-0 flex flex-col items-center animate-bounce">
        <span className="text-gray-400 text-sm mb-2 text-center">
          Scroll to explore
        </span>
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { fireFullCelebration } from "../utils/confetti";
import { dateConfig } from "../config/dateConfig";

export default function Celebration({ onContinue }) {
  const { celebrationScreen } = dateConfig;

  useEffect(() => {
    fireFullCelebration();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-6xl lg:max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-12 flex-1 flex flex-col justify-between"
    >
      {/* 2-Column Desktop Grid / 1-Column Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto w-full py-4 md:py-8">
        
        {/* Left Column: Big Celebratory Badge & Solved Recap */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 flex items-center justify-center bg-white/70 rounded-3xl p-6 border border-pink-100 shadow-sm">
            {/* Main soft circle */}
            <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-[#FDE8ED] flex flex-col items-center justify-center shadow-2xs relative">
              <span className="text-7xl sm:text-8xl md:text-9xl font-black text-[#DE4377] tracking-tight leading-none mb-1 md:mb-2">
                {celebrationScreen.monthNumber}
              </span>
              <span className="text-xs sm:text-sm font-black tracking-[0.22em] text-[#7A6470] uppercase">
                {celebrationScreen.monthLabel}
              </span>

              {/* Overlapping pill badge at bottom */}
              <div className="absolute -bottom-3.5 bg-white px-5 sm:px-6 py-2 rounded-full shadow-sm border border-pink-100 text-xs sm:text-sm font-bold text-[#7A6470]">
                {celebrationScreen.pillBadge}
              </div>
            </div>

            {/* Decorative sparkles and hearts */}
            <span className="absolute top-8 left-6 text-[#DE4377] text-xl font-bold">♥</span>
            <span className="absolute top-10 right-8 text-[#F2A7BC] text-2xl font-bold">✦</span>
            <span className="absolute bottom-16 right-6 text-[#DE4377] text-xl font-light">♡</span>
            <span className="absolute bottom-10 right-14 text-[#DE4377] text-base font-bold">✦</span>
            <span className="absolute bottom-14 left-8 text-[#F2A7BC] text-xl">♥</span>
            <span className="absolute top-32 left-4 text-[#F2A7BC] text-xl font-bold">✦</span>
          </div>

          {/* Solved Pills under the badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 max-w-sm">
            {dateConfig.puzzles.map((p) => (
              <span
                key={p.id}
                className="px-3 py-1 text-xs font-bold bg-white text-[#DE4377] rounded-full border border-pink-200/80 shadow-2xs flex items-center gap-1"
              >
                <span>✓</span>
                <span>{p.answer}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Message & Call To Action */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Section Kicker */}
          <div className="inline-flex items-center gap-2 bg-[#FDECEF] px-4 py-1.5 rounded-full mb-4 md:mb-6 border border-pink-200/60 shadow-2xs">
            <span className="text-xs font-black tracking-[0.2em] text-[#DE4377] uppercase">
              {celebrationScreen.kicker}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3C2E35] tracking-tight leading-tight mb-6">
            {celebrationScreen.message}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#7A6470] max-w-xl leading-relaxed mb-8 font-medium">
            You solved all 5 puzzles without breaking a sweat! Every single clue was a piece of our story together. Now, there is one last surprise waiting for you...
          </p>

          {/* Button */}
          <div className="w-full max-w-sm flex flex-col items-center lg:items-start gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinue}
              className="w-full py-4.5 px-8 bg-[#DE4377] hover:bg-[#C93667] text-white text-lg md:text-xl font-black rounded-2xl shadow-md hover:shadow-lg transition-all focus:outline-none flex items-center justify-center gap-2"
            >
              <span>{celebrationScreen.buttonText}</span>
              <svg className="w-5 h-5 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
            <p className="text-xs md:text-sm text-[#A69AA1] font-medium text-center lg:text-left">
              {celebrationScreen.subtext}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center py-4 border-t border-pink-100/50">
        <p className="text-xs text-[#A69AA1]">
          {dateConfig.footerText}
        </p>
      </div>
    </motion.div>
  );
}

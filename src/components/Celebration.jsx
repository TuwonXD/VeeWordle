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
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-between md:justify-center items-center select-none overflow-hidden my-auto py-2"
    >
      {/* ============================================================== */}
      {/* MOBILE LAYOUT (< 768px): Centered, Button Pinned at Bottom     */}
      {/* ============================================================== */}
      <div className="flex md:hidden flex-col justify-between items-center text-center w-full max-w-[390px] h-full px-4 py-2">
        {/* Top Section */}
        <div className="flex flex-col items-center my-auto">
          <span className="text-[10px] font-black tracking-[0.2em] text-[#8D7B85] uppercase mb-2">
            {celebrationScreen.kicker}
          </span>

          {/* Circle Badge with 01 MONTH OF US */}
          <div className="relative w-40 h-40 flex items-center justify-center my-2">
            <div className="w-34 h-34 rounded-full bg-[#FDECEF] flex flex-col items-center justify-center shadow-2xs relative">
              <span className="text-5xl font-black text-[#DE4377] tracking-tight leading-none mb-1">
                {celebrationScreen.monthNumber}
              </span>
              <span className="text-[10px] font-black tracking-[0.2em] text-[#7A6470] uppercase">
                {celebrationScreen.monthLabel}
              </span>
              <div className="absolute -bottom-2.5 bg-white px-3 py-0.5 rounded-full shadow-2xs border border-pink-100 text-[10px] font-bold text-[#7A6470]">
                {celebrationScreen.pillBadge}
              </div>
            </div>

            <span className="absolute top-4 left-3 text-[#DE4377] text-base font-bold">♥</span>
            <span className="absolute top-4 right-5 text-[#F2A7BC] text-lg font-bold">✦</span>
            <span className="absolute bottom-8 right-3 text-[#DE4377] text-base font-light">♡</span>
            <span className="absolute bottom-6 left-5 text-[#F2A7BC] text-base">♥</span>
          </div>

          {/* Solved word chips */}
          <div className="flex flex-wrap items-center justify-center gap-1 my-2 max-w-[280px]">
            {dateConfig.puzzles.map((p) => (
              <span
                key={p.id}
                className="px-2 py-0.5 text-[9px] font-bold bg-[#FDECEF] text-[#DE4377] rounded-full border border-pink-200/60 shadow-2xs"
              >
                ✓ {p.answer}
              </span>
            ))}
          </div>

          {/* Heading */}
          <h2 className="text-base font-black text-[#3C2E35] tracking-tight leading-snug max-w-[300px] my-1">
            {celebrationScreen.message}
          </h2>

          <p className="text-[11px] text-[#8D7B85] max-w-[260px] leading-relaxed font-medium">
            {celebrationScreen.subtext}
          </p>
        </div>

        {/* Pinned Bottom Continue Button */}
        <div className="w-full max-w-[280px] shrink-0 pb-1">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="w-full h-[46px] bg-[#DE4377] hover:bg-[#C93667] text-white text-base font-bold rounded-2xl shadow-sm transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{celebrationScreen.buttonText}</span>
            <svg className="w-4 h-4 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP / TABLET LAYOUT (>= 768px): Exact Figma 2-Column Design*/}
      {/* ============================================================== */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-14 items-center w-full max-w-5xl mx-auto px-4">
        
        {/* Left Column: Big Celebratory Badge */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 lg:w-84 lg:h-84 flex items-center justify-center">
            {/* Main soft circle */}
            <div className="w-60 h-60 lg:w-72 lg:h-72 rounded-full bg-[#FDECEF] flex flex-col items-center justify-center shadow-2xs relative">
              <span className="text-7xl lg:text-8xl font-black text-[#DE4377] tracking-tight leading-none mb-1">
                {celebrationScreen.monthNumber}
              </span>
              <span className="text-xs font-black tracking-[0.2em] text-[#7A6470] uppercase">
                {celebrationScreen.monthLabel}
              </span>

              {/* Overlapping pill badge at bottom */}
              <div className="absolute -bottom-3 bg-white px-4 py-1.5 rounded-full shadow-2xs border border-pink-100 text-xs font-bold text-[#7A6470]">
                {celebrationScreen.pillBadge}
              </div>
            </div>

            {/* Decorative sparkles and hearts matching Figma */}
            <span className="absolute top-8 left-8 text-[#DE4377] text-xl font-bold">♥</span>
            <span className="absolute top-8 right-10 text-[#F2A7BC] text-2xl font-bold">✦</span>
            <span className="absolute bottom-16 right-8 text-[#DE4377] text-xl font-light">♡</span>
            <span className="absolute bottom-8 right-14 text-[#DE4377] text-sm font-bold">✦</span>
            <span className="absolute bottom-14 left-10 text-[#F2A7BC] text-xl">♥</span>
            <span className="absolute top-28 left-4 text-[#F2A7BC] text-xl font-bold">✦</span>
          </div>
        </div>

        {/* Right Column: Copy & Continue Button */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          {/* Top section kicker */}
          <span className="text-[11px] font-black tracking-[0.2em] text-[#8D7B85] uppercase mb-4 block">
            {celebrationScreen.kicker}
          </span>

          {/* Main heading matching Figma */}
          <h2 className="text-3xl lg:text-4xl font-black text-[#3C2E35] tracking-tight leading-[1.2] mb-4 max-w-lg">
            {celebrationScreen.message}
          </h2>

          <p className="text-sm sm:text-base text-[#8D7B85] max-w-md leading-relaxed mb-8 font-medium">
            {celebrationScreen.subtext}
          </p>

          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="py-3.5 px-8 bg-[#DE4377] hover:bg-[#C93667] text-white text-base md:text-lg font-bold rounded-2xl shadow-md hover:shadow-lg transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{celebrationScreen.buttonText}</span>
            <svg className="w-5 h-5 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

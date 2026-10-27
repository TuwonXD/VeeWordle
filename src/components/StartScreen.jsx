import React from "react";
import { motion } from "framer-motion";
import { dateConfig } from "../config/dateConfig";

export default function StartScreen({ onStart }) {
  const { startScreen } = dateConfig;

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
        {/* Left Column: Story, Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Top section kicker */}
          <div className="inline-flex items-center gap-2 bg-[#FDECEF] px-4 py-1.5 rounded-full mb-4 md:mb-6 border border-pink-200/60 shadow-2xs">
            <span className="text-xs font-black tracking-[0.2em] text-[#DE4377] uppercase">
              {startScreen.kicker}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#3C2E35] tracking-tight leading-tight mb-4">
            {startScreen.title}{" "}
            <span className="inline-block hover:scale-110 transition-transform select-none">
              {startScreen.emoji}
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-[#7A6470] max-w-xl leading-relaxed mb-8 font-medium">
            {startScreen.description}
          </p>

          {/* Big Action Button */}
          <div className="w-full max-w-sm flex flex-col items-center lg:items-start gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="w-full py-4.5 px-8 bg-[#DE4377] hover:bg-[#C93667] text-white text-lg md:text-xl font-black rounded-2xl shadow-md hover:shadow-lg transition-all focus:outline-none flex items-center justify-center gap-2"
            >
              <span>{startScreen.buttonText}</span>
              <svg className="w-5 h-5 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
            <p className="text-xs md:text-sm text-[#A69AA1] font-medium text-center lg:text-left">
              {startScreen.subtext}
            </p>
          </div>
        </div>

        {/* Right Column: Hero Envelope & Card Illustration */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center bg-white/60 rounded-3xl p-6 border border-pink-100/70 shadow-sm">
            {/* Circular soft pink background */}
            <div className="absolute inset-4 rounded-full bg-[#FDE8ED] -z-10" />

            {/* Floating decorative sparkles & hearts around circle */}
            <span className="absolute top-8 left-6 text-pink-300 text-2xl font-light">♡</span>
            <span className="absolute bottom-12 left-8 text-[#DE4377] text-lg font-bold">✦</span>
            <span className="absolute top-10 right-8 text-[#EF88A6] text-2xl font-bold">✦</span>
            <span className="absolute bottom-16 right-8 text-pink-300 text-xl">♡</span>

            {/* SVG Envelope with Letter */}
            <svg className="w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 drop-shadow-sm transition-all" viewBox="0 0 200 200" fill="none">
              {/* Card sticking out */}
              <g transform="rotate(-3 100 100)">
                <rect x="52" y="38" width="96" height="90" rx="10" fill="#FFFFFF" />
                <text
                  x="100"
                  y="66"
                  textAnchor="middle"
                  fill="#3C2E35"
                  fontSize="15"
                  fontWeight="800"
                  fontFamily="sans-serif"
                >
                  for you
                </text>
                {/* Three little hearts */}
                <path
                  d="M87 78c-1.5-2-4.5-2-6 0-1.5 2 0 4.5 3 6.5 3-2 4.5-4.5 3-6.5z"
                  fill="#F2A7BC"
                />
                <path
                  d="M100 78c-1.8-2.4-5.4-2.4-7.2 0-1.8 2.4 0 5.4 3.6 7.8 3.6-2.4 5.4-5.4 3.6-7.8z"
                  fill="#DE4377"
                />
                <path
                  d="M113 78c-1.5-2-4.5-2-6 0-1.5 2 0 4.5 3 6.5 3-2 4.5-4.5 3-6.5z"
                  fill="#F2A7BC"
                />
                {/* Rounded lines on card */}
                <rect x="68" y="93" width="64" height="4" rx="2" fill="#FDECEF" />
                <rect x="74" y="103" width="52" height="4" rx="2" fill="#FDECEF" />
              </g>

              {/* Pink Envelope body */}
              <path
                d="M34 82c0-5 3.5-9 8.5-9.5l54-5.5a9 9 0 017 1.8l56 46.5c3.5 3 5.5 7.5 5.5 12.2V142c0 8-6.5 14.5-14.5 14.5H48.5C40.5 156.5 34 150 34 142V82z"
                fill="#F298B3"
              />
              {/* Front Envelope V-folds */}
              <path
                d="M34 85l64 48a4 4 0 004 0l64-48v57c0 8-6.5 14.5-14.5 14.5H48.5C40.5 156.5 34 150 34 142V85z"
                fill="#F086A5"
              />
              <path
                d="M34 144l50-42M166 144l-50-42"
                stroke="#EA7496"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Center Heart Seal */}
              <circle cx="100" cy="133" r="16" fill="#DE4377" />
              <path
                d="M100 139.5l-1.3-1.2C94.1 134 91 131.2 91 127.8c0-2.8 2.2-5 5-5 1.6 0 3.1.7 4 1.9.9-1.2 2.4-1.9 4-1.9 2.8 0 5 2.2 5 5 0 3.4-3.1 6.2-7.7 10.5L100 139.5z"
                fill="#FFFFFF"
              />
            </svg>
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

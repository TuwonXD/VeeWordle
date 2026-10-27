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
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-center items-center select-none overflow-hidden my-auto py-1 sm:py-2"
    >
      {/* ============================================================== */}
      {/* MOBILE LAYOUT (< 768px): One Centered Column, Vertically Stacked*/}
      {/* ============================================================== */}
      <div className="flex md:hidden flex-col justify-center items-center text-center w-full max-w-[390px] px-4 py-2 my-auto">
        {/* Kicker */}
        <span className="text-[10px] font-black tracking-[0.2em] text-[#8D7B85] uppercase mb-1">
          {startScreen.kicker}
        </span>

        {/* Envelope & Card Illustration */}
        <div className="w-40 h-40 flex items-center justify-center my-1 select-none">
          <svg className="w-40 h-40" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="88" fill="#FDE8ED" />
            <path
              d="M42 66c-1.6-2.2-5-2.2-6.6 0-1.8 2.2 0 5 3.5 7.2 3.5-2.2 5.3-5 3.5-7.2z"
              fill="none"
              stroke="#F2A7BC"
              strokeWidth="1.5"
            />
            <path d="M40 146l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#DE4377" />
            <path
              d="M165 60l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"
              fill="none"
              stroke="#EF88A6"
              strokeWidth="1.5"
            />
            <path
              d="M168 132c-1.5-2-4.5-2-6 0-1.5 2 0 4.5 3 6.5 3-2 4.5-4.5 3-6.5z"
              fill="none"
              stroke="#F2A7BC"
              strokeWidth="1.5"
            />

            <g transform="rotate(-3 100 115)">
              <rect x="35" y="80" width="130" height="84" rx="14" fill="#E882A2" />
              <g transform="rotate(-2 100 85)">
                <rect
                  x="48"
                  y="32"
                  width="104"
                  height="88"
                  rx="8"
                  fill="#FFFFFF"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
                />
                <text
                  x="100"
                  y="58"
                  textAnchor="middle"
                  fill="#3C2E35"
                  fontSize="15"
                  fontWeight="900"
                  fontFamily="'Nunito', sans-serif"
                >
                  for you
                </text>
                <path d="M87 70c-1.5-2-4.5-2-6 0-1.5 2 0 4.5 3 6.5 3-2 4.5-4.5 3-6.5z" fill="#F2A7BC" />
                <path d="M100 70c-1.8-2.4-5.4-2.4-7.2 0-1.8 2.4 0 5.4 3.6 7.8 3.6-2.4 5.4-5.4 3.6-7.8z" fill="#DE4377" />
                <path d="M113 70c-1.5-2-4.5-2-6 0-1.5 2 0 4.5 3 6.5 3-2 4.5-4.5 3-6.5z" fill="#F2A7BC" />
                <rect x="66" y="83" width="68" height="3.5" rx="2" fill="#FDECEF" />
                <rect x="73" y="91" width="54" height="3.5" rx="2" fill="#FDECEF" />
              </g>

              <path
                d="M 35 84 C 35 81, 37 80, 40 80 L 48 80 C 51 80, 54 81, 56 83 L 98 116 C 99.2 117, 100.8 117, 102 116 L 144 83 C 146 81, 149 80, 152 80 L 160 80 C 163 80, 165 81, 165 84 L 165 150 C 165 158, 158 164, 150 164 L 50 164 C 42 164, 35 158, 35 150 Z"
                fill="#F086A5"
              />
              <path d="M 35 152 L 88 110" stroke="#EA7496" strokeWidth="2" strokeLinecap="round" />
              <path d="M 165 152 L 112 110" stroke="#EA7496" strokeWidth="2" strokeLinecap="round" />
              <circle cx="100" cy="128" r="15" fill="#DE4377" />
              <path
                d="M100 134.5l-1.3-1.2C94.1 129 91 126.2 91 122.8c0-2.8 2.2-5 5-5 1.6 0 3.1.7 4 1.9.9-1.2 2.4-1.9 4-1.9 2.8 0 5 2.2 5 5 0 3.4-3.1 6.2-7.7 10.5L100 134.5z"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black text-[#3C2E35] tracking-tight leading-tight mb-1.5">
          {startScreen.title}{" "}
          <span className="inline-block hover:scale-110 transition-transform">
            💌
          </span>
        </h1>

        {/* Teaser */}
        <p className="text-xs text-[#7A6470] max-w-[280px] leading-relaxed mb-4 font-medium">
          {startScreen.description}
        </p>

        {/* Start button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full max-w-[260px] h-[46px] bg-[#DE4377] hover:bg-[#C93667] text-white text-base font-bold rounded-2xl shadow-sm transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{startScreen.buttonText}</span>
          <svg className="w-4 h-4 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Subtext */}
        <p className="text-[11px] text-[#A69AA1] mt-2 font-medium">
          {startScreen.subtext}
        </p>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP / TABLET LAYOUT (>= 768px): Figma 50/50 2-Column Design*/}
      {/* ============================================================== */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-14 items-center w-full max-w-5xl mx-auto px-4">
        
        {/* Left Column: Title, Teaser, Start Button, Left-aligned */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          {/* Top Kicker */}
          <span className="text-[11px] font-black tracking-[0.2em] text-[#8D7B85] uppercase mb-4 block">
            {startScreen.kicker}
          </span>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#3C2E35] tracking-tight leading-[1.1] mb-5">
            {startScreen.title}{" "}
            <span className="inline-block hover:scale-110 transition-transform select-none">
              💌
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#7A6470] max-w-lg leading-relaxed mb-8 font-medium">
            {startScreen.description}
          </p>

          {/* Start Button */}
          <div className="flex flex-col items-start gap-2.5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="py-3.5 px-8 bg-[#DE4377] hover:bg-[#C93667] text-white text-base md:text-lg font-bold rounded-2xl shadow-md hover:shadow-lg transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{startScreen.buttonText}</span>
              <svg className="w-5 h-5 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
            <p className="text-xs text-[#A69AA1] font-medium">
              {startScreen.subtext}
            </p>
          </div>
        </div>

        {/* Right Column: Circular Backdrop, Envelope, Sparkles & Bottom Pill */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-72 h-72 lg:w-84 lg:h-84 flex items-center justify-center">
            {/* SVG Envelope */}
            <svg className="w-64 h-64 lg:w-76 lg:h-76 drop-shadow-sm transition-all" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="88" fill="#FDE8ED" />

              <path
                d="M42 66c-1.6-2.2-5-2.2-6.6 0-1.8 2.2 0 5 3.5 7.2 3.5-2.2 5.3-5 3.5-7.2z"
                fill="none"
                stroke="#F2A7BC"
                strokeWidth="1.5"
              />
              <path d="M40 146l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#DE4377" />
              <path
                d="M165 60l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"
                fill="none"
                stroke="#EF88A6"
                strokeWidth="1.5"
              />
              <path
                d="M168 132c-1.5-2-4.5-2-6 0-1.5 2 0 4.5 3 6.5 3-2 4.5-4.5 3-6.5z"
                fill="none"
                stroke="#F2A7BC"
                strokeWidth="1.5"
              />

              <g transform="rotate(-3 100 115)">
                <rect x="35" y="80" width="130" height="84" rx="14" fill="#E882A2" />
                <g transform="rotate(-2 100 85)">
                  <rect
                    x="48"
                    y="32"
                    width="104"
                    height="88"
                    rx="8"
                    fill="#FFFFFF"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
                  />
                  <text
                    x="100"
                    y="58"
                    textAnchor="middle"
                    fill="#3C2E35"
                    fontSize="15"
                    fontWeight="900"
                    fontFamily="'Nunito', sans-serif"
                  >
                    for you
                  </text>
                  <path d="M87 70c-1.5-2-4.5-2-6 0-1.5 2 0 4.5 3 6.5 3-2 4.5-4.5 3-6.5z" fill="#F2A7BC" />
                  <path d="M100 70c-1.8-2.4-5.4-2.4-7.2 0-1.8 2.4 0 5.4 3.6 7.8 3.6-2.4 5.4-5.4 3.6-7.8z" fill="#DE4377" />
                  <path d="M113 70c-1.5-2-4.5-2-6 0-1.5 2 0 4.5 3 6.5 3-2 4.5-4.5 3-6.5z" fill="#F2A7BC" />
                  <rect x="66" y="83" width="68" height="3.5" rx="2" fill="#FDECEF" />
                  <rect x="73" y="91" width="54" height="3.5" rx="2" fill="#FDECEF" />
                </g>

                <path
                  d="M 35 84 C 35 81, 37 80, 40 80 L 48 80 C 51 80, 54 81, 56 83 L 98 116 C 99.2 117, 100.8 117, 102 116 L 144 83 C 146 81, 149 80, 152 80 L 160 80 C 163 80, 165 81, 165 84 L 165 150 C 165 158, 158 164, 150 164 L 50 164 C 42 164, 35 158, 35 150 Z"
                  fill="#F086A5"
                />
                <path d="M 35 152 L 88 110" stroke="#EA7496" strokeWidth="2" strokeLinecap="round" />
                <path d="M 165 152 L 112 110" stroke="#EA7496" strokeWidth="2" strokeLinecap="round" />
                <circle cx="100" cy="128" r="15" fill="#DE4377" />
                <path
                  d="M100 134.5l-1.3-1.2C94.1 129 91 126.2 91 122.8c0-2.8 2.2-5 5-5 1.6 0 3.1.7 4 1.9.9-1.2 2.4-1.9 4-1.9 2.8 0 5 2.2 5 5 0 3.4-3.1 6.2-7.7 10.5L100 134.5z"
                  fill="#FFFFFF"
                />
              </g>
            </svg>
          </div>

          {/* Overlapping Pill Badge matching Figma: "♥ a small surprise, a whole lot of us" */}
          <div className="bg-[#FDECEF] px-4 py-1.5 rounded-full mt-2 border border-pink-200/60 shadow-2xs flex items-center gap-1.5">
            <span className="text-[#DE4377] text-xs">♥</span>
            <span className="text-xs font-bold text-[#7A6470]">
              {startScreen.pillBadge}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

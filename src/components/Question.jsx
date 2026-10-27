import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { dateConfig } from "../config/dateConfig";
import { fireHeartConfetti } from "../utils/confetti";

export default function Question({ onSayYes }) {
  const { questionScreen } = dateConfig;
  const [dodgeCount, setDodgeCount] = useState(0);
  const [freeFloatPos, setFreeFloatPos] = useState(null);
  const yesRef = useRef(null);

  const handleDodge = useCallback(() => {
    setDodgeCount((prev) => {
      const nextCount = prev + 1;
      // In stage 3+, roam freely anywhere on the screen
      if (nextCount >= 3) {
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;
        const btnWidth = 140;
        const btnHeight = 56;
        const pad = 40;

        let yesRect = { left: 0, right: 0, top: 0, bottom: 0 };
        if (yesRef.current) {
          yesRect = yesRef.current.getBoundingClientRect();
        }

        let targetX = pad;
        let targetY = pad;
        let safe = false;
        let tries = 0;

        while (!safe && tries < 40) {
          targetX = Math.floor(pad + Math.random() * (vpWidth - btnWidth - pad * 2));
          targetY = Math.floor(pad + 80 + Math.random() * (vpHeight - btnHeight - pad * 2 - 80));

          const overlaps = !(
            targetX + btnWidth < yesRect.left - 50 ||
            targetX > yesRect.right + 50 ||
            targetY + btnHeight < yesRect.top - 50 ||
            targetY > yesRect.bottom + 50
          );

          if (!overlaps) safe = true;
          tries++;
        }

        setFreeFloatPos({ left: targetX, top: targetY });
      }
      return nextCount;
    });
  }, []);

  const handleYes = () => {
    fireHeartConfetti();
    onSayYes();
  };

  const currentSubtitle =
    dodgeCount === 0
      ? questionScreen.initialSubtitle
      : questionScreen.dodgeSubtitles[
          (dodgeCount - 1) % questionScreen.dodgeSubtitles.length
        ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-6xl lg:max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-12 flex-1 flex flex-col justify-between select-none"
    >
      {/* 2-Column Desktop Grid / 1-Column Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto w-full py-4 md:py-8">
        
        {/* Left Column: Tilted Calendar Illustration & Date Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 flex items-center justify-center bg-white/70 rounded-3xl p-6 border border-pink-100 shadow-sm">
            {/* Tilted Calendar Sheet matching reference */}
            <div className="w-48 sm:w-56 md:w-60 bg-white rounded-3xl shadow-xl border border-pink-100/90 overflow-hidden transform -rotate-3 transition-transform duration-300">
              {/* Pink top band */}
              <div className="bg-[#EF88A6] py-3 px-4 text-center">
                <span className="text-white text-xs sm:text-sm font-black tracking-[0.25em] uppercase">
                  {questionScreen.calendarMonth}
                </span>
              </div>
              {/* White date body */}
              <div className="py-6 sm:py-8 text-center">
                <span className="text-7xl sm:text-8xl font-black text-[#DE4377] leading-none tracking-tight block">
                  {questionScreen.calendarDay}
                </span>
                <span className="text-sm sm:text-base font-bold text-[#8D7B85] tracking-widest mt-2 block">
                  {questionScreen.calendarYear}
                </span>
              </div>
            </div>

            {/* Surrounding decorative elements */}
            <span className="absolute top-10 left-6 text-pink-300 text-2xl font-light">♡</span>
            <span className="absolute top-10 right-8 text-[#EF88A6] text-2xl font-bold">✦</span>
            <span className="absolute bottom-10 right-6 text-pink-300 text-2xl font-light">♡</span>
          </div>

          <div className="bg-[#FDECEF] px-4 py-2 rounded-full mt-4 border border-pink-200/60 shadow-2xs">
            <span className="text-xs font-bold text-[#DE4377]">
              ✨ A whole day reserved just for the two of us
            </span>
          </div>
        </div>

        {/* Right Column: Question Text & Interactive Buttons */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Section kicker */}
          <div className="inline-flex items-center gap-2 bg-[#FDECEF] px-4 py-1.5 rounded-full mb-4 md:mb-6 border border-pink-200/60 shadow-2xs">
            <span className="text-xs font-black tracking-[0.2em] text-[#DE4377] uppercase">
              {questionScreen.kicker}
            </span>
          </div>

          {/* Main Question Text */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3C2E35] tracking-tight leading-tight mb-4 max-w-xl">
            {questionScreen.question}
          </h2>

          {/* Dynamic Subtitle */}
          <p className="text-base sm:text-lg md:text-xl font-bold text-[#7A6470] mb-8 min-h-[28px]">
            {currentSubtitle}
          </p>

          {/* Buttons Area */}
          <div className="w-full max-w-md flex flex-col gap-4 relative min-h-[140px]">
            {/* State 0: Initial side-by-side buttons */}
            {dodgeCount === 0 && (
              <div className="flex items-center gap-4 w-full">
                <motion.button
                  ref={yesRef}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleYes}
                  className="flex-1 py-4.5 bg-[#DE4377] hover:bg-[#C93667] text-white text-xl font-black rounded-2xl shadow-md hover:shadow-lg transition-all focus:outline-none flex items-center justify-center gap-2"
                >
                  <span>{questionScreen.yesButtonText}</span>
                  <span>💕</span>
                </motion.button>

                <button
                  type="button"
                  onMouseEnter={handleDodge}
                  onPointerDown={handleDodge}
                  onTouchStart={handleDodge}
                  onFocus={handleDodge}
                  className="flex-1 py-4.5 bg-white border border-[#EEDFE4] text-[#3C2E35] text-xl font-bold rounded-2xl shadow-2xs hover:bg-pink-50/50 transition-colors focus:outline-none"
                >
                  {questionScreen.noButtonText}
                </button>
              </div>
            )}

            {/* State 1: YES is full width, NO is at bottom right */}
            {dodgeCount === 1 && (
              <div className="w-full flex flex-col gap-4">
                <motion.button
                  ref={yesRef}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleYes}
                  className="w-full py-5 bg-[#DE4377] hover:bg-[#C93667] text-white text-2xl font-black rounded-2xl shadow-md hover:shadow-lg transition-all focus:outline-none"
                >
                  {questionScreen.yesButtonText} 💕
                </motion.button>

                <div className="flex items-center justify-between w-full pt-1">
                  <span className="text-xs md:text-sm text-[#A69AA1] font-bold text-left">
                    that little no is getting shy...
                  </span>

                  <button
                    type="button"
                    onMouseEnter={handleDodge}
                    onPointerDown={handleDodge}
                    onTouchStart={handleDodge}
                    onFocus={handleDodge}
                    className="w-32 py-3 bg-white border border-[#EEDFE4] text-[#3C2E35] text-base font-bold rounded-2xl shadow-2xs focus:outline-none"
                  >
                    {questionScreen.noButtonText}
                  </button>
                </div>
              </div>
            )}

            {/* State 2: YES is even taller, NO is at bottom left */}
            {dodgeCount === 2 && (
              <div className="w-full flex flex-col gap-4">
                <motion.button
                  ref={yesRef}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleYes}
                  className="w-full py-6 bg-[#DE4377] hover:bg-[#C93667] text-white text-3xl font-black rounded-2xl shadow-lg transition-all focus:outline-none"
                >
                  {questionScreen.yesButtonText} 💖
                </motion.button>

                <div className="flex items-center justify-between w-full pt-1 gap-3">
                  <button
                    type="button"
                    onMouseEnter={handleDodge}
                    onPointerDown={handleDodge}
                    onTouchStart={handleDodge}
                    onFocus={handleDodge}
                    className="w-32 py-3 bg-white border border-[#EEDFE4] text-[#3C2E35] text-base font-bold rounded-2xl shadow-2xs focus:outline-none shrink-0"
                  >
                    {questionScreen.noButtonText}
                  </button>

                  <span className="text-xs md:text-sm text-[#7A6470] font-bold text-right flex-1">
                    a whole day with your favorite person
                  </span>
                </div>
              </div>
            )}

            {/* State 3+: Free floating runaway NO button across viewport */}
            {dodgeCount >= 3 && (
              <div className="w-full flex flex-col gap-4">
                <motion.button
                  ref={yesRef}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleYes}
                  className="w-full py-6 bg-[#DE4377] hover:bg-[#C93667] text-white text-3xl font-black rounded-2xl shadow-lg transition-all focus:outline-none"
                >
                  {questionScreen.yesButtonText} 💖🥰
                </motion.button>

                {freeFloatPos && (
                  <button
                    type="button"
                    onMouseEnter={handleDodge}
                    onPointerDown={handleDodge}
                    onTouchStart={handleDodge}
                    onFocus={handleDodge}
                    style={{
                      position: "fixed",
                      left: `${freeFloatPos.left}px`,
                      top: `${freeFloatPos.top}px`,
                      zIndex: 50,
                    }}
                    className="w-32 py-3 bg-white border border-[#EEDFE4] text-[#3C2E35] text-base font-bold rounded-2xl shadow-2xl focus:outline-none animate-pop cursor-pointer"
                  >
                    {questionScreen.noButtonText}
                  </button>
                )}
              </div>
            )}
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

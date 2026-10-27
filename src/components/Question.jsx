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
      if (nextCount >= 3) {
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;
        const btnWidth = 110;
        const btnHeight = 44;
        const padX = 24;
        const padTop = 70;
        const padBottom = 50;

        let yesRect = { left: 0, right: 0, top: 0, bottom: 0 };
        if (yesRef.current) {
          yesRect = yesRef.current.getBoundingClientRect();
        }

        let targetX = padX;
        let targetY = padTop;
        let safe = false;
        let tries = 0;

        while (!safe && tries < 40) {
          targetX = Math.floor(padX + Math.random() * (vpWidth - btnWidth - padX * 2));
          targetY = Math.floor(padTop + Math.random() * (vpHeight - btnHeight - padTop - padBottom));

          const overlaps = !(
            targetX + btnWidth < yesRect.left - 24 ||
            targetX > yesRect.right + 24 ||
            targetY + btnHeight < yesRect.top - 24 ||
            targetY > yesRect.bottom + 24
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
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-between md:justify-center items-center select-none overflow-hidden my-auto py-2"
    >
      {/* ============================================================== */}
      {/* MOBILE LAYOUT (< 768px): Question on Top, YES & NO Stacked     */}
      {/* ============================================================== */}
      <div className="flex md:hidden flex-col justify-between items-center text-center w-full max-w-[390px] h-full px-4 py-2">
        <div className="flex flex-col items-center my-auto">
          {/* Top kicker */}
          <span className="text-[10px] font-black tracking-[0.2em] text-[#8D7B85] uppercase mb-2">
            {questionScreen.kicker}
          </span>

          {/* Calendar Card Graphic */}
          <div className="relative w-36 h-36 flex items-center justify-center my-1">
            <div className="w-28 bg-white rounded-2xl shadow-md border border-pink-100/90 overflow-hidden transform -rotate-3">
              <div className="bg-[#EF88A6] py-1.5 px-3 text-center">
                <span className="text-white text-[10px] font-black tracking-[0.2em] uppercase">
                  {questionScreen.calendarMonth}
                </span>
              </div>
              <div className="py-2.5 text-center">
                <span className="text-4xl font-black text-[#DE4377] leading-none tracking-tight block">
                  {questionScreen.calendarDay}
                </span>
                <span className="text-[10px] font-bold text-[#8D7B85] tracking-widest mt-1 block">
                  {questionScreen.calendarYear}
                </span>
              </div>
            </div>
          </div>

          <span className="text-xs text-[#7A6470] font-semibold mb-3">
            {questionScreen.calendarFootnote}
          </span>

          {/* Main Question */}
          <h2 className="text-lg font-black text-[#3C2E35] tracking-tight leading-snug mb-2">
            {questionScreen.question}
          </h2>

          <p className="text-xs text-[#7A6470] font-bold mb-4">
            {currentSubtitle}
          </p>
        </div>

        {/* Stacked Mobile Action Buttons */}
        <div className="w-full max-w-[280px] flex flex-col gap-2.5 shrink-0 pb-1 relative">
          <motion.button
            ref={yesRef}
            whileTap={{ scale: 0.98 }}
            onClick={handleYes}
            className="w-full h-[46px] bg-[#DE4377] hover:bg-[#C93667] text-white text-lg font-black rounded-2xl shadow-sm transition-all focus:outline-none cursor-pointer"
          >
            {questionScreen.yesButtonText} 💕
          </motion.button>

          {dodgeCount < 3 ? (
            <button
              type="button"
              onMouseEnter={handleDodge}
              onPointerDown={handleDodge}
              onTouchStart={handleDodge}
              onFocus={handleDodge}
              className="w-full h-[40px] bg-white border border-[#EEDFE4] text-[#3C2E35] text-sm font-bold rounded-2xl shadow-2xs focus:outline-none cursor-pointer"
            >
              {questionScreen.noButtonText}
            </button>
          ) : freeFloatPos ? (
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
              className="w-24 h-9 bg-white border border-[#EEDFE4] text-[#3C2E35] text-xs font-bold rounded-2xl shadow-2xl focus:outline-none animate-pop cursor-pointer"
            >
              {questionScreen.noButtonText}
            </button>
          ) : null}
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP / TABLET LAYOUT (>= 768px): Exact Figma 2-Column Design*/}
      {/* ============================================================== */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-14 items-center w-full max-w-5xl mx-auto px-4">
        
        {/* Left Column: Pink Card with Tilted Calendar Sheet matching Figma */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 lg:w-84 lg:h-84 flex flex-col items-center justify-center bg-[#FDECEF]/60 rounded-3xl p-6 border border-pink-100/60 shadow-sm">
            {/* Tilted Calendar Sheet */}
            <div className="w-48 sm:w-52 lg:w-56 bg-white rounded-3xl shadow-xl border border-pink-100/90 overflow-hidden transform -rotate-3 transition-transform duration-300">
              <div className="bg-[#EF88A6] py-2.5 px-4 text-center">
                <span className="text-white text-xs font-black tracking-[0.25em] uppercase">
                  {questionScreen.calendarMonth}
                </span>
              </div>
              <div className="py-6 text-center">
                <span className="text-7xl lg:text-8xl font-black text-[#DE4377] leading-none tracking-tight block">
                  {questionScreen.calendarDay}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#8D7B85] tracking-widest mt-2 block">
                  {questionScreen.calendarYear}
                </span>
              </div>
            </div>

            {/* Sparkles & Hearts around sheet */}
            <span className="absolute top-8 left-6 text-pink-300 text-2xl font-light">♡</span>
            <span className="absolute top-10 right-8 text-[#EF88A6] text-2xl font-bold">✦</span>
            <span className="absolute bottom-8 right-6 text-pink-300 text-2xl font-light">♡</span>

            {/* Footnote matching Figma: "A whole day, just us." */}
            <span className="text-xs sm:text-sm font-bold text-[#3C2E35] mt-4">
              {questionScreen.calendarFootnote}
            </span>
          </div>
        </div>

        {/* Right Column: Copy & Side-by-side YES/NO Buttons */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          {/* Top section kicker */}
          <span className="text-[11px] font-black tracking-[0.2em] text-[#8D7B85] uppercase mb-4 block">
            {questionScreen.kicker}
          </span>

          {/* Main Question */}
          <h2 className="text-3xl lg:text-4xl font-black text-[#3C2E35] tracking-tight leading-[1.2] mb-3 max-w-lg">
            {questionScreen.question}
          </h2>

          <p className="text-sm sm:text-base font-bold text-[#7A6470] mb-8 min-h-[24px]">
            {currentSubtitle}
          </p>

          {/* Buttons Area */}
          <div className="w-full max-w-md relative">
            {/* Initial State: Side-by-side YES and NO */}
            {dodgeCount === 0 && (
              <div className="flex items-center gap-3 w-full">
                <motion.button
                  ref={yesRef}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleYes}
                  className="w-48 py-3.5 bg-[#DE4377] hover:bg-[#C93667] text-white text-lg font-black rounded-2xl shadow-md hover:shadow-lg transition-all focus:outline-none cursor-pointer"
                >
                  {questionScreen.yesButtonText}
                </motion.button>

                <button
                  type="button"
                  onMouseEnter={handleDodge}
                  onPointerDown={handleDodge}
                  onTouchStart={handleDodge}
                  onFocus={handleDodge}
                  className="w-32 py-3.5 bg-white border border-[#EEDFE4] text-[#3C2E35] text-base font-bold rounded-2xl shadow-2xs hover:bg-pink-50/50 transition-colors focus:outline-none cursor-pointer"
                >
                  {questionScreen.noButtonText}
                </button>
              </div>
            )}

            {/* State 1: YES is full width, NO moves right */}
            {dodgeCount === 1 && (
              <div className="w-full flex flex-col gap-3">
                <motion.button
                  ref={yesRef}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleYes}
                  className="w-full py-4 bg-[#DE4377] hover:bg-[#C93667] text-white text-xl font-black rounded-2xl shadow-md hover:shadow-lg transition-all focus:outline-none cursor-pointer"
                >
                  {questionScreen.yesButtonText} 💕
                </motion.button>

                <div className="flex items-center justify-between w-full pt-1">
                  <span className="text-xs text-[#A69AA1] font-bold">
                    that little no is getting shy...
                  </span>

                  <button
                    type="button"
                    onMouseEnter={handleDodge}
                    onPointerDown={handleDodge}
                    onTouchStart={handleDodge}
                    onFocus={handleDodge}
                    className="w-28 py-2.5 bg-white border border-[#EEDFE4] text-[#3C2E35] text-sm font-bold rounded-2xl shadow-2xs focus:outline-none"
                  >
                    {questionScreen.noButtonText}
                  </button>
                </div>
              </div>
            )}

            {/* State 2: YES is even bigger */}
            {dodgeCount === 2 && (
              <div className="w-full flex flex-col gap-3">
                <motion.button
                  ref={yesRef}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleYes}
                  className="w-full py-4.5 bg-[#DE4377] hover:bg-[#C93667] text-white text-2xl font-black rounded-2xl shadow-lg transition-all focus:outline-none cursor-pointer"
                >
                  {questionScreen.yesButtonText} 💖
                </motion.button>

                <div className="flex items-center justify-between w-full pt-1 gap-2">
                  <button
                    type="button"
                    onMouseEnter={handleDodge}
                    onPointerDown={handleDodge}
                    onTouchStart={handleDodge}
                    onFocus={handleDodge}
                    className="w-28 py-2.5 bg-white border border-[#EEDFE4] text-[#3C2E35] text-sm font-bold rounded-2xl shadow-2xs focus:outline-none shrink-0"
                  >
                    {questionScreen.noButtonText}
                  </button>

                  <span className="text-xs text-[#7A6470] font-bold text-right flex-1">
                    a whole day with your favorite person
                  </span>
                </div>
              </div>
            )}

            {/* State 3+: Free floating runaway NO button across viewport */}
            {dodgeCount >= 3 && (
              <div className="w-full flex flex-col gap-3">
                <motion.button
                  ref={yesRef}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleYes}
                  className="w-full py-5 bg-[#DE4377] hover:bg-[#C93667] text-white text-2xl font-black rounded-2xl shadow-lg transition-all focus:outline-none cursor-pointer"
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
                    className="w-28 py-2.5 bg-white border border-[#EEDFE4] text-[#3C2E35] text-sm font-bold rounded-2xl shadow-2xl focus:outline-none animate-pop cursor-pointer"
                  >
                    {questionScreen.noButtonText}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

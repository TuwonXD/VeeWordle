import React, { useState } from "react";
import { dateConfig } from "../config/dateConfig";

export default function Header({ onReset }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <header className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 h-[52px] sm:h-[60px] flex items-center justify-between z-20 shrink-0 select-none">
      {/* Brand: Pink Heart + "a little us" */}
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 group text-left focus:outline-none cursor-pointer"
        title="Tap to restart"
        aria-label={dateConfig.appName}
      >
        <div className="w-6 h-6 rounded-full bg-[#FDECEF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <svg
            className="w-3.5 h-3.5 text-[#DE4377] fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <span className="font-extrabold text-base sm:text-lg text-[#3C2E35] tracking-tight">
          {dateConfig.appName}
        </span>
      </button>

      {/* Right Tagline matching Figma: "A little love, in five clues ✧" */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline-block text-xs text-[#8D7B85] font-medium">
          {dateConfig.headerTagline}
        </span>
        <button
          onClick={() => setShowConfirm(true)}
          className="text-[#DE4377] hover:scale-110 transition-transform p-1 cursor-pointer"
          title="Restart game"
          aria-label="Restart game"
        >
          <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </button>
      </div>

      {/* Restart confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-pink-100 text-center animate-pop">
            <div className="text-3xl mb-2">💌</div>
            <h3 className="font-bold text-[#3C2E35] text-lg mb-1">Restart VeeWordle?</h3>
            <p className="text-xs sm:text-sm text-[#8D7B85] mb-5">
              This will reset your solved progress and return to the start screen.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#7A6470] bg-[#FDECEF] hover:bg-[#F8D7DF] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  onReset();
                }}
                className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#DE4377] hover:bg-[#C93667] cursor-pointer"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

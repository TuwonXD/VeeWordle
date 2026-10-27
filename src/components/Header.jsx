import React, { useState } from "react";
import { dateConfig } from "../config/dateConfig";

export default function Header({ onReset, screen, currentPuzzleIndex, solvedPuzzles }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const totalPuzzles = dateConfig.puzzles.length;

  return (
    <header className="w-full max-w-6xl lg:max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-4 flex items-center justify-between z-20 border-b border-pink-100/60">
      {/* Brand logo: Pink filled heart + "VeeWordle" */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
          title="Tap to reset or restart"
          aria-label={dateConfig.appName}
        >
          <div className="w-9 h-9 rounded-full bg-[#FDECEF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
            <svg
              className="w-5 h-5 text-[#DE4377] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-xl md:text-2xl text-[#3C2E35] tracking-tight block leading-tight">
              {dateConfig.appName}
            </span>
          </div>
        </button>
      </div>

      {/* Center status for larger screens */}
      {screen === "puzzle" && (
        <div className="hidden md:flex items-center gap-2 bg-[#FDECEF]/80 px-4 py-1.5 rounded-full border border-pink-200/50">
          <div className="flex items-center gap-1">
            {dateConfig.puzzles.map((p, idx) => (
              <span key={p.id}>
                {solvedPuzzles.includes(p.id) ? (
                  <svg className="w-4 h-4 text-[#DE4377] fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : idx === currentPuzzleIndex ? (
                  <svg className="w-4 h-4 text-[#DE4377] fill-none stroke-current animate-pulse" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-[#F2A7BC] fill-none stroke-current" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
              </span>
            ))}
          </div>
          <span className="text-xs font-bold text-[#7A6470] ml-1">
            Puzzle {currentPuzzleIndex + 1} of {totalPuzzles}
          </span>
        </div>
      )}

      {/* Right sparkle icon & reset action */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowConfirm(true)}
          className="text-xs font-bold text-[#8D7B85] hover:text-[#DE4377] px-3 py-1.5 rounded-xl hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-200"
        >
          Reset Game
        </button>
        <div className="text-[#DE4377] flex items-center justify-center p-1" aria-hidden="true">
          <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
      </div>

      {/* Reset confirmation modal */}
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
                className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#7A6470] bg-[#FDECEF] hover:bg-[#F8D7DF]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  onReset();
                }}
                className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#DE4377] hover:bg-[#C93667]"
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

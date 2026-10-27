import React, { useEffect, useCallback } from "react";

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

export default function Keyboard({
  onChar,
  onEnter,
  onDelete,
  letterStatuses = {},
  disabled = false,
}) {
  const handleKeyClick = useCallback(
    (key) => {
      if (disabled) return;
      if (key === "ENTER") {
        onEnter();
      } else if (key === "BACKSPACE") {
        onDelete();
      } else {
        onChar(key);
      }
    },
    [disabled, onEnter, onDelete, onChar]
  );

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (disabled) return;
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (e.key === "Enter") {
        e.preventDefault();
        onEnter();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        onDelete();
      } else {
        const char = e.key.toUpperCase();
        if (/^[A-Z]$/.test(char) && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          onChar(char);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, onEnter, onDelete, onChar]);

  const getKeyStyle = (key) => {
    const status = letterStatuses[key];

    const base =
      "min-h-[46px] sm:min-h-[50px] md:min-h-[56px] h-[46px] sm:h-[52px] md:h-[58px] rounded-xl md:rounded-2xl font-bold flex items-center justify-center transition-all select-none text-xs sm:text-sm md:text-base active:scale-95 focus:outline-none cursor-pointer";

    if (key === "ENTER") {
      return `${base} px-2 sm:px-4 md:px-5 bg-white text-[#3C2E35] border border-[#EEDFE4] hover:bg-pink-50/50 flex-[1.4] text-[10px] sm:text-xs md:text-sm tracking-tight`;
    }
    if (key === "BACKSPACE") {
      return `${base} px-2 sm:px-4 md:px-5 bg-white text-[#3C2E35] border border-[#EEDFE4] hover:bg-pink-50/50 flex-[1.4]`;
    }

    if (status === "correct") {
      return `${base} bg-[#EF88A6] text-white border-transparent flex-1 shadow-2xs hover:brightness-105`;
    }
    if (status === "present") {
      return `${base} bg-[#F9D97B] text-[#3C2E35] border-transparent flex-1 shadow-2xs hover:brightness-105`;
    }
    if (status === "absent") {
      return `${base} bg-[#D9D4DC] text-[#3C2E35] border-transparent flex-1 opacity-90`;
    }

    // Default unused key
    return `${base} bg-white text-[#3C2E35] border border-[#EEDFE4] hover:bg-pink-50/50 hover:border-pink-300 flex-1 shadow-2xs`;
  };

  return (
    <div
      className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-1 sm:px-3 py-2 flex flex-col gap-1.5 md:gap-2 z-10"
      role="group"
      aria-label="Keyboard"
    >
      {KEYBOARD_ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center gap-1 sm:gap-1.5 md:gap-2 w-full">
          {row.map((key) => {
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleKeyClick(key)}
                className={getKeyStyle(key)}
                disabled={disabled}
                aria-label={key === "BACKSPACE" ? "Backspace" : key === "ENTER" ? "Enter guess" : key}
              >
                {key === "BACKSPACE" ? (
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-[#3C2E35]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                    <line x1="18" y1="9" x2="12" y2="15" />
                    <line x1="12" y1="9" x2="18" y2="15" />
                  </svg>
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

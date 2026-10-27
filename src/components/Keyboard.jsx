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
      "h-[38px] sm:h-[42px] md:h-[44px] rounded-lg font-black flex items-center justify-center transition-all select-none active:scale-95 focus:outline-none cursor-pointer shrink-0";

    if (key === "ENTER") {
      return `${base} px-2.5 sm:px-3 text-[10px] sm:text-xs bg-white text-[#3C2E35] border border-[#EEDFE4] hover:bg-pink-50/50 shadow-2xs`;
    }
    if (key === "BACKSPACE") {
      return `${base} px-2.5 sm:px-3 bg-white text-[#3C2E35] border border-[#EEDFE4] hover:bg-pink-50/50 shadow-2xs`;
    }

    const widthClass = "w-[29px] sm:w-[33px] md:w-[38px] text-xs sm:text-sm";

    if (status === "correct") {
      return `${base} ${widthClass} bg-[#EF88A6] text-white border-transparent shadow-2xs`;
    }
    if (status === "present") {
      return `${base} ${widthClass} bg-[#F9D97B] text-[#3C2E35] border-transparent shadow-2xs`;
    }
    if (status === "absent") {
      return `${base} ${widthClass} bg-[#D9D4DC] text-[#3C2E35] border-transparent opacity-85`;
    }

    // Default unused key
    return `${base} ${widthClass} bg-white text-[#3C2E35] border border-[#EEDFE4] hover:bg-pink-50/50 shadow-2xs`;
  };

  return (
    <div
      className="w-full flex flex-col justify-center items-center gap-1 sm:gap-1.5 z-10 px-0.5"
      role="group"
      aria-label="Keyboard"
    >
      {KEYBOARD_ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center gap-1 sm:gap-1.5 w-full">
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
                    className="w-4 h-4 stroke-current fill-none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
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

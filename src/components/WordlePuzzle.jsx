import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Keyboard from "./Keyboard";
import { evaluateGuess, getLetterStatuses } from "../utils/wordleHelper";
import { fireHeartConfetti } from "../utils/confetti";
import { dateConfig } from "../config/dateConfig";

export default function WordlePuzzle({
  puzzle,
  puzzleIndex,
  totalPuzzles,
  savedGuesses = [],
  isAlreadySolved = false,
  onPuzzleSolved,
  onProceedNext,
}) {
  const [guesses, setGuesses] = useState(savedGuesses);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isRevealingRow, setIsRevealingRow] = useState(null);
  const [isSolved, setIsSolved] = useState(isAlreadySolved);
  const [showHintModal, setShowHintModal] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  const maxAttempts = dateConfig.maxAttempts; // 5 rows
  const wordLength = puzzle.length;
  const solution = puzzle.answer.toUpperCase();

  useEffect(() => {
    setGuesses(savedGuesses);
    setCurrentGuess("");
    setIsShaking(false);
    setIsRevealingRow(null);
    setIsSolved(isAlreadySolved);
    setShowHintModal(false);
    setBannerMessage("");
  }, [puzzle.id, savedGuesses, isAlreadySolved]);

  const letterStatuses = getLetterStatuses(guesses, solution);

  const showBanner = (msg) => {
    setBannerMessage(msg);
    setTimeout(() => {
      setBannerMessage("");
    }, 2800);
  };

  const handleChar = (char) => {
    if (isSolved || guesses.length >= maxAttempts || isRevealingRow !== null) return;
    if (currentGuess.length < wordLength) {
      setCurrentGuess((prev) => prev + char);
    }
  };

  const handleDelete = () => {
    if (isSolved || isRevealingRow !== null) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (isSolved || isRevealingRow !== null) return;

    if (currentGuess.length !== wordLength) {
      setIsShaking(true);
      showBanner(`Not enough letters — fill all ${wordLength} tiles.`);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    const nextGuesses = [...guesses, currentGuess];
    const currentRowIdx = guesses.length;
    setIsRevealingRow(currentRowIdx);

    const flipDuration = wordLength * 140 + 200;

    setTimeout(() => {
      setGuesses(nextGuesses);
      setCurrentGuess("");
      setIsRevealingRow(null);

      if (currentGuess.toUpperCase() === solution) {
        setIsSolved(true);
        fireHeartConfetti();
        onPuzzleSolved(puzzle.id, nextGuesses);
        setTimeout(() => {
          onProceedNext();
        }, 1200);
      } else if (nextGuesses.length >= maxAttempts) {
        showBanner("so close! try again 💕");
        setTimeout(() => {
          setGuesses([]);
        }, 2200);
      }
    }, flipDuration);
  };

  // Responsive tile sizing
  const getTileSize = () => {
    if (wordLength <= 6) {
      return "w-11 sm:w-13 md:w-16 lg:w-16 h-12 sm:h-14 md:h-16 lg:h-16 text-xl sm:text-2xl md:text-3xl rounded-xl md:rounded-2xl";
    }
    if (wordLength <= 8) {
      return "w-9 sm:w-11 md:w-13 lg:w-13 h-11 sm:h-13 md:h-14 lg:h-14 text-base sm:text-xl md:text-2xl rounded-lg sm:rounded-xl md:rounded-2xl";
    }
    // 10 letters (PHOTOBOOTH)
    return "w-7 sm:w-8.5 md:w-10 lg:w-10.5 h-10 sm:h-12 md:h-13 lg:h-13.5 text-xs sm:text-base md:text-lg rounded-md sm:rounded-lg md:rounded-xl";
  };

  return (
    <div className="w-full max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-4 flex-1 flex flex-col justify-between select-none">
      {/* 2-Column Desktop Layout / 1-Column Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start w-full my-auto">
        
        {/* Left Column (5 cols on Desktop): Clue, Instructions, Progress, & Hints */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Progress Header Card */}
          <div className="bg-white/80 rounded-2xl md:rounded-3xl p-4 md:p-5 border border-pink-100/80 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black tracking-widest text-[#7A6470] uppercase">
                PUZZLE {puzzle.number} OF 0{totalPuzzles}
              </span>
              <span className="text-xs font-bold text-[#DE4377] bg-[#FDECEF] px-2.5 py-0.5 rounded-full">
                {puzzleIndex + 1}/{totalPuzzles} Solved
              </span>
            </div>

            {/* 5 Progress Hearts */}
            <div className="flex items-center gap-2 pt-1">
              {Array.from({ length: totalPuzzles }).map((_, idx) => {
                const isFilled = idx <= puzzleIndex;
                return (
                  <span key={idx} className="transition-all duration-300">
                    {isFilled ? (
                      <svg className="w-6 h-6 text-[#DE4377] fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-[#F2A7BC] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Clue Card */}
          <div className="bg-[#FDECEF] rounded-2xl md:rounded-3xl p-5 md:p-6 text-left shadow-2xs border border-pink-200/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] md:text-xs font-black tracking-wider text-[#7A6470] uppercase">
                CLUE · {wordLength} LETTERS
              </span>
              <button
                onClick={() => setShowHintModal((prev) => !prev)}
                className="bg-white text-[#3C2E35] font-bold text-xs md:text-sm px-4 py-1.5 rounded-full border border-pink-100 shadow-2xs hover:bg-pink-50 transition-colors"
              >
                {showHintModal ? "Hide Hint" : "Hint 💡"}
              </button>
            </div>

            <p className="text-base sm:text-lg md:text-xl font-extrabold text-[#3C2E35] leading-snug">
              "{puzzle.clue}"
            </p>

            {showHintModal && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3.5 pt-3 border-t border-pink-200/70 text-xs md:text-sm text-[#DE4377] font-bold bg-white/60 p-3 rounded-xl"
              >
                💡 Hint: {puzzle.hint}
              </motion.div>
            )}
          </div>

          {/* Color Guide & Tips (Desktop friendly) */}
          <div className="bg-white/80 rounded-2xl md:rounded-3xl p-4 md:p-5 border border-pink-100/80 shadow-2xs text-left">
            <h4 className="text-xs font-black tracking-wider text-[#7A6470] uppercase mb-3">
              How To Play
            </h4>
            <div className="flex flex-col gap-2 text-xs md:text-sm text-[#3C2E35] font-medium">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md bg-[#EF88A6] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  A
                </span>
                <span><strong>Pink:</strong> Correct letter in the right spot</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md bg-[#F9D97B] text-[#3C2E35] flex items-center justify-center font-bold text-xs shrink-0">
                  B
                </span>
                <span><strong>Yellow:</strong> In the word, but different position</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md bg-[#D9D4DC] text-[#3C2E35] flex items-center justify-center font-bold text-xs shrink-0">
                  C
                </span>
                <span><strong>Gray:</strong> Not in the word</span>
              </div>
            </div>
          </div>

          {/* Quick Recap of All 5 Puzzles */}
          <div className="hidden lg:block bg-white/60 rounded-2xl p-4 border border-pink-100 text-left">
            <h4 className="text-[11px] font-bold tracking-wider text-[#8D7B85] uppercase mb-2">
              Wordle List
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {dateConfig.puzzles.map((p, idx) => (
                <span
                  key={p.id}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold border ${
                    idx === puzzleIndex
                      ? "bg-[#FDECEF] border-[#DE4377] text-[#DE4377]"
                      : idx < puzzleIndex
                      ? "bg-pink-50 border-pink-200 text-pink-700"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  {p.number}. {idx < puzzleIndex ? p.answer : `${p.length} letters`}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols on Desktop): Wordle Grid & Keyboard Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs rounded-3xl p-4 md:p-8 border border-pink-100/90 shadow-sm w-full">
          
          {/* Wordle 5-Row Grid */}
          <div className="flex flex-col gap-2 md:gap-2.5 my-2 w-full items-center">
            {Array.from({ length: maxAttempts }).map((_, rowIdx) => {
              const isSubmitted = rowIdx < guesses.length;
              const isCurrent = rowIdx === guesses.length;
              const isRevealing = rowIdx === isRevealingRow;

              const rowGuess = isSubmitted
                ? guesses[rowIdx]
                : isCurrent
                ? currentGuess
                : "";

              const evaluations = isSubmitted
                ? evaluateGuess(rowGuess, solution)
                : isRevealing
                ? evaluateGuess(currentGuess, solution)
                : [];

              return (
                <motion.div
                  key={rowIdx}
                  animate={isCurrent && isShaking ? { x: [-6, 6, -4, 4, -2, 2, 0] } : {}}
                  transition={{ duration: 0.35 }}
                  className="flex justify-center gap-1.5 sm:gap-2 md:gap-2.5"
                >
                  {Array.from({ length: wordLength }).map((_, colIdx) => {
                    const letter = rowGuess[colIdx] || "";
                    const evalStatus = evaluations[colIdx];
                    const isRevealedTile = isSubmitted || (isRevealing && isRevealingRow !== null);

                    let tileColorClass = "bg-white border border-[#EEDFE4] text-[#3C2E35]";
                    if (isRevealedTile && evalStatus) {
                      if (evalStatus === "correct") {
                        tileColorClass = "bg-[#EF88A6] border-transparent text-white shadow-2xs";
                      } else if (evalStatus === "present") {
                        tileColorClass = "bg-[#F9D97B] border-transparent text-[#3C2E35] shadow-2xs";
                      } else {
                        tileColorClass = "bg-[#D9D4DC] border-transparent text-[#3C2E35] opacity-90";
                      }
                    } else if (isCurrent) {
                      tileColorClass = "bg-white border-2 md:border-3 border-[#EF88A6] text-[#3C2E35]";
                    }

                    return (
                      <motion.div
                        key={colIdx}
                        animate={{
                          rotateX: isRevealing ? [0, 90, 0] : 0,
                          scale: isCurrent && letter && !isRevealing ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                          rotateX: { delay: colIdx * 0.12, duration: 0.38, ease: "easeOut" },
                          scale: { duration: 0.1 },
                        }}
                        className={`
                          ${getTileSize()}
                          flex items-center justify-center font-black uppercase shadow-2xs
                          ${tileColorClass}
                        `}
                      >
                        {letter}
                      </motion.div>
                    );
                  })}
                </motion.div>
              );
            })}
          </div>

          {/* Toast Banner right above keyboard */}
          <div className="w-full min-h-[40px] flex items-center justify-center my-1">
            <AnimatePresence>
              {bannerMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="w-full max-w-md bg-[#FDECEF] text-[#3C2E35] text-xs md:text-sm font-bold py-2.5 px-5 rounded-xl text-center shadow-2xs border border-pink-200"
                >
                  {bannerMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Keyboard */}
          <div className="w-full mt-2">
            <Keyboard
              onChar={handleChar}
              onEnter={handleEnter}
              onDelete={handleDelete}
              letterStatuses={letterStatuses}
              disabled={isSolved || isRevealingRow !== null}
            />
          </div>

          <p className="hidden md:block text-[11px] text-[#A69AA1] mt-3 font-medium">
            💡 Tip: You can type letters and press Enter on your physical keyboard
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center py-4 border-t border-pink-100/50 mt-4">
        <p className="text-xs text-[#A69AA1]">
          {dateConfig.footerText}
        </p>
      </div>
    </div>
  );
}

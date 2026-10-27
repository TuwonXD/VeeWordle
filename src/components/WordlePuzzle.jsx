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

  const maxAttempts = dateConfig.maxAttempts; // 6 attempts
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

    const flipDuration = wordLength * 120 + 200;

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

  // Explicit pixel tile sizing so tiles NEVER collapse into tiny dots
  const getTileSize = () => {
    if (wordLength <= 6) {
      return "w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] text-lg sm:text-xl md:text-2xl rounded-xl md:rounded-2xl";
    }
    if (wordLength <= 8) {
      return "w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] md:w-[46px] md:h-[46px] text-sm sm:text-base md:text-xl rounded-lg sm:rounded-xl";
    }
    // 10 letters (PHOTOBOOTH) - fitted precisely for 390px mobile screens
    return "w-[29px] h-[29px] sm:w-[32px] sm:h-[32px] md:w-[38px] md:h-[38px] text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg";
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between md:justify-center items-center select-none overflow-hidden my-auto py-1 sm:py-2">
      
      {/* ============================================================== */}
      {/* MOBILE LAYOUT (< 768px): Single column, compact, 100dvh fit    */}
      {/* ============================================================== */}
      <div className="flex md:hidden flex-col justify-between w-full max-w-[390px] h-full px-3 py-1">
        {/* Mobile Top Progress & Hint Bar */}
        <div className="flex items-center justify-between h-[36px] shrink-0">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPuzzles }).map((_, idx) => {
              const isFilled = idx <= puzzleIndex;
              return (
                <span key={idx}>
                  {isFilled ? (
                    <svg className="w-4 h-4 text-[#DE4377] fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-[#F2A7BC] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  )}
                </span>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#8D7B85]">
              {puzzleIndex + 1}/{totalPuzzles}
            </span>
            <button
              onClick={() => setShowHintModal((h) => !h)}
              className="text-[11px] font-bold text-[#DE4377] bg-[#FDECEF] hover:bg-[#F8D7DF] px-2.5 py-0.5 rounded-full border border-pink-200/60"
            >
              {showHintModal ? "Hide Hint" : "Hint"}
            </button>
          </div>
        </div>

        {/* Mobile Clue Card */}
        <div className="bg-[#FDECEF] rounded-2xl px-3.5 py-2 shrink-0 border border-pink-200/50 mb-1">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[9px] font-black tracking-widest text-[#7A6470] uppercase">
              PUZZLE {puzzle.number} · {wordLength} LETTERS
            </span>
          </div>
          <p className="text-xs font-bold text-[#3C2E35] leading-tight">
            {showHintModal ? `💡 ${puzzle.hint}` : puzzle.clue}
          </p>
        </div>

        {/* Mobile Wordle Grid (Always centered, explicit width/height) */}
        <div className="flex-1 flex flex-col justify-center items-center py-1">
          <div className="flex flex-col gap-1 sm:gap-1.5 items-center">
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
                  animate={isCurrent && isShaking ? { x: [-4, 4, -2, 2, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center gap-1"
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
                        tileColorClass = "bg-[#D9D4DC] border-transparent text-[#3C2E35] opacity-85";
                      }
                    } else if (isCurrent) {
                      tileColorClass = letter
                        ? "bg-white border-2 border-[#EF88A6] text-[#3C2E35]"
                        : "bg-white border-2 border-[#EEDFE4] text-[#3C2E35]";
                    }

                    return (
                      <motion.div
                        key={colIdx}
                        animate={{
                          rotateX: isRevealing ? [0, 90, 0] : 0,
                          scale: isCurrent && letter && !isRevealing ? [1, 1.08, 1] : 1,
                        }}
                        transition={{
                          rotateX: { delay: colIdx * 0.12, duration: 0.35, ease: "easeOut" },
                          scale: { duration: 0.1 },
                        }}
                        className={`
                          ${getTileSize()}
                          aspect-square shrink-0 flex items-center justify-center font-black uppercase shadow-2xs
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
        </div>

        {/* Mobile Message/Error line */}
        <div className="h-[22px] shrink-0 flex items-center justify-center">
          <AnimatePresence>
            {bannerMessage ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11px] font-bold text-[#DE4377] bg-[#FDECEF] px-3 py-0.5 rounded-full border border-pink-200/60"
              >
                {bannerMessage}
              </motion.span>
            ) : (
              <span className="text-[10px] text-[#A69AA1] font-medium">
                A little closer to our next memory.
              </span>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Keyboard */}
        <div className="shrink-0 w-full pt-1 pb-1">
          <Keyboard
            onChar={handleChar}
            onEnter={handleEnter}
            onDelete={handleDelete}
            letterStatuses={letterStatuses}
            disabled={isSolved || isRevealingRow !== null}
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP / TABLET LAYOUT (>= 768px): Exact Figma 2-Panel Design */}
      {/* ============================================================== */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-6xl mx-auto px-4">
        
        {/* Left Panel (approx 40% / 5 cols): Clue Card, Kicker & A Little Guide */}
        <div className="md:col-span-5 flex flex-col gap-4 text-left">
          
          {/* Section Kicker */}
          <span className="text-[11px] font-black tracking-[0.2em] text-[#8D7B85] uppercase">
            LITTLE THINGS, BIG FEELINGS
          </span>

          {/* Main Title per puzzle */}
          <h2 className="text-3xl lg:text-4xl font-black text-[#3C2E35] tracking-tight leading-tight">
            {puzzle.title || "Our favorite little tradition."}
          </h2>

          {/* Figma Pink Clue Card */}
          <div className="bg-[#FDECEF] rounded-3xl p-5 lg:p-6 border border-pink-100 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black tracking-widest text-[#7A6470] uppercase">
                PUZZLE {puzzle.number} · {wordLength} LETTERS
              </span>
              <button
                onClick={() => setShowHintModal((h) => !h)}
                className="text-xs font-bold text-[#3C2E35] bg-white hover:bg-pink-50/80 px-3 py-1 rounded-full shadow-2xs border border-pink-100 transition-colors cursor-pointer"
              >
                {showHintModal ? "Hide Hint" : "Hint"}
              </button>
            </div>

            <p className="text-base lg:text-lg font-black text-[#3C2E35] leading-snug">
              {showHintModal ? `💡 ${puzzle.hint}` : puzzle.clue}
            </p>
          </div>

          {/* A LITTLE GUIDE matching Figma design */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[10px] font-black tracking-widest text-[#8D7B85] uppercase">
              A LITTLE GUIDE
            </span>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EF88A6] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                U
              </div>
              <span className="text-xs font-semibold text-[#7A6470]">
                Right letter, right place
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#F9D97B] text-[#3C2E35] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                S
              </div>
              <span className="text-xs font-semibold text-[#7A6470]">
                Right letter, different spot
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#D9D4DC] text-[#3C2E35] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                X
              </div>
              <span className="text-xs font-semibold text-[#7A6470]">
                Not in this little memory
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel (approx 60% / 7 cols): White Card with Grid & Keyboard */}
        <div className="md:col-span-7 bg-white rounded-3xl p-5 lg:p-7 shadow-sm border border-pink-100/70 flex flex-col items-center justify-center w-full">
          
          {/* Top Row inside Card: 5 Hearts + 4/5 Counter */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-pink-50">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPuzzles }).map((_, idx) => {
                const isFilled = idx <= puzzleIndex;
                return (
                  <span key={idx}>
                    {isFilled ? (
                      <svg className="w-5 h-5 text-[#DE4377] fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-[#F2A7BC] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    )}
                  </span>
                );
              })}
            </div>

            <span className="text-xs font-bold text-[#8D7B85]">
              {puzzleIndex + 1}/{totalPuzzles}
            </span>
          </div>

          {/* Desktop Wordle 6-Row Grid */}
          <div className="flex flex-col gap-1.5 my-3 w-full items-center">
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
                  animate={isCurrent && isShaking ? { x: [-5, 5, -3, 3, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center gap-1.5"
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
                        tileColorClass = "bg-[#D9D4DC] border-transparent text-[#3C2E35] opacity-85";
                      }
                    } else if (isCurrent) {
                      tileColorClass = letter
                        ? "bg-white border-2 border-[#EF88A6] text-[#3C2E35]"
                        : "bg-white border-2 border-[#EEDFE4] text-[#3C2E35]";
                    }

                    return (
                      <motion.div
                        key={colIdx}
                        animate={{
                          rotateX: isRevealing ? [0, 90, 0] : 0,
                          scale: isCurrent && letter && !isRevealing ? [1, 1.08, 1] : 1,
                        }}
                        transition={{
                          rotateX: { delay: colIdx * 0.12, duration: 0.35, ease: "easeOut" },
                          scale: { duration: 0.1 },
                        }}
                        className={`
                          ${getTileSize()}
                          aspect-square shrink-0 flex items-center justify-center font-black uppercase shadow-2xs
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

          {/* Toast / Message Line */}
          <div className="w-full min-h-[26px] flex items-center justify-center mb-1">
            <AnimatePresence>
              {bannerMessage ? (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  className="bg-[#FDECEF] text-[#DE4377] text-xs font-bold py-1 px-4 rounded-full text-center shadow-2xs border border-pink-200"
                >
                  {bannerMessage}
                </motion.div>
              ) : (
                <span className="text-xs text-[#8D7B85] font-medium">
                  A little closer to our next memory.
                </span>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Keyboard */}
          <div className="w-full mt-1">
            <Keyboard
              onChar={handleChar}
              onEnter={handleEnter}
              onDelete={handleDelete}
              letterStatuses={letterStatuses}
              disabled={isSolved || isRevealingRow !== null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

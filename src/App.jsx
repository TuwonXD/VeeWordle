import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import WordlePuzzle from "./components/WordlePuzzle";
import Celebration from "./components/Celebration";
import Question from "./components/Question";
import SavedDate from "./components/SavedDate";
import { dateConfig } from "./config/dateConfig";

const STORAGE_KEY = "veewordle_save_state_v4";

export default function App() {
  const [screen, setScreen] = useState("start"); // 'start' | 'puzzle' | 'celebration' | 'question' | 'yes'
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [puzzleGuesses, setPuzzleGuesses] = useState({});

  // Restore progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          if (parsed.screen) setScreen(parsed.screen);
          if (typeof parsed.currentPuzzleIndex === "number") {
            setCurrentPuzzleIndex(parsed.currentPuzzleIndex);
          }
          if (Array.isArray(parsed.solvedPuzzles)) {
            setSolvedPuzzles(parsed.solvedPuzzles);
          }
          if (parsed.puzzleGuesses) {
            setPuzzleGuesses(parsed.puzzleGuesses);
          }
        }
      }
    } catch (e) {
      console.warn("Could not load saved progress:", e);
    }
  }, []);

  // Save progress
  useEffect(() => {
    try {
      const stateToSave = {
        screen,
        currentPuzzleIndex,
        solvedPuzzles,
        puzzleGuesses,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn("Could not save progress:", e);
    }
  }, [screen, currentPuzzleIndex, solvedPuzzles, puzzleGuesses]);

  const handleStart = () => {
    setScreen("puzzle");
    setCurrentPuzzleIndex(0);
    setSolvedPuzzles([]);
    setPuzzleGuesses({});
  };

  const handlePuzzleSolved = (puzzleId, guesses) => {
    setSolvedPuzzles((prev) => (prev.includes(puzzleId) ? prev : [...prev, puzzleId]));
    setPuzzleGuesses((prev) => ({ ...prev, [puzzleId]: guesses }));
  };

  const handleProceedNext = () => {
    if (currentPuzzleIndex + 1 < dateConfig.puzzles.length) {
      setCurrentPuzzleIndex((prev) => prev + 1);
    } else {
      setScreen("celebration");
    }
  };

  const handleContinueToQuestion = () => {
    setScreen("question");
  };

  const handleSayYes = () => {
    setScreen("yes");
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setScreen("start");
    setCurrentPuzzleIndex(0);
    setSolvedPuzzles([]);
    setPuzzleGuesses({});
  };

  const currentPuzzle = dateConfig.puzzles[currentPuzzleIndex];

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#FFFDF9] text-[#3C2E35] selection:bg-pink-200 selection:text-pink-900 w-full overflow-x-hidden">
      {/* Header present across all screens */}
      <Header
        onReset={handleReset}
        screen={screen}
        currentPuzzleIndex={currentPuzzleIndex}
        solvedPuzzles={solvedPuzzles}
      />

      {/* Main Full-Area Responsive Content View */}
      <main className="flex-1 flex flex-col justify-center items-center w-full px-2 sm:px-4 md:px-8 py-2 md:py-6">
        <AnimatePresence mode="wait">
          {screen === "start" && (
            <StartScreen key="start" onStart={handleStart} />
          )}

          {screen === "puzzle" && currentPuzzle && (
            <WordlePuzzle
              key={`puzzle-${currentPuzzle.id}`}
              puzzle={currentPuzzle}
              puzzleIndex={currentPuzzleIndex}
              totalPuzzles={dateConfig.puzzles.length}
              savedGuesses={puzzleGuesses[currentPuzzle.id] || []}
              isAlreadySolved={solvedPuzzles.includes(currentPuzzle.id)}
              onPuzzleSolved={handlePuzzleSolved}
              onProceedNext={handleProceedNext}
            />
          )}

          {screen === "celebration" && (
            <Celebration key="celebration" onContinue={handleContinueToQuestion} />
          )}

          {screen === "question" && (
            <Question key="question" onSayYes={handleSayYes} />
          )}

          {screen === "yes" && (
            <SavedDate key="yes" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/**
 * Wordle helper utilities
 */

export function evaluateGuess(guess, solution) {
  const guessUpper = guess.toUpperCase();
  const solutionUpper = solution.toUpperCase();
  const len = solutionUpper.length;

  const result = Array(len).fill("absent");
  const solutionLetters = solutionUpper.split("");
  const letterCounts = {};

  // Count available frequencies in solution
  for (const letter of solutionLetters) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  // 1st pass: find exact matches (correct)
  for (let i = 0; i < len; i++) {
    if (guessUpper[i] === solutionUpper[i]) {
      result[i] = "correct";
      letterCounts[guessUpper[i]] -= 1;
    }
  }

  // 2nd pass: find wrong position matches (present)
  for (let i = 0; i < len; i++) {
    if (result[i] !== "correct") {
      const char = guessUpper[i];
      if (char && letterCounts[char] > 0) {
        result[i] = "present";
        letterCounts[char] -= 1;
      }
    }
  }

  return result;
}

/**
 * Aggregate letter statuses across all submitted guesses for keyboard coloring
 */
export function getLetterStatuses(guesses, solution) {
  const statuses = {};

  for (const guess of guesses) {
    const evaluation = evaluateGuess(guess, solution);
    for (let i = 0; i < guess.length; i++) {
      const char = guess[i].toUpperCase();
      const status = evaluation[i];

      // Priority: correct > present > absent
      if (status === "correct") {
        statuses[char] = "correct";
      } else if (status === "present" && statuses[char] !== "correct") {
        statuses[char] = "present";
      } else if (status === "absent" && !statuses[char]) {
        statuses[char] = "absent";
      }
    }
  }

  return statuses;
}


// aiHelper.js
export const generateMiniMessage = (description) => {
  // Basic keyword-based "AI"
  const lower = description.toLowerCase();

  if (lower.includes("dad") || lower.includes("father")) {
    return "Remember, your dad works hard outside every day!";
  }
  if (lower.includes("mom")) {
    return "Think about how your mom supports you every day!";
  }
  if (lower.includes("study")) {
    return "Keep going! Studying now pays off later!";
  }
  // Default
  return "This is an important moment for you—keep it in mind!";
};

// aiHelper.js

/**
 * Simulates an AI generating a personalized message based on a photo description.
 * This is a simplified function for a hackathon demo.
 * @param {string} description The user's description of the photo.
 * @returns {string} An AI-generated message.
 */
export const generateMiniMessage = (description) => {
  const desc = description.toLowerCase();

  // Keywords related to family and relationships
  if (
    desc.includes("mom") ||
    desc.includes("mother") ||
    desc.includes("dad") ||
    desc.includes("father") ||
    desc.includes("parent")
  ) {
    return "This is a reminder of your family's support. They're proud of you and your hard work.";
  }
  if (
    desc.includes("sister") ||
    desc.includes("brother") ||
    desc.includes("sibling") ||
    desc.includes("family")
  ) {
    return "Remember this good time with your family? Make sure you take a break to enjoy more moments like this.";
  }
  if (
    desc.includes("friends") ||
    desc.includes("squad") ||
    desc.includes("bff")
  ) {
    return "Don't let your friends miss out on your journey! Keep going, you're an inspiration.";
  }

  // Keywords related to emotions or challenges
  if (
    desc.includes("struggling") ||
    desc.includes("poor") ||
    desc.includes("difficult")
  ) {
    return "This journey is tough, but so are you. Remember this photo as a reminder of your strength.";
  }

  // Keywords related to pets
  if (desc.includes("dog") || desc.includes("cat") || desc.includes("pet")) {
    return "Your furry friend is waiting for you. Don't lose track of time!";
  }

  // Keywords related to work and goals
  if (
    desc.includes("studying") ||
    desc.includes("project") ||
    desc.includes("hard work")
  ) {
    return "That hard work is what will get you to your goals. You've got this!";
  }

  // Default message if no keywords are found
  return "This photo is a reminder of what truly matters to you. Stay on track!";
};

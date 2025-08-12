export default function parseWorkoutFromResponse(response: string) {
  if (!response || typeof response !== "string") return null;

  const normalized = response.trim();

  // More forgiving detection: match anywhere, ignoring newlines
  const hasWorkoutSection = /Workout\s*:/i.test(normalized);
  const hasExerciseSection = /Exercise(\s*\d*|s)?\s*:/i.test(normalized);

  if (!hasWorkoutSection || !hasExerciseSection) {
    return null;
  }

  // Extract title
  let title = "";
  const titleMatch = normalized.match(/Workout\s*:\s*(.+)/i);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  // Extract duration
  let duration = "";
  const durationMatch = normalized.match(/Duration\s*:\s*(.+)/i);
  if (durationMatch) {
    duration = durationMatch[1].trim();
  }

  // Extract difficulty (optional)
  let difficulty = "";
  const difficultyMatch = normalized.match(/Difficulty\s*:\s*(.+)/i);
  if (difficultyMatch) {
    difficulty = difficultyMatch[1].trim();
  }

  // Extract equipment (optional)
  let equipment = "";
  const equipmentMatch = normalized.match(/Equipment Needed\s*:\s*(.+)/i);
  if (equipmentMatch) {
    equipment = equipmentMatch[1].trim();
  }

  // Keep everything from "Workout:" onwards as content
  const startIndex = normalized.search(/Workout\s*:/i);
  const content =
    startIndex !== -1 ? normalized.slice(startIndex).trim() : normalized;

  // Must have at least a title and ~30 chars of content
  if (!title || content.length < 30) {
    return null;
  }

  return {
    title,
    duration,
    difficulty,
    equipment,
    content,
  };
}

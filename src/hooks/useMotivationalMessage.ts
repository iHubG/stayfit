export default function useMotivationalMessage(streak: number) {
  if (streak === 0) return "Ready to start your fitness journey?";
  if (streak === 1) return "Great start! Keep the momentum going!";
  if (streak < 7) return `${streak} days strong! Keep building the habit!`;
  if (streak < 30) return `Amazing ${streak}-day streak! You're on fire! 🔥`;
  return `Incredible ${streak}-day streak! You're a champion! 🏆`;
}

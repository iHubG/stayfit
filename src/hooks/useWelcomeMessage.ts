// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useWelcomeMessage(profileData: any) {
  if (!profileData) return "";

  const name = profileData?.name || "there";
  const goal = profileData?.primaryGoal || "general fitness";
  const location = profileData?.preferredLocation || "home or gym";
  const time = profileData?.availableTime || "any duration";

  return `Hey ${name}! 👋 I'm StayFit your AI fitness coach. I know you want to ${goal.replace(
    "_",
    " "
  )} and prefer ${location} workouts with ${time} sessions. 

I can help you with:
• Personalized workout plans
• Exercise modifications
• Form tips and alternatives
• Progress adjustments

What kind of workout would you like today?`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function useWeeklyProgress(workouts: any[]) {
  if (!workouts?.length) return { progress: 0, completedCount: 0, remainingCount: 4 };

  const now = new Date();
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  weekStart.setHours(0, 0, 0, 0);

  const thisWeek = workouts.filter((doc) => {
    const data = doc.data();
    const completedAt = data?.completedAt?.toDate?.();
    return completedAt && completedAt >= weekStart;
  });

  const completedCount = thisWeek.length;
  const progress = (completedCount / 4) * 100; // Goal: 4 workouts
  const remainingCount = Math.max(0, 4 - completedCount);

  return { progress, completedCount, remainingCount };
}
